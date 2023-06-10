import {
  infoHuntLog,
  infoLog,
  infoLogEnd,
  printBattleInfo,
  typewriter,
} from '../helpers/logs';
import { cls, randomFromArr, throwErr, timeSleep } from '../helpers/utils';
import { Item, ItemType, items } from '../items/items';
import { Armor, armors } from '../items/armors';
import { Weapon, weapons } from '../items/weapons';
import { Area } from '../locations/area';
import { City } from '../locations/city';
import { Monster } from '../npcs/monsters';
import { Perk } from './perks';
import { Effect } from './effects';
import { Duel } from './duel';
import {
  Ability,
  ConquerorsHakiAbility,
  CounterAttackAbility,
  DefendBoostAbility,
  FleeAbility,
  SpeechAbility,
  TripleShotAbility,
} from './abilities';
import { Character, IEquipment } from './character';

export type Inventory = Armor | Weapon | Item;

export let inventory: Inventory[] = [items.testItem];
export const allItems: Item[] = Object.values(items);
export let allEquipment: (Weapon | Armor)[] = Object.values({
  ...armors,
  ...weapons,
});

export interface IMiscStats {
  monstersKilled: { name: string; count: number };
  strength: { name: string; count: number };
  treesChopped: { name: string; count: number };
}

export const enum CombatOptions {
  BasicAttack = 'Basic Attack',
  Defend = 'Defend',
  CounterAttack = 'Counter Attack',
  ChargedAttack = 'Charged Attack',
  ConquerorsHaki = "Conqueror's Haki",
  Flee = 'Flee',
  SaySomething = 'Say Something',
  TripleShot = 'Triple Shot',
  HeartPiercer = 'Heart Piercer',
}

export class Player extends Character {
  origin?: string;
  inventory: Inventory[];
  coins: number;
  maxExp: number;
  exp: number;
  location: string;
  miscStats: IMiscStats;
  perks: Perk[];
  hasFleed: boolean;
  gameOver: boolean;
  constructor(
    name: string,
    equipment: IEquipment,
    inventory: Inventory[],
    coins: number,
    maxHp: number,
    lvl: number,
    maxExp: number,
    exp: number,
    attackPower: number,
    defensePower: number,
    location: string,
    miscStats: IMiscStats,
    perks: Perk[]
  ) {
    super(name, equipment, [], maxHp, lvl, attackPower, defensePower);
    this.abilities.push(
      new ConquerorsHakiAbility(CombatOptions.ConquerorsHaki, this),
      new DefendBoostAbility(CombatOptions.Defend),
      new FleeAbility('Flee'),
      new SpeechAbility(CombatOptions.SaySomething)
    );
    this.inventory = inventory;
    this.coins = coins;
    this.maxExp = maxExp;
    this.exp = exp;
    this.location = location;
    this.miscStats = miscStats;
    this.perks = perks;
    this.hasFleed = false;
  }
  changeMaxExp = (n: number) => {
    this.maxExp *= n;
  };
  eat = (eatValue: number) => {
    if (this.hp >= this.maxHp) {
      this.hp = this.maxHp;
      infoLog();
      console.log(`You're already full hp!(${this.hp}HP)`);
      infoLogEnd();
      return;
    }

    if (this.hp >= this.maxHp - eatValue) {
      this.hp = this.maxHp;
      infoLog();
      console.log(`You restored your health. (${this.hp}HP)`);
      infoLogEnd();
      return;
    }

    this.hp += eatValue;
    infoLog();
    console.log(`You restored ${eatValue} hp.(${this.hp}HP)`);
    infoLogEnd();
    return;
  };
  // attack = async (monster: Monster) => {
  //   let pDamage = Math.ceil(
  //     // damage calc for player
  //     ((this.equipment.weapon != null ? this.equipment.weapon.damage : 0) +
  //       this.attackPower) *
  //       (100 / (100 + monster.defensePower))
  //   );

  //   monster.hp -= pDamage; // subtract hp from monster

  //   monster.hp = Math.max(0, monster.hp); // round the hp of the monster
  //   printBattleInfo(this, monster);
  //   infoLog();
  //   await typewriter(
  //     `You did ${pDamage} damage to [Lvl ${monster.lvl}] ${monster.name}` // log the action
  //   );
  //   infoLogEnd();
  // };
  duel = async (monster: Monster) => {
    const duel = new Duel(this, monster);
    await duel.start();
    while (duel.player.hp > 0 && duel.monster.hp > 0 && !duel.player.hasFleed) {
      await duel.proccessRound();
      if (duel.player.hasFleed) {
        infoLog();
        await typewriter(
          `[Lvl ${duel.player.lvl}] ${duel.player.name} decides to flee the battle like a coward!`
        );
        infoLogEnd();
        duel.player.hasFleed = false;
        break;
      }
    }
    if (duel.player.hp <= 0) {
      duel.player.coins /= 2;
      infoLog();
      await typewriter(
        `Seems like you died to [Lvl ${duel.monster.lvl}] ${monster.name}`
      );
      await typewriter(`You lost ${duel.player.coins / 2} coins`);
      infoLogEnd();
    }
    if (duel.monster.hp <= 0) {
      duel.player.exp += duel.monster.exp;
      duel.player.coins += duel.monster.coins;
      this.checkExp();
      infoLog();
      await typewriter(
        `Congrats on defeating [Lvl ${duel.monster.lvl}] ${monster.name}`
      );
      await typewriter(
        `You gained ${duel.monster.exp} points of experience and find ${duel.monster.coins} coins while looting the dead body.`
      );
      infoLogEnd();
    }
    return;
  };
  hunt = (arr: Monster[]) => {
    let monster = randomFromArr(arr);
    infoHuntLog();
    console.log(
      `You go hunting in the woods and find a ${monster.name.toLowerCase()}`
    );
    infoLogEnd();
    this.duel(monster);
  };
  sleep = () => {
    if (this.hp < this.maxHp) {
      this.hp = this.maxHp;
      infoLog();
      console.log(
        `You went to sleep and regenerated all your health(${this.hp}HP).`
      );
      infoLogEnd();
      return;
    }
    infoLog();
    console.log('You went to sleep.');
    infoLogEnd();
    return;
  };
  printProfile = () => {
    infoLog();
    console.log(`Name: ${this.name}`);
    console.log(`HP: ${this.hp}/${this.maxHp}`);
    console.log(`Level: ${this.lvl}`);
    console.log(`Exp: ${this.exp}/${this.maxExp}\n`);
    console.log(`Attack: ${this.attackPower}`);
    console.log(`Defense: ${this.defensePower}\n`);
    console.log(`Coins: ${this.coins}`);
    console.log(`Location: ${this.location}\n`);
    console.log(`Equipment:`);
    console.log(
      `-Weapon: ${
        this.equipment.weapon != null
          ? this.equipment.weapon.name
          : 'No sword equipped'
      }`
    );
    console.log(
      `-Armor: ${
        this.equipment.armor != null
          ? this.equipment.armor.name
          : 'No armor equipped'
      }`
    );
    infoLogEnd();
  };

