import { infoHuntLog, infoLog, infoLogEnd, typewriter } from '../helpers/logs';
import { cls, randomFromArr, throwErr, timeSleep } from '../helpers/utils';
import { Item, ItemType, items } from '../items/items';
import { Armor, armors } from '../items/armors';
import { Sword, swords } from '../items/swords';
// import { noArmor, noSword } from '../items/noItem';
import { Area } from '../locations/area';
import { City } from '../locations/city';
import { Monster } from '../npcs/monsters';
import { Perk } from './perks';

export type Inventory = Armor | Sword | Item;

export let inventory: Inventory[] = [items.testItem];
export const allItems: Item[] = Object.values(items);
export let allEquipment: (Sword | Armor)[] = Object.values({
  ...armors,
  ...swords,
});

export interface IEquipment {
  sword: Sword | null;
  armor: Armor | null;
}

export interface IMiscStats {
  monstersKilled: { name: string; count: number };
  strength: { name: string; count: number };
  treesChopped: { name: string; count: number };
}

export class Player {
  name: string;
  origin?: string;
  equipment: IEquipment;
  inventory: Inventory[];
  coins: number;
  maxHp: number;
  hp: number;
  lvl: number;
  maxExp: number;
  exp: number;
  attackPower: number;
  defensePower: number;
  location: string;
  miscStats: IMiscStats;
  perks: Perk[];
  gameOver: boolean;
  constructor(
    name: string,
    equipment: IEquipment,
    inventory: Inventory[],
    coins: number,
    maxHp: number,
    hp: number,
    lvl: number,
    maxExp: number,
    exp: number,
    attackPower: number,
    defensePower: number,
    location: string,
    miscStats: IMiscStats,
    perks: Perk[]
  ) {
    this.name = name;
    this.equipment = equipment;
    this.inventory = inventory;
    this.coins = coins;
    this.maxHp = maxHp;
    this.hp = hp;
    this.lvl = lvl;
    this.maxExp = maxExp;
    this.exp = exp;
    this.attackPower = attackPower;
    this.defensePower = defensePower;
    this.location = location;
    this.miscStats = miscStats;
    this.perks = perks;
    this.gameOver = false;
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
  attack = (monster: Monster): void => {
    let pDamage = Math.ceil( // damage calc for player
      ((this.equipment.sword != null ? this.equipment.sword.attackPower : 0) +
        this.attackPower) *
        (100 / (100 + monster.defensePower))
    );

    monster.hp -= pDamage; // subtract hp from monster

    monster.hp = Math.max(0, monster.hp); // round the hp of the monster

    console.log(
      'You did ' + pDamage + ' damage to a ' + monster.name.toLowerCase() // log the action
    );
  };
  battle = (monster: Monster) => {
    infoHuntLog()
    while (true) {

      this.attack(monster);
      timeSleep(400)

      if (monster.hp <= 0) { // check monster dead
        infoLogEnd()
        infoLog();
        console.log(`You found and killed a ${monster.name.toLowerCase()}.`);
        console.log(`You have ${this.hp} hp remaining!`);
        console.log(`You've gained ${monster.exp} exp,`);
        console.log(`and received ${monster.coins} coins.`);
        infoLogEnd();

        this.exp += monster.exp;
        this.coins += monster.coins;
        this.miscStats.monstersKilled.count += 1;
        this.checkHunterPerk();
        this.checkExp();

        break;
      }

      monster.attack(this)
      infoLogEnd()

      
      if (this.checkPlayerDead()) { // check player dead
        infoLog();
        console.log(`Uh Oh! Looks like you died to a ${monster.name}!`);
        infoLogEnd();
        break;
      }
      
      timeSleep(1500);
    }
  };
  hunt = (arr: Monster[]) => {
    let monster = randomFromArr(arr);
    infoLog();
    console.log(
      `You go hunting in the woods and find a ${monster.name.toLowerCase()}`
    );
    infoLogEnd();
    this.battle(monster);
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
      `-Sword: ${
        this.equipment.sword != null
          ? this.equipment.sword.name
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

  changeSword = (sword: Sword) => {
    if (this.inventory.includes(sword)) {
      this.equipment.sword = sword;
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

export const p1 = new Player(
  'Adventurer',
  {
    sword: null,
    armor: null,
  },
  [items.testItem],
  500,
  100,
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
