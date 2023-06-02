import inquirer from 'inquirer';
import { Player } from '../player/player';
import { cls } from '../helpers/utils';
import { playMenu } from './playMenu';

export const mainMenu = async (player: Player) => {
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
          player.printProfile();
          mainMenu(player);
          break;

        case 'Exit':
          cls();
          process.exit(0);
          break;

        default:
          break;
      }
    });
};
