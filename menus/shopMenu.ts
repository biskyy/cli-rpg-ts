const inquirer = require('inquirer');
import { infoLog, infoLogEnd, infoShopLog } from '../helpers/logs';
import { cls, randomItemsFromArr } from '../helpers/utils';
import { Area } from '../locations/area';
import { allItems, Inventory, locationInfo, Player } from '../player';
import { confirmMenu } from './confirmMenu';
import { playMenu } from './playMenu';

export const shopMenu = (player: Player) => {
  return inquirer
    .prompt([
      {
        type: 'list',
        message: 'Welcome to the Shop!\n',
        name: 'choice',
        choices: ['Buy', 'Sell', 'Help', 'Exit'],
      },
    ])
    .then((answers) => {
      switch (answers.choice) {
        case 'Buy':
          cls();
          shopBuyMenu(player);
          break;
        case 'Sell':
          if (
            player.inventory.filter((item) => item.type === 'Item').length > 0
          ) {
            cls();
            shopSellMenu(player);
          } else {
            cls();
            infoLog();
            console.log(
              `Uh Oh. Looks like you don't have any items in your inventory, which means you can't sell anything.`
            );
            infoLogEnd();
            shopMenu(player);
            return;
          }

          break;
        case 'Help':
          cls();
          locationInfo(player);
          break;
        case 'Exit':
          cls();
          player.location = Area.CITY;
          playMenu(player);
          break;
      }
    });
};

const shopCatalog: Inventory[] = randomItemsFromArr(allItems, 2);
const _choices = shopCatalog.map((x) => x.name);
_choices.push('Back');

export const shopBuyMenu = (player: Player) => {
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
          shopMenu(player);
          break;
        case shopCatalog[i].name:
          cls();
          let confirmation = await confirmMenu('sell this item');
          if (confirmation) {
            if (player.coins >= shopCatalog[i].value) {
              player.coins -= shopCatalog[i].value;
              player.inventory.push(shopCatalog[i]);
              infoShopLog();
              console.log(`You successfully bought ${shopCatalog[i].name}`);
              infoLogEnd();
            } else {
              console.log(`You don't have enough money(${player.coins})`);
            }
            shopBuyMenu(player);
          } else {
            infoLog();
            console.log('You canceled this action!');
            infoLogEnd();
            shopBuyMenu(player);
          }
          break;
      }
    });
};

export const shopSellMenu = (player: Player) => {
  let _choices = [];

  if (player.inventory.filter((item) => item.type === 'Item').length == 0) {
    cls();
    infoLog();
    console.log(
      `Uh Oh. Looks like you don't have any items in your inventory, which means you can't sell anything.`
    );
    infoLogEnd();
    shopMenu(player);
    return;
  }

  for (let i = 0; i < player.inventory.length; i++) {
    if (player.inventory[i].type === 'Item') {
      _choices.push(player.inventory[i].name);
    }
  }

  _choices.push('Back');

  return inquirer
    .prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'Please select the item you want to sell!',
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
          shopMenu(player);
          break;
        case _choices[i]:
          let confirmation: boolean = await confirmMenu('sell this item');

          if (confirmation) {
            player.coins += Math.ceil(player.inventory[invIndex].value / 1.5);
            infoLog();
            console.log(`You successfully sold your ${_choices[i]}.`);
            infoLogEnd();
            player.inventory.splice(invIndex, 1);
            shopSellMenu(player);
          } else {
            infoLog();
            console.log('You canceled this action');
            infoLogEnd();
            shopSellMenu(player);
          }
          break;
      }
    });
};
