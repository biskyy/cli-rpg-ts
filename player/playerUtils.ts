import { infoLog, infoLogEnd, typewriter } from '../helpers/logs';
import { cls, throwErr } from '../helpers/utils';
import { Armor } from '../items/armors';
import { Sword } from '../items/swords';
import { Area } from '../locations/area';
import { City } from '../locations/city';
import { Perk } from './perks';
import {
  changeMaxExp,
  maxExp,
  PlayerI,
  playerAttack,
  playerDefense,
} from './player';

export const profile = (player: PlayerI) => {
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

export const setupStats = (player: PlayerI) => {
  player.attack = playerAttack;
  player.defense = playerDefense;
  player.attack +=
    player.equipment.sword.attack +
    (player.lvl - 1) +
    player.stats.strength.count;
  player.defense += player.equipment.armor.defense + (player.lvl - 1);
};

export const inventory = (player: PlayerI) => {
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

export const locationInfo = async (player: PlayerI) => {
  switch (player.location) {
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
      await typewriter('You are in currently in the blacksmith from your city');
      await typewriter('From here you can either buy new equipment,');
      await typewriter('or sell equipment from your inventory for money.');
      infoLogEnd();
      break;
  }
};

export const changeSword = (player: PlayerI, sword: Sword) => {
  if (player.inventory.includes(sword)) {
    player.equipment.sword = sword;
    setupStats(player);
  } else {
    throwErr(`It's look like you don't have this item in your inventory.`);
  }
};

export const changeArmor = (player: PlayerI, armor: Armor) => {
  if (player.inventory.includes(armor)) {
    player.equipment.armor = armor;
    setupStats(player);
  } else {
    throwErr(`It's look like you don't have this item in your inventory.`);
  }
};

export const checkExp = (player: PlayerI) => {
  if (player.exp > maxExp) {
    updateLvl(player);
  } else {
    return;
  }
};

const updateLvl = (player: PlayerI) => {
  player.exp = 0;
  player.lvl += 1;
  changeMaxExp(1.2);

  infoLog();
  console.log(`You leveled up! Congrats, you're now level ${player.lvl}`);
  infoLogEnd();

  setupStats(player);
};

export const checkPlayerDead = (player: PlayerI) => {
  if (player.hp <= 0) {
    return true;
  } else {
    return false;
  }
};

export const stats = (player: PlayerI) => {
  for (let i in player.stats) {
    console.log(`${player.stats[i].name}: ${player.stats[i].count}`);
  }
};

export const perks = (player: PlayerI) => {
  if (player.perks.length > 0) {
    for (let i = 0; i < player.perks.length; i++) {
      console.log(player.perks[i]);
    }
  } else {
    infoLog();
    console.log("Looks like you don't have any perks!");
    infoLogEnd();
  }
};

export const newPerkInfo = (player: PlayerI, perk: Perk) => {
  infoLog();
  console.log(`Congratulations! You have earned a new perk: ${perk}`);
  infoLogEnd();
};

export const checkHunterPerk = (player: PlayerI) => {
  if (player.stats.monstersKilled.count >= 50) {
    player.perks.push(Perk.HUNTER);
    newPerkInfo(player, Perk.HUNTER);
  }
};
