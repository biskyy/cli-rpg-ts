import inquirer from 'inquirer';
import { Player } from '../player/player';
import { cls } from '../helpers/utils';
import { infoLog, infoLogEnd } from '../helpers/logs';
import { Area } from '../locations/area';
import { playMenu } from './playMenu';

export const homeMenu = (player: Player) => {
  return inquirer
    .prompt([
      {
        type: 'list',
        message: 'Please select an option!\n',
        name: 'choice',
        choices: ['Eat', 'Sleep', 'Help', 'Exit'],
      },
    ])
    .then(async (answers) => {
      switch (answers.choice) {
        case 'Eat':
          cls();
          player.eat(20);
          homeMenu(player);
          break;
        case 'Sleep':
          cls();
          player.sleep();
          homeMenu(player);
          break;
        case 'Help':
          cls();
          await player.locationInfo();
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
