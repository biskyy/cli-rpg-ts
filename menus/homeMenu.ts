const inquirer = require('inquirer');
import { Player, eat, sleep } from '../player/player';
import { cls } from '../helpers/utils';
import { infoLog, infoLogEnd } from '../helpers/logs';
import { Area } from '../locations/area';
import { playMenu } from './playMenu';
import { locationInfo } from '../player/playerUtils';

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
