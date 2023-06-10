"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpeechAbility = exports.FleeAbility = exports.CounterAttackAbility = exports.BasicAttackAbility = exports.HeartPiercerAbility = exports.TripleShotAbility = exports.DefendBoostAbility = exports.ConquerorsHakiAbility = exports.WeaponAbility = exports.Ability = void 0;
const logs_1 = require("../helpers/logs");
const monsters_1 = require("../npcs/monsters");
const effects_1 = require("./effects");
const player_1 = require("./player");
class Ability {
    name;
    constructor(name) {
        this.name = name;
    }
}
exports.Ability = Ability;
class WeaponAbility extends Ability {
    weapon;
    constructor(name, weapon) {
        super(name);
        this.weapon = weapon;
    }
}
exports.WeaponAbility = WeaponAbility;
class ConquerorsHakiAbility extends Ability {
    source;
    constructor(name, source) {
        super(name);
        this.source = source;
    }
    async use(target) {
        // if (target.lvl <= this.source.lvl / 2)
        target.hp = 0;
        (0, logs_1.printBattleInfo)(this.source, target);
        (0, logs_1.infoLog)();
        await (0, logs_1.typewriter)(`[Lvl ${this.source.lvl}] ${this.source.name} used Conqueror's Haki on [Lvl ${target.lvl}] ${target.name}`);
        (0, logs_1.infoLogEnd)();
    }
}
exports.ConquerorsHakiAbility = ConquerorsHakiAbility;
class DefendBoostAbility extends Ability {
    constructor(name) {
        super(name);
    }
    use(target) {
        target.effects.push(new effects_1.DefenseBoostEffect('Defense Boost', target, 1));
    }
}
exports.DefendBoostAbility = DefendBoostAbility;
class TripleShotAbility extends WeaponAbility {
    constructor(name, weapon) {
        super(name, weapon);
        this.weapon = weapon;
    }
    async use(target, source) {
        let dmg = Math.ceil((source.attackPower + this.weapon.damage) *
            (30 / (100 + target.defensePower)) *
            3);
        target.hp -= dmg;
        target.hp = Math.max(0, target.hp); // round the hp of the monster
        (0, logs_1.printBattleInfo)(source instanceof player_1.Player ? source : target, source instanceof monsters_1.Monster ? source : target);
        (0, logs_1.infoLog)();
        await (0, logs_1.typewriter)(`[Lvl ${source.lvl}] ${source.name} did ${dmg} damage to [Lvl ${target.lvl}] ${target.name} using ${this.name}` // log the action
        );
        (0, logs_1.infoLogEnd)();
        target.effects.push(new effects_1.BleedingEffect('Bleeding Effect', target, 2));
    }
}
exports.TripleShotAbility = TripleShotAbility;
class HeartPiercerAbility extends WeaponAbility {
    constructor(name, weapon) {
        super(name, weapon);
    }
    async use(target, source) {
        let dmg = Math.ceil((source.attackPower + this.weapon.damage) *
            (100 / (100 + target.defensePower)) *
            1.2);
        target.hp -= dmg;
        target.hp = Math.max(0, target.hp); // round the hp of the monster
        (0, logs_1.printBattleInfo)(source instanceof player_1.Player ? source : target, source instanceof monsters_1.Monster ? source : target);
        (0, logs_1.infoLog)();
        await (0, logs_1.typewriter)(`[Lvl ${source.lvl}] ${source.name} did ${dmg} damage to [Lvl ${target.lvl}] ${target.name} using ${this.name}` // log the action
        );
        (0, logs_1.infoLogEnd)();
    }
}
exports.HeartPiercerAbility = HeartPiercerAbility;
class BasicAttackAbility extends WeaponAbility {
    constructor(name, weapon) {
        super(name, weapon);
    }
    async use(target, source) {
        let dmg = Math.ceil((source.attackPower + this.weapon.damage) *
            (100 / (100 + target.defensePower)));
        target.hp -= dmg;
        target.hp = Math.max(0, target.hp); // round the hp of the monster
        (0, logs_1.printBattleInfo)(source, target);
        (0, logs_1.infoLog)();
        await (0, logs_1.typewriter)(`[Lvl ${source.lvl}] ${source.name} did ${dmg} damage to [Lvl ${target.lvl}] ${target.name} using ${this.name}` // log the action
        );
        (0, logs_1.infoLogEnd)();
    }
}
exports.BasicAttackAbility = BasicAttackAbility;
class CounterAttackAbility extends WeaponAbility {
    constructor(name, weapon) {
        super(name, weapon);
    }
    use(target, source) {
        target.effects.push(new effects_1.CounterAttackedEffect('Counter Attacked', target, 1, source));
    }
}
exports.CounterAttackAbility = CounterAttackAbility;
class FleeAbility extends Ability {
    constructor(name) {
        super(name);
    }
    use(target) {
        target.hasFleed = true;
    }
}
exports.FleeAbility = FleeAbility;
class SpeechAbility extends Ability {
    constructor(name) {
        super(name);
    }
    async use(target, source, text) {
        (0, logs_1.infoLog)();
        await (0, logs_1.typewriter)(`[${source.lvl}] ${source.name} shouts: '${text}'`);
        (0, logs_1.infoLogEnd)();
    }
}
exports.SpeechAbility = SpeechAbility;
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
