import { Item } from './items/items';
import { Sword, WoodenSword } from './items/swords';
import { Armor, ClothArmor } from './items/armors';
import * as item from './items/items';
import * as sword from './items/swords';
import * as armor from './items/armors';
import { Area } from './locations/area';
import { City } from './locations/city';
import { Monster, monsters } from './monsters';
import { cls, timeSleep, randomFromArr, throwErr } from './helpers/utils';
import { infoHuntLog, infoLog, infoLogEnd } from './helpers/logs';

export type Inventory = Armor | Sword | Item;

export const playerMaxHp: number = 100;
export const playerHp: number = playerMaxHp;
export const eatValue: number = 10;
export const coins: number = 500;
export let equipment = {
  sword: WoodenSword,
  armor: ClothArmor,
};
export let inventory: Inventory[] = [item.testItem];
export const allItems: Item[] = Object.values(item);
export let allEquipment: (Sword | Armor)[] = Object.values(sword);
export const armors = Object.values(armor);
export let maxExp = 100;
export let playerAttack = 10;
export let playerDefense = 5;

export const changeMaxExp = (n: number) => {
  maxExp *= n;
};

inventory = [item.testItem, WoodenSword, ClothArmor];
export interface Player {
  name: string;
  origin?: string;
  equipment: typeof equipment;
  inventory: Inventory[];
  coins: number;
  maxHp: number;
  hp: number;
  lvl: number;
  exp: number;
  attack: number;
  defense: number;
  location: string;
}

export const p1: Player = {
  name: 'Adventurer',
  equipment: equipment,
  inventory: inventory,
  coins: coins,
  maxHp: playerMaxHp,
  hp: playerHp,
  lvl: 1,
  exp: 0,
  attack: playerAttack,
  defense: playerDefense,
  location: Area.CITY,
};

export const attack = (player: Player, monster: Monster) => {
  let pDamage = Math.ceil(player.attack * (100 / (100 + monster.defense)));
  let eDamage = Math.ceil(monster.attack * (100 / (100 + player.defense)));

  monster.hp -= pDamage;
  player.hp -= eDamage;

  monster.hp = Math.max(0, monster.hp);
  player.hp = Math.max(0, player.hp);

  infoHuntLog();
  console.log(
    'You did ' + pDamage + ' damage to a ' + monster.name.toLowerCase()
  );
  console.log(
    'The ' + monster.name.toLowerCase() + ' did ' + eDamage + ' damage to you'
  );
  infoLogEnd();
};

export const eat = (player: Player) => {
  if (player.hp >= playerMaxHp) {
    player.hp = player.maxHp;
    infoLog();
    console.log(`You're already full hp!(${player.hp}HP)`);
    infoLogEnd();
    return;
  }

  if (player.hp >= playerMaxHp - eatValue) {
    player.hp = player.maxHp;
    infoLog();
    console.log(`You restored your health. (${player.hp}HP)`);
    infoLogEnd();
    return;
  }

  player.hp += eatValue;
  infoLog();
  console.log(`You restored ${eatValue} hp.(${player.hp}HP)`);
  infoLogEnd();
  return;
};

export const sleep = (player: Player) => {
  if (player.hp < player.maxHp) {
    player.hp = player.maxHp;
    infoLog();
    console.log(
      `You went to sleep and regenerated all your health(${player.hp}HP).`
    );
    infoLogEnd();
    return;
  }
  infoLog();
  console.log('You went to sleep.');
  infoLogEnd();
  return;
};

export const profile = (player: Player) => {
  infoLog();
  console.log(`Name: ${player.name}`);
  console.log(`HP: ${player.hp}/${player.maxHp}`);
  console.log(`Level: ${player.lvl}`);
  console.log(`Exp: ${player.exp}/${maxExp}\n`);
  console.log(`Attack: ${player.attack}`);
  console.log(`Defense: ${player.defense}\n`);
  console.log(`Coins: ${player.coins}`);
  console.log(`Location: ${player.location}\n`);
  console.log(`Equipment:`);
  console.log(`-Sword: ${player.equipment.sword.name}`);
  console.log(`-Armor: ${player.equipment.armor.name}`);
  infoLogEnd();
};

