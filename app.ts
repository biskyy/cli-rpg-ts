import { Player, p1, setupStats } from './player';
import { cls } from './utils';
import { mainMenu, confirmMenu } from './menus';

const input = async (player: Player) => {
  let _input = await mainMenu(player);
  return _input;
};

const main = async (player: Player) => {
  setupStats(player);
  cls();
  await input(player);
};

main(p1);
