import { typewriter } from './helpers/logs';
import { cls } from './helpers/utils';
import { mainMenu } from './menus/mainMenu';
import { p1, PlayerI } from './player/player';
import { setupStats } from './player/playerUtils';

const input = async (player: PlayerI) => {
  let _input = await mainMenu(player);
  return _input;
};

const main = async (player: PlayerI) => {
  cls();
  setupStats(player);
  await input(player);
};

main(p1);
