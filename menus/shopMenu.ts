const inquirer = require('inquirer')
import { Player, locationInfo, allItems } from '../player'
import { playMenu } from './playMenu'
import { confirmMenu } from './confirmMenu'
import { cls, randomsFromArr } from '../helpers/utils'
import { Area } from '../locations/area'
import { infoLog, infoLogEnd, infoShopLog } from '../helpers/logs'
import * as item from '../items'


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
          shopSellMenu(player);
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

const shopCatalog: (item.Item | item.Armor | item.Sword)[] = randomsFromArr(
  allItems,
  5
);
const _choices = shopCatalog.map((x) => x.name);
_choices.push('Back');

const shopBuyMenu = (player: Player) => {
  return inquirer
    .prompt([
      {
        type: 'list',
        name: 'choice',
        message: `Please select the item to buy! You have ${player.coins} coins.`,
        choices: _choices,
      },
    ])
    .then((answers) => {
      switch (answers.choice) {
        case 'Back':
          cls();
          shopMenu(player);
          break;
        case shopCatalog[0].name:
          cls();
          if (player.coins >= shopCatalog[0].value) {
            player.coins -= shopCatalog[0].value;
            player.inventory.push(shopCatalog[0]);
            infoShopLog();
            console.log(`You successfully bought ${shopCatalog[0].name}`);
            infoLogEnd();
          } else {
            console.log(`You don't have enough money(${player.coins})`);
          }
          shopBuyMenu(player);
          break;
        case shopCatalog[1].name:
          cls();
          if (player.coins >= shopCatalog[1].value) {
            player.coins -= shopCatalog[1].value;
            player.inventory.push(shopCatalog[1]);
            infoShopLog();
            console.log(`You successfully bought ${shopCatalog[1].name}`);
            infoLogEnd();
          } else {
            console.log(`You don't have enough money(${player.coins})`);
          }
          shopBuyMenu(player);
          break;
        case shopCatalog[2].name:
          cls();
          if (player.coins >= shopCatalog[2].value) {
            player.coins -= shopCatalog[2].value;
            player.inventory.push(shopCatalog[2]);
            infoShopLog();
            console.log(`You successfully bought ${shopCatalog[2].name}`);
            infoLogEnd();
          } else {
            console.log(`You don't have enough money(${player.coins})`);
          }
          shopBuyMenu(player);
          break;
        case shopCatalog[3].name:
          cls();
          if (player.coins >= shopCatalog[3].value) {
            player.coins -= shopCatalog[3].value;
            player.inventory.push(shopCatalog[3]);
            infoShopLog();
            console.log(`You successfully bought ${shopCatalog[3].name}`);
            infoLogEnd();
          } else {
            console.log(`You don't have enough money(${player.coins})`);
          }
          shopBuyMenu(player);
          break;
        case shopCatalog[4].name:
          cls();
          if (player.coins >= shopCatalog[4].value) {
            player.coins -= shopCatalog[4].value;
            player.inventory.push(shopCatalog[4]);
            infoShopLog();
            console.log(`You successfully bought ${shopCatalog[4].name}`);
            infoLogEnd();
          } else {
            console.log(`You don't have enough money(${player.coins})`);
          }
          shopBuyMenu(player);
          break;
      }
    });
};

export const shopSellMenu = (player: Player) => {
  cls();
  let _choices = [];

  for (let i = 0; i < player.inventory.length; i++) {
    _choices.push(player.inventory[i].name);
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

      switch (answers.choice) {
        case 'Back':
          cls();
          shopMenu(player);
          break;
        case player.inventory[i].name:
          cls();
          let confirmation: boolean = await confirmMenu('sell this item');

          if (confirmation) {
            player.coins += Math.ceil(player.inventory[i].value / 1.5);
            player.inventory.splice(i, 1);
            infoLog();
            console.log(
              `You successfully sold your ${player.inventory[i].name}.`
            );
            infoLogEnd();
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