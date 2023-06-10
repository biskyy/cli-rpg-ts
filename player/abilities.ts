import {
  infoLog,
  infoLogEnd,
  printBattleInfo,
  typewriter,
} from '../helpers/logs';
import { Weapon } from '../items/weapons';
import { Monster } from '../npcs/monsters';
import { Character } from './character';
import {
  BleedingEffect,
  CounterAttackedEffect,
  DefenseBoostEffect,
} from './effects';
import { CombatOptions, Player } from './player';

export abstract class Ability {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  abstract use(target?: Character, source?: Character);
}

export abstract class WeaponAbility extends Ability {
  weapon: Weapon;
  constructor(name: string, weapon: Weapon) {
    super(name);
    this.weapon = weapon;
  }

  abstract use(target?: Character, source?: Character);
}

export class ConquerorsHakiAbility extends Ability {
  source: Character;
  constructor(name: string, source: Character) {
    super(name);
    this.source = source;
  }

  async use(target: Character) {
    // if (target.lvl <= this.source.lvl / 2)
    target.hp = 0;
    printBattleInfo(this.source, target);
    infoLog();
    await typewriter(
      `[Lvl ${this.source.lvl}] ${this.source.name} used Conqueror's Haki on [Lvl ${target.lvl}] ${target.name}`
    );
    infoLogEnd();
  }
}

export class DefendBoostAbility extends Ability {
  constructor(name: string) {
    super(name);
  }
  use(target: Character) {
    target.effects.push(new DefenseBoostEffect('Defense Boost', target, 1));
  }
}

export class TripleShotAbility extends WeaponAbility {
  constructor(name: string, weapon: Weapon) {
    super(name, weapon);
    this.weapon = weapon;
  }

  async use(target: Character, source: Character) {
    let dmg = Math.ceil(
      (source.attackPower + this.weapon.damage) *
        (30 / (100 + target.defensePower)) *
        3
    );
    target.hp -= dmg;
    target.hp = Math.max(0, target.hp); // round the hp of the monster
    printBattleInfo(
      source instanceof Player ? source : target,
      source instanceof Monster ? source : target
    );
    infoLog();
    await typewriter(
      `[Lvl ${source.lvl}] ${source.name} did ${dmg} damage to [Lvl ${target.lvl}] ${target.name} using ${this.name}` // log the action
    );
    infoLogEnd();
    target.effects.push(new BleedingEffect('Bleeding Effect', target, 2));
  }
}

export class HeartPiercerAbility extends WeaponAbility {
  constructor(name: string, weapon: Weapon) {
    super(name, weapon);
  }

  async use(target: Character, source: Character) {
    let dmg = Math.ceil(
      (source.attackPower + this.weapon.damage) *
        (100 / (100 + target.defensePower)) *
        1.2
    );
    target.hp -= dmg;
    target.hp = Math.max(0, target.hp); // round the hp of the monster
    printBattleInfo(
      source instanceof Player ? source : target,
      source instanceof Monster ? source : target
    );
    infoLog();
    await typewriter(
      `[Lvl ${source.lvl}] ${source.name} did ${dmg} damage to [Lvl ${target.lvl}] ${target.name} using ${this.name}` // log the action
    );
    infoLogEnd();
  }
}

export class BasicAttackAbility extends WeaponAbility {
  constructor(name: string, weapon: Weapon) {
    super(name, weapon);
  }

  async use(target: Character, source: Character) {
    let dmg = Math.ceil(
      (source.attackPower + this.weapon.damage) *
        (100 / (100 + target.defensePower))
    );
    target.hp -= dmg;
    target.hp = Math.max(0, target.hp); // round the hp of the monster
    printBattleInfo(source, target);
    infoLog();
    await typewriter(
      `[Lvl ${source.lvl}] ${source.name} did ${dmg} damage to [Lvl ${target.lvl}] ${target.name} using ${this.name}` // log the action
    );
    infoLogEnd();
  }
}

export class CounterAttackAbility extends WeaponAbility {
  constructor(name: string, weapon: Weapon) {
    super(name, weapon);
  }

  use(target: Character, source: Character) {
    target.effects.push(
      new CounterAttackedEffect('Counter Attacked', target, 1, source)
    );
  }
}

export class FleeAbility extends Ability {
  constructor(name: string) {
    super(name);
  }

  use(target: Player) {
    target.hasFleed = true;
  }
}

export class SpeechAbility extends Ability {
  constructor(name: string) {
    super(name);
  }

  async use(target?: Character, source?: Character, text?: string) {
    infoLog();
    await typewriter(`[${source.lvl}] ${source.name} shouts: '${text}'`);
    infoLogEnd();
  }
}

// export class ChargedAttackAbility extends WeaponAbility {
//   constructor(name: string, weapon: Weapon) {
//     super(name, weapon);
//   }

//   use(target?: Character, source?: Character) {
//     source.effects.push(
//       new ChargingAttackEffect('Charging', target, 2, source)
//     );
//   }
// }
