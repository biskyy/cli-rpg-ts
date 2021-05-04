const inquirer = require('inquirer');
import {
  allItems,
  eat,
  hunt,
  locationInfo,
  Player,
  profile,
  showInventory,
  sleep,
} from './player';
import {
  cls,
  infoLog,
  infoLogEnd,
  infoShopLog,
  randomsFromArr,
  timeSleep,
} from './utils';
import { Area } from './locations/area';
import { City } from './locations/city';
import { monsters } from './monsters';
import * as item from './items';

export const confirmMenu = async (str: string) => {
  let confirmation: boolean;

  await inquirer
    .prompt([
      {
        type: 'list',
        name: 'choice',
        message: `Are you sure you want to ${str}?`,
        choices: ['Yes', 'No'],
      },
    ])
    .then((answers) => {
      switch (answers.choice) {
        case 'Yes':
          confirmation = true;
          break;
        case 'No':
          confirmation = false;
          break;
      }
    });
  return confirmation;
};

export const mainMenu = (player: Player) => {
  return inquirer
    .prompt([
      {
        type: 'list',
        message: 'Welcome to Typescript RPG!\nPlease select a option.\n\n',
        name: 'choice',
        choices: ['Play', 'Profile', 'Exit'],
      },
    ])
    .then((answers) => {
      switch (answers.choice) {
        case 'Play':
          cls();
          playMenu(player);
          break;

        case 'Profile':
          cls();
          profile(player);
          mainMenu(player);
          break;

        case 'Exit':
          cls();
          process.exit(1);
          break;

        default:
          break;
      }
    });
};

const playMenu = (player: Player) => {
  let _choices;

  switch (player.location) {
    case Area.CITY:
      _choices = [
        'Home',
        'Shop',
        'Blacksmith',
        'Profile',
        'Inventory',
        'Go to..',
        'Help',
        'Back',
      ];
      break;

    case Area.FOREST:
      _choices = ['Hunt', 'Profile', 'Inventory', 'Go to..', 'Help', 'Back'];
      break;

    default:
      break;
  }

  return inquirer
    .prompt([
      {
        type: 'list',
        message: 'Please select a option!\n',
        name: 'choice',
        choices: _choices,
        pageSize: 12,
      },
    ])
    .then((answers) => {
      switch (answers.choice) {
        case 'Help':
          cls();
          locationInfo(player);
          playMenu(player);
          break;
        case 'Hunt':
          hunt(player, monsters);
          playMenu(player);
          break;
        case 'Shop':
          cls();
          player.location = City.SHOP;
          shopMenu(player);
          break;
        case 'Blacksmith':
          cls();
          console.log('not implemented');
          playMenu(player);
          break;
        case 'Profile':
          cls();
          profile(player);
          playMenu(player);
          break;
        case 'Inventory':
          cls();
          showInventory(player);
          playMenu(player);
          break;
        case 'Go to..':
          cls();
          goToMenu(player);
          break;
        case 'Home':
          cls();
          player.location = City.HOME;
          homeMenu(player);
          break;
        case 'Back':
          cls();
          mainMenu(player);
          break;
      }
    });
};

const goToMenu = (player: Player) => {
  let _choices = Object.values(Area);
  let index = _choices.indexOf(player.location as any);
  _choices.splice(index, 1);

  return inquirer
    .prompt([
      {
        type: 'list',
        message: 'Please select the area to which you wanna travel!\n',
        name: 'choice',
        choices: _choices,
      },
    ])
    .then((answers) => {
      switch (answers.choice) {
        case Area.CITY:
          player.location = Area.CITY;
          cls();
          infoLog();
          console.log('You are now in your city!');
          infoLogEnd();
          playMenu(player);
          break;
        case Area.FOREST:
          player.location = Area.FOREST;
          cls();
          infoLog();
          console.log('You are now in the forest near your city.');
          infoLogEnd();
          playMenu(player);
          break;
      }
    });
};

const homeMenu = (player: Player) => {
  return inquirer
    .prompt([
      {
        type: 'list',
        message: 'Please select an option!\n',
        name: 'choice',
        choices: ['Eat', 'Sleep', 'Help', 'Exit'],
      },
    ])
    .then((answers) => {
      switch (answers.choice) {
        case 'Eat':
          cls();
          eat(player);
          homeMenu(player);
          break;
        case 'Sleep':
          cls();
          sleep(player);
          homeMenu(player);
          break;
        case 'Help':
          cls();
          locationInfo(player);
          homeMenu(player);
          break;
        case 'Exit':
          cls();
          infoLog();
          console.log('You leave your house.');
          infoLogEnd();
          player.location = Area.CITY;
          playMenu(player);
          break;
      }
    });
};

const shopMenu = (player: Player) => {
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

const shopSellMenu = (player: Player) => {
  cls()
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
