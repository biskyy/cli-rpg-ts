import inquirer from 'inquirer';
import { Area } from '../locations/area';
import { cls } from '../helpers/utils';
import { infoLog, infoLogEnd } from '../helpers/logs';
import { playMenu } from './playMenu';
import { Player } from '../player/player';

export const goToMenu = (player: Player) => {
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
