import { cls } from './helpers/utils';
import { mainMenu } from './menus/mainMenu';
import { p1, Player } from './player/player';

const input = async (player: Player) => {
  let _input = await mainMenu(player);
  return _input;
};

const main = async (player: Player) => {
  cls();
  await input(player);
};

main(p1);
