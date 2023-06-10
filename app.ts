import { cls } from './helpers/utils';
import { mainMenu } from './menus/mainMenu';
import { monsters } from './npcs/monsters';
import { p1, Player } from './player/player';

const main = async (player: Player) => {
  cls();
  player.duel(monsters.wolf);
};

main(p1);
