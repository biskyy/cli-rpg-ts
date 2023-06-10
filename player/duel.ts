import inquirer from 'inquirer';
import {
  playerConfirmation,
  infoHuntLog,
  printBattleInfo,
  typewriter,
  infoLogEnd,
  infoLog,
} from '../helpers/logs';
import { Monster } from '../npcs/monsters';
import { CombatOptions, Player } from './player';
import { cls } from '../helpers/utils';
import { CounterAttackedEffect, DefenseBoostEffect, Effect } from './effects';
import { confirmMenu } from '../menus/confirmMenu';

export class Duel {
  player: Player;
  monster: Monster;
  roundNo: number;

  constructor(player: Player, monster: Monster) {
    this.player = player;
    this.monster = monster;
    this.roundNo = 0;
  }

  async start() {
    await typewriter(
      `[Lvl ${this.player.lvl}] ${this.player.name} challanged a [Lvl ${this.monster.lvl}] ${this.monster.name} to a duel.`
    );
  }

  proccessEffects() {
    for (let i = this.player.effects.length - 1; i >= 0; i--) {
      this.player.effects[i].subtractRoundsRemaining();
      if (this.player.effects[i].roundsRemaining <= 0) {
        this.player.effects[i]?.revertEffect();
        this.player.effects.splice(i, 1);
      }
    }
    for (let i = this.monster.effects.length - 1; i >= 0; i--) {
      this.monster.effects[i].subtractRoundsRemaining();
      if (this.monster.effects[i].roundsRemaining <= 0) {
        this.monster.effects[i]?.revertEffect();
        this.monster.effects.splice(i, 1);
      }
    }
  }

  async proccessRound() {
    if (this.roundNo !== 0) cls(); // prevent start method from getting cleared

    // player's turn
    await this.playerTurn();
    await playerConfirmation();

    if (this.player.hasFleed) return; // checking if the player has fleed
    if (this.monster.hp <= 0) return; // checking if the monster is dead

    // effect applying and displaying for player
    cls();
    for (const effect of this.player.effects) {
      await effect.applyEffect();
    }
    printBattleInfo(this.player, this.monster);
    for (const effect of this.player.effects) {
      await effect.showResult();
      infoLogEnd();
    }
    if (this.player.effects.length !== 0) await playerConfirmation();

    // monster's turn
    await this.monsterTurn();
    await playerConfirmation();

    // effect applying and displaying for monster
    cls();
    for (const effect of this.monster.effects) {
      await effect.applyEffect();
    }
    printBattleInfo(this.player, this.monster);
    for (const effect of this.monster.effects) {
      await effect.showResult();
      infoLogEnd();
    }
    if (this.monster.effects.length !== 0) await playerConfirmation();

    this.proccessEffects(); // process effects expiration date

    this.roundNo++; // increase number of rounds
  }

  async playerTurn() {
    printBattleInfo(this.player, this.monster);
    await inquirer
      .prompt([
        {
          type: 'list',
          message: 'What will you do?',
          name: 'choice',
          choices: [
            ...(this.player.equipment.weapon.abilities.map(
              (ability) => ability.name
            ) ?? []),
          ].concat(this.player.abilities.map((ability) => ability.name)),
        },
      ])
      .then(async (answer) => {
        switch (answer.choice) {
          case CombatOptions.ConquerorsHaki:
            cls();
            await this.player.abilities
              .find((ability) => ability.name === CombatOptions.ConquerorsHaki)
              .use(this.monster);
            break;
          case CombatOptions.TripleShot:
            cls();
            await this.player.equipment.weapon.abilities
              .find((ability) => ability.name === CombatOptions.TripleShot)
              .use(this.monster, this.player);
            break;
          case CombatOptions.HeartPiercer:
            cls();
            await this.player.equipment.weapon.abilities
              .find((ability) => ability.name === CombatOptions.HeartPiercer)
              .use(this.monster, this.player);
            break;
          case CombatOptions.Defend:
            this.player.effects.push(
              new DefenseBoostEffect(CombatOptions.Defend, this.player, 1)
            );
            break;
          case CombatOptions.CounterAttack:
            this.player.equipment.weapon.abilities
              .find((ability) => ability.name === CombatOptions.CounterAttack)
              .use(this.monster, this.player);
            break;
          case CombatOptions.Flee:
            const confirmation = await confirmMenu('flee the battle');
            if (confirmation) {
              this.player.abilities
                .find((ability) => ability.name === CombatOptions.Flee)
                .use(this.player);
            } else {
              cls();
              await this.playerTurn();
            }
            break;
          // case CombatOptions.SaySomething:
          //   this.player.abilities
          //     .find((ability) => ability.name === CombatOptions.SaySomething)
          //     .use(this.monster, this.player, 'say something');
          //   break;
          case CombatOptions.BasicAttack:
            this.player.equipment.weapon.abilities
              .find((ability) => ability.name === CombatOptions.BasicAttack)
              .use(this.monster, this.player);
            break;
        }
      });
  }

  async monsterTurn() {
    cls();
    await this.monster.attack(this.player);
  }
}
