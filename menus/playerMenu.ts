import { cls } from '../helpers/utils';
import { Player } from '../player/player';
import { playMenu } from './playMenu';

import inquirer from 'inquirer';
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
          player.profile();
          playerMenu(player);
          break;
        case 'Inventory':
          cls();
          player.printInventory();
          playerMenu(player);
          break;
        case 'Stats':
          cls();
          player.printStats();
          playerMenu(player);
          break;
        case 'Perks':
          cls();
          player.printPerks();
          playerMenu(player);
          break;
        case 'Back':
          cls();
          playMenu(player);
          break;
      }
    });
};