export const battle = (player: Player, monster: Monster) => {
  while (true) {
    attack(player, monster);

    timeSleep(1500);

    if (player.hp <= 0) {
      infoLog();
      console.log('Looks like you died to a ' + monster.name + '!');
      infoLogEnd();
      break;
    }

    if (monster.hp <= 0) {
      infoLog();
      console.log(`You found and killed a ${monster.name.toLowerCase()}.`);
      console.log(`You have ${player.hp} hp remaining!`);
      console.log(`You've gained ${monster.exp} exp,`);
      console.log(`and received ${monster.coins} coins.`);
      infoLogEnd();

      player.exp += monster.exp;
      player.coins += monster.coins;
      if (player.exp > maxExp) {
        player.exp = 0;
        player.lvl += 1;
        changeMaxExp(1.2);

        infoLog();
        console.log(`You leveled up! Congrats, you're now level ${player.lvl}`);
        infoLogEnd();

        setupStats(player);
      }

      break;
    }
  }
};

export const setupStats = (player: Player) => {
  player.attack = playerAttack;
  player.defense = playerDefense;
  player.attack += player.equipment.sword.attack + (player.lvl - 1);
  player.defense += player.equipment.armor.defense + (player.lvl - 1);
};

export const hunt = (player: Player, arr: Monster[]) => {
  let monster = randomFromArr(arr);
  infoLog();
  console.log(
    `You go hunting in the woods and find a ${monster.name.toLowerCase()}`
  );
  infoLogEnd();
  battle(player, monster);
};

export const showInventory = (player: Player) => {
  infoLog();
  for (let i = 0; i < player.inventory.length; i++) {
    if (player.inventory[i].type === 'noArmor') {
      continue;
    }

    if (player.inventory[i].type === 'noSword') {
      continue;
    }

    console.log(`${i + 1}. ${player.inventory[i].name}`);
  }
  infoLogEnd();
};

export const locationInfo = (player: Player) => {
  switch (player.location) {
    case Area.CITY:
      cls();
      infoLog();
      console.log('You are in your city.');
      console.log('From here you can go to shop to get some new items.');
      console.log(
        'There is also the blacksmith from which you can buy new equipment!'
      );
      infoLogEnd();
      break;
    case Area.FOREST:
      cls();
      infoLog();
      console.log('You are in the forest near your city.');
      console.log('Here you can go hunting monsters.');
      console.log('By defeating monsters you can get coins and loot.');
      infoLogEnd();
      break;
    case City.HOME:
      cls();
      infoLog();
      console.log('You are currently in your house.');
      console.log(`Here you can eat to regenarate health,`);
      console.log(
        `Or sleep when it's night time(sleeping will regenarate all your missing health).`
      );
      infoLogEnd();
    case City.SHOP:
      infoLog();
      console.log('You are currently in the shop from your city.');
      console.log('From here you can either buy new items,');
      console.log('or sell items from your inventory to get money');
      infoLogEnd();
      break;
    case City.BLACKSMITH:
      infoLog();
      console.log('You are in currently in the blacksmith from your city');
      console.log('From here you can either buy new equipment,');
      console.log('or sell equipment from your inventory for money.');
      infoLogEnd();
      break;
  }
};

export const changeSword = (player: Player, sword: Sword) => {
  if (player.inventory.includes(sword)) {
    player.equipment.sword = sword;
    setupStats(player);
  } else {
    throwErr(`It's look like you don't have this item in your inventory.`);
  }
};

export const changeArmor = (player: Player, armor: Armor) => {
  if (player.inventory.includes(armor)) {
    player.equipment.armor = armor;
    setupStats(player);
  } else {
    throwErr(`It's look like you don't have this item in your inventory.`);
  }
};
