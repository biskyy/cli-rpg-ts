import {
  allEquipment,
  changeArmor,
  changeSword,
  locationInfo,
  Player,
} from '../player';
import { cls, randomEquipmentFromArr } from '../helpers/utils';
import { Sword } from '../items/swords';
import { Armor } from '../items/armors';
import { infoLog, infoLogEnd, infoShopLog } from '../helpers/logs';
import { playMenu } from './playMenu';
import { Area } from '../locations/area';
import { shopMenu } from './shopMenu';
import { confirmMenu } from './confirmMenu';
import { noArmor, noSword } from '../items/noItem';

const inquirer = require('inquirer');

export const bsMenu = (player: Player) => {
  return inquirer
    .prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'Welcome to the Blacksmith!',
        choices: ['Buy', 'Sell', 'Help', 'Exit'],
      },
    ])
    .then((answers) => {
      switch (answers.choice) {
        case 'Exit':
          cls();
          player.location = Area.CITY;
          playMenu(player);
          break;
        case 'Buy':
          bsBuyMenu(player);
          break;
        case 'Sell':
          if (
            player.inventory.filter((item) => {
              return ['Armor', 'Sword'].includes(item.type);
            }).length > 0
          ) {
            cls();
            bsSellMenu(player);
            return;
          } else {
            cls();
            infoLog();
            console.log(
              `Uh Oh. Looks like you don't have any items in your inventory, which means you can't sell anything.`
            );
            infoLogEnd();
            bsMenu(player);
            return;
          }
          break;
        case 'Help':
          locationInfo(player);
          break;
      }
    });
};

const bsCatalog: (Armor | Sword)[] = randomEquipmentFromArr(allEquipment, 4);
const _choices = bsCatalog.map((x) => x.name);
_choices.push('Back');

export const bsBuyMenu = (player: Player) => {
  cls();
  return inquirer
    .prompt([
      {
        type: 'list',
        name: 'choice',
        message: `Please select the item to buy! You have ${player.coins} coins.`,
        choices: _choices,
      },
    ])
    .then(async (answers) => {
      let i = _choices.indexOf(answers.choice);

      switch (answers.choice) {
        case 'Back':
          cls();
          bsMenu(player);
          break;
        case bsCatalog[i].name:
          cls();
          let confirmation = await confirmMenu('buy this item');
          if (confirmation) {
            if (player.coins >= bsCatalog[i].value) {
              player.coins -= bsCatalog[i].value;
              player.inventory.push(bsCatalog[i]);
              infoShopLog();
              console.log(`You successfully bought ${bsCatalog[i].name}`);
              infoLogEnd();
            } else {
              console.log(`You don't have enough money(${player.coins})`);
            }
            bsBuyMenu(player);
          } else {
            infoLog();
            console.log('You canceled this action!');
            infoLogEnd();
            bsBuyMenu(player);
          }
          break;
      }
    });
};

export const bsSellMenu = (player: Player) => {
  let _choices = [];

  if (
    player.inventory.filter((item) => {
      return ['Armor', 'Sword'].includes(item.type);
    }).length == 0
  ) {
    cls();
    infoLog();
    console.log(
      `Uh Oh. Looks like you don't have any items in your inventory, which means you can't sell anything.`
    );
    infoLogEnd();
    bsMenu(player);
    return;
  }

  for (let i = 0; i < player.inventory.length; i++) {
    if (
      player.inventory[i].type === 'Sword' ||
      player.inventory[i].type === 'Armor'
    ) {
      _choices.push(player.inventory[i].name);
    }
  }

  _choices.push('Back');

  return inquirer
    .prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'Please select a item to sell!\n',
        choices: _choices,
      },
    ])
    .then(async (answers) => {
      let i = _choices.indexOf(answers.choice);
      let invIndex = player.inventory
        .map((x) => x.name)
        .indexOf(answers.choice);

      switch (answers.choice) {
        case 'Back':
          cls();
          bsMenu(player);
          break;
        case _choices[i]:
          let confirmation: boolean = await confirmMenu('sell this item');

          if (confirmation) {
            if (player.equipment.sword.name == answers.choice) {
              cls();
              infoLog();
              console.log(
                'WARNING! The item you trying to sell is your current Sword.'
              );
              infoLogEnd();
              let _confirmation = await confirmMenu('you want to continue');
              if (_confirmation) {
                player.inventory.push(noSword);
                changeSword(player, noSword);
              } else {
                cls();
                infoLog();
                console.log('You canceled this action');
                infoLogEnd();
                bsSellMenu(player);
                return;
              }
            }

            if (player.equipment.armor.name == answers.choice) {
              cls();
              infoLog();
              console.log(
                'WARNING! The item you trying to sell is your current Armor.'
              );
              infoLogEnd();
              let _confirmation = await confirmMenu('you want to continue');
              if (_confirmation) {
                player.inventory.push(noArmor);
                changeArmor(player, noArmor);
              } else {
                cls();
                infoLog();
                console.log('You canceled this action');
                infoLogEnd();
                bsSellMenu(player);
                return;
              }
            }

            player.coins += Math.ceil(player.inventory[invIndex].value / 1.5);
            cls();
            infoLog();
            console.log(`You successfully sold your ${_choices[i]}.`);
            infoLogEnd();
            player.inventory.splice(invIndex, 1);
            bsSellMenu(player);
          } else {
            infoLog();
            console.log('You canceled this action');
            infoLogEnd();
            bsSellMenu(player);
          }
          break;
      }
    });
};
