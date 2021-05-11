import { infoLog, infoLogEnd } from '../helpers/logs';
import { cls, throwErr } from '../helpers/utils';
import { Armor } from '../items/armors';
import { Sword } from '../items/swords';
import { Area } from '../locations/area';
import { City } from '../locations/city';
import {
  changeMaxExp,
  maxExp,
  Player,
  playerAttack,
  playerDefense,
} from './player';

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

export const setupStats = (player: Player) => {
  player.attack = playerAttack;
  player.defense = playerDefense;
  player.attack += player.equipment.sword.attack + (player.lvl - 1);
  player.defense += player.equipment.armor.defense + (player.lvl - 1);
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

export const checkExp = (player: Player) => {
  if (player.exp > maxExp) {
    updateLvl(player);
  } else {
    return;
  }
};

const updateLvl = (player: Player) => {
  player.exp = 0;
  player.lvl += 1;
  changeMaxExp(1.2);

  infoLog();
  console.log(`You leveled up! Congrats, you're now level ${player.lvl}`);
  infoLogEnd();

  setupStats(player);
};

export const checkPlayerDead = (player: Player) => {
  if (player.hp <= 0) {
    return true;
  } else {
    return false;
  }
};