  printInventory = () => {
    infoLog();
    for (let i = 0; i < this.inventory.length; i++) {
      if (
        this.inventory[i].type === ItemType.NOARMOR ||
        this.inventory[i].type === ItemType.NOSWORD
      ) {
        continue;
      }

      console.log(`${i + 1}. ${this.inventory[i].name}`);
    }
    infoLogEnd();
  };

  locationInfo = async () => {
    switch (this.location) {
      case Area.CITY:
        cls();
        infoLog();
        await typewriter('You are in your city.');
        await typewriter('From here you can go to shop to get some new items.');
        await typewriter(
          'There is also the blacksmith from which you can buy new equipment!'
        );
        infoLogEnd();
        break;
      case Area.FOREST:
        cls();
        infoLog();
        await typewriter('You are in the forest near your city.');
        await typewriter('Here you can go hunting monsters.');
        await typewriter('By defeating monsters you can get coins and loot.');
        infoLogEnd();
        break;
      case City.HOME:
        cls();
        infoLog();
        await typewriter('You are currently in your house.');
        await typewriter(`Here you can eat to regenarate health,`);
        await typewriter(
          `Or sleep when it's night time(sleeping will regenarate all your missing health).`
        );
        infoLogEnd();
        break;
      case City.SHOP:
        infoLog();
        await typewriter('You are currently in the shop from your city.');
        await typewriter('From here you can either buy new items,');
        await typewriter('or sell items from your inventory to get money');
        infoLogEnd();
        break;
      case City.BLACKSMITH:
        infoLog();
        await typewriter(
          'You are in currently in the blacksmith from your city'
        );
        await typewriter('From here you can either buy new equipment,');
        await typewriter('or sell equipment from your inventory for money.');
        infoLogEnd();
        break;
    }
  };

  changeWeapon = (weapon: Weapon) => {
    if (this.inventory.includes(weapon)) {
      this.equipment.weapon = weapon;
    } else {
      throwErr(`It's look like you don't have this item in your inventory.`);
    }
  };

  changeArmor = (armor: Armor) => {
    if (this.inventory.includes(armor)) {
      this.equipment.armor = armor;
    } else {
      throwErr(`It's look like you don't have this item in your inventory.`);
    }
  };

  checkExp = () => {
    if (this.exp > this.maxExp) {
      this.updateLvl();
    } else {
      return;
    }
  };

  updateLvl = () => {
    this.exp = 0;
    this.lvl += 1;
    this.changeMaxExp(1.2);

    infoLog();
    console.log(`You leveled up! Congrats, you're now level ${this.lvl}`);
    infoLogEnd();
  };

  checkPlayerDead = () => {
    if (this.hp <= 0) {
      return true;
    } else {
      return false;
    }
  };

  printStats = () => {
    for (let i in this.miscStats) {
      console.log(`${this.miscStats[i].name}: ${this.miscStats[i].count}`);
    }
  };

  printPerks = () => {
    if (this.perks.length > 0) {
      for (let i = 0; i < this.perks.length; i++) {
        console.log(this.perks[i]);
      }
    } else {
      infoLog();
      console.log("Looks like you don't have any perks!");
      infoLogEnd();
    }
  };

  newPerkInfo = (perk: Perk) => {
    infoLog();
    console.log(`Congratulations! You have earned a new perk: ${perk}`);
    infoLogEnd();
  };

  checkHunterPerk = () => {
    if (this.miscStats.monstersKilled.count >= 50) {
      this.perks.push(Perk.HUNTER);
      this.newPerkInfo(Perk.HUNTER);
    }
  };
}

export const p1: Player = new Player(
  'Adventurer',
  {
    weapon: weapons.JujuBow,
    armor: null,
  },
  [items.testItem],
  500,
  100,
  1,
  100,
  0,
  10,
  5,
  Area.CITY,
  {
    monstersKilled: { name: 'Monsters killed', count: 0 },
    strength: { name: 'Strength', count: 0 },
    treesChopped: { name: 'Trees chopped', count: 0 },
  },
  []
);
