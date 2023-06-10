import {
  infoLog,
  infoLogEnd,
  printBattleInfo,
  typewriter,
} from '../helpers/logs';
import { Character } from '../player/character';
import { Player } from '../player/player';

export class Monster extends Character {
  exp: number;
  coins: number;
  constructor(
    name: string,
    maxHp: number,
    lvl: number,
    attackPower: number,
    defensePower: number,
    exp: number,
    coins: number
  ) {
    super(
      name,
      { weapon: null, armor: null },
      [],
      maxHp,
      lvl,
      attackPower,
      defensePower
    );
    this.exp = exp;
    this.coins = coins;
  }
  async attack(player: Player) {
    let mDamage = Math.ceil(
      this.attackPower * (100 / (100 + player.defensePower))
    ); // damage calc for the monster

    player.hp -= mDamage; // subtract hp from the player

    player.hp = Math.max(0, player.hp); // round hp for the player
    printBattleInfo(player, this);
    infoLog();
    await typewriter(
      `[Lvl ${this.lvl}] ${this.name} did ${mDamage} damage to [Lvl ${player.lvl}] ${player.name}` // log the action
    );
    infoLogEnd();
  }
}

export const monsters = {
  bee: new Monster(
    'Bee',
    10,
    1,
    3,
    1,
    Math.floor(Math.random() * 10) + 1,
    Math.floor(Math.random() * 5) + 1
  ),

  wolf: new Monster(
    'Wolf',
    2700,
    2,
    5,
    5,
    Math.floor(Math.random() * 20) + 10,
    Math.floor(Math.random() * 15) + 5
  ),

  deer: new Monster(
    'Deer',
    20,
    1,
    0,
    15,
    Math.floor(Math.random() * 30) + 10,
    Math.floor(Math.random() * 25) + 10
  ),
};
