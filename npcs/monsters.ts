import { Player } from '../player/player';

export class Monster {
  name: string;
  hp: number;
  attackPower: number;
  defensePower: number;
  exp: number;
  coins: number;
  constructor(
    name: string,
    hp: number,
    attackPower: number,
    defensePower: number,
    exp: number,
    coins: number
  ) {
    this.name = name;
    this.hp = hp;
    this.attackPower = attackPower;
    this.defensePower = defensePower;
    this.exp = exp;
    this.coins = coins;
  }
  attack(player: Player) {
    let mDamage = Math.ceil(
      this.attackPower * (100 / (100 + player.defensePower))
    ); // damage calc for the monster

    player.hp -= mDamage; // subtract hp from the player

    this.hp = Math.max(0, this.hp); // round hp for the player

    console.log(
      'The ' + this.name.toLowerCase() + ' did ' + mDamage + ' damage to you' // log the action
    );
  }
}

export const monsters = {
  bee: new Monster(
    'Bee',
    10,
    3,
    1,
    Math.floor(Math.random() * 10) + 1,
    Math.floor(Math.random() * 5) + 1
  ),

  wolf: new Monster(
    'Wolf',
    20,
    4,
    5,
    Math.floor(Math.random() * 20) + 10,
    Math.floor(Math.random() * 15) + 5
  ),

  deer: new Monster(
    'Deer',
    20,
    0,
    15,
    Math.floor(Math.random() * 30) + 10,
    Math.floor(Math.random() * 25) + 10
  ),
};