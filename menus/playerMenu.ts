import { cls } from '../helpers/utils';
import { Player } from '../player/player';
import { inventory, perks, profile, stats } from '../player/playerUtils';
import { playMenu } from './playMenu';

const inquirer = require('inquirer');

export const playerMenu = (player: Player) => {
  return inquirer
    .prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'Please select a option!',
        choices: ['Profile', 'Inventory', 'Stats', 'Perks', 'Back'],
      },
    ])
    .then((answers) => {
      switch (answers.choice) {
        case 'Profile':
          cls();
          profile(player);
          playerMenu(player);
          break;
        case 'Inventory':
          cls();
          inventory(player);
          playerMenu(player);
          break;
        case 'Stats':
          cls();
          stats(player);
          playerMenu(player);
          break;
        case 'Perks':
          cls();
          perks(player);
          break;
        case 'Back':
          cls();
          playMenu(player);
          break;
      }
    });
};
