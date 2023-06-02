import inquirer from 'inquirer';
import { Player } from '../player/player';
import { Area } from '../locations/area';
import { City } from '../locations/city';
import { mainMenu } from './mainMenu';
import { goToMenu } from './goToMenu';
import { shopMenu } from './shopMenu';
import { homeMenu } from './homeMenu';
import { cls } from '../helpers/utils';
import { monsters } from '../npcs/monsters';
import { bsMenu } from './bsMenu';
import { playerMenu } from './playerMenu';

export const playMenu = (player: Player) => {
  let _choices;

  switch (player.location) {
    case Area.CITY:
      _choices = [
        'Home',
        'Shop',
        'Blacksmith',
        'Player Info',
        'Go to..',
        'Help',
        'Back',
      ];
      break;

    case Area.FOREST:
      _choices = ['Hunt', 'Player Info', 'Go to..', 'Help', 'Back'];
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
    .then(async (answers) => {
      switch (answers.choice) {
        case 'Help':
          cls();
          await player.locationInfo();
          playMenu(player);
          break;
        case 'Hunt':
          player.hunt(Object.values(monsters));
          playMenu(player);
          break;
        case 'Shop':
          cls();
          player.location = City.SHOP;
          shopMenu(player);
          break;
        case 'Blacksmith':
          cls();
          player.location = City.BLACKSMITH;
          bsMenu(player);
          break;
        case 'Player Info':
          cls();
          playerMenu(player);
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
