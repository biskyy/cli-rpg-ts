import { infoHuntLog, infoLog, infoLogEnd } from '../helpers/logs';
import { randomFromArr, timeSleep } from '../helpers/utils';
import * as armor from '../items/armors';
import { Armor } from '../items/armors';
import * as item from '../items/items';
import { Item } from '../items/items';
import { noArmor, noSword } from '../items/noItem';
import * as sword from '../items/swords';
import { Sword } from '../items/swords';
import { Area } from '../locations/area';
import { Monster } from '../monsters';
import { Perk } from './perks';
import { checkExp, checkHunterPerk, checkPlayerDead } from './playerUtils';

export type Inventory = Armor | Sword | Item;

export const playerMaxHp: number = 100;
export const playerHp: number = playerMaxHp;
export const eatValue: number = 10;
export const coins: number = 500;
export let equipment = {
  sword: noSword,
  armor: noArmor,
};
export let inventory: Inventory[] = [item.testItem];
export const allItems: Item[] = Object.values(item);
export let allEquipment: (Sword | Armor)[] = Object.values(sword);
export const armors = Object.values(armor);
export let maxExp = 100;
export let playerAttack = 10;
export let playerDefense = 5;
export let stats = {
  monstersKilled: { name: 'Monsters killed', count: 0 },
  strength: { name: 'Strength', count: 0 },
  treesChopped: { name: 'Trees chopped', count: 0 },
};
export let perks = [];

export const changeMaxExp = (n: number) => {
  maxExp *= n;
};

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
  stats: typeof stats;
  perks: Perk[];
  gameOver: boolean;
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
  stats: stats,
  perks: perks,
  gameOver: false,
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

export const battle = (player: Player, monster: Monster) => {
  while (true) {
    attack(player, monster);

    timeSleep(1500);

    if (checkPlayerDead(player)) {
      infoLog();
      console.log(`Uh Oh! Looks like you died to a ${monster.name}!`);
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
      player.stats.monstersKilled.count += 1;
      checkHunterPerk(player);
      checkExp(player);

      break;
    }
  }
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
