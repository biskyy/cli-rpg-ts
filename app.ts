import { cls } from './helpers/utils';
import { mainMenu } from './menus/mainMenu';
import { p1, Player } from './player/player';
import { setupStats } from './player/playerUtils';

const input = async (player: Player) => {
  let _input = await mainMenu(player);
  return _input;
};

const main = async (player: Player) => {
  cls();
  setupStats(player);
  await input(player);
};

main(p1);
