import {
  infoLog,
  infoLogEnd,
  printBattleInfo,
  typewriter,
} from '../helpers/logs';
import { cls } from '../helpers/utils';
import { Monster } from '../npcs/monsters';
import { Character } from './character';
import { Player } from './player';

export abstract class Effect {
  name: string;
  target: Character;
  roundsRemaining: number;
  constructor(name: string, target: Character, roundsRemaining: number) {
    this.name = name;
    this.target = target;
    this.roundsRemaining = roundsRemaining;
  }

  checkIsExpired() {
    return this.roundsRemaining === 0;
  }
  subtractRoundsRemaining() {
    this.roundsRemaining--;
  }

  abstract showResult();
  abstract applyEffect();
  abstract revertEffect();
}

export class DefenseBoostEffect extends Effect {
  originalValue: any;
  constructor(name: string, target: Character, roundsRemaining: number) {
    super(name, target, roundsRemaining);
    this.originalValue = target.defensePower;
  }

  applyEffect() {
    this.target.defensePower *= 1.25;
  }

  revertEffect() {
    this.target.defensePower = this.originalValue;
  }
  showResult() {}
}

export class BleedingEffect extends Effect {
  constructor(name: string, target: Character, roundsRemaining: number) {
    super(name, target, roundsRemaining);
  }

  showResult: () => void;

  applyEffect() {
    let bleedingDamage = Math.ceil(this.target.maxHp * 0.03);
    this.target.hp -= bleedingDamage;
    this.target.hp = Math.ceil(this.target.hp);
    this.showResult = async () => {
      await typewriter(
        `[Lvl ${this.target.lvl}] ${this.target.name} took ${bleedingDamage} damage from the ${this.name}`
      );
    };
  }
  revertEffect() {}
}

export class CounterAttackedEffect extends Effect {
  source: Character;
  constructor(
    name: string,
    target: Character,
    roundsRemaining: number,
    source: Character
  ) {
    super(name, target, roundsRemaining);
    this.source = source;
  }
  showResult: () => void;

  async applyEffect(): Promise<void> {
    let attackPowerPercentageDifference =
      (Math.abs(this.source.attackPower - this.target.attackPower) /
        ((this.source.attackPower + this.target.attackPower) / 2)) *
      100;

    let dmg = Math.ceil(
      (this.source.attackPower +
        this.source.equipment.weapon.damage +
        ((this.source.attackPower + this.source.equipment.weapon.damage) *
          (attackPowerPercentageDifference / 100)) /
          2) *
        (100 / (100 + this.target.defensePower))
    );

    this.target.hp -= dmg;

    this.showResult = async () => {
      await typewriter(
        `[Lvl ${this.source.lvl}] ${this.source.name} countered [Lvl ${this.target.lvl}] ${this.target.name} attack and dealt ${dmg} damage back`
      );
    };
  }
  revertEffect() {}
}

// export class ChargingAttackEffect extends Effect {
//   source: Character;
//   constructor(
//     name: string,
//     target: Character,
//     roundsRemaining: number,
//     source: Character
//   ) {
//     super(name, target, roundsRemaining);
//     this.source = source;
//   }

//   applyEffect() {
//     if (this.roundsRemaining !== 1) return;

//     let dmg = Math.ceil(
//       (this.source.attackPower + this.source.equipment.weapon.damage * 1.5) *
//         (100 / (100 + this.target.defensePower))
//     );

//     this.target.hp -= dmg;
//     this.showResult = async () => {
//       await typewriter(
//         `[Lvl ${this.source.lvl}] ${this.source.name} successfully charged an attack against [Lvl ${this.target.lvl}] ${this.target.name} and dealt ${dmg}`
//       );
//     };
//   }
//   revertEffect() {}
//   showResult() {}
// }
