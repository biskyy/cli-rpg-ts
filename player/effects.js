"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CounterAttackedEffect = exports.BleedingEffect = exports.DefenseBoostEffect = exports.Effect = void 0;
const logs_1 = require("../helpers/logs");
class Effect {
    name;
    target;
    roundsRemaining;
    constructor(name, target, roundsRemaining) {
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
}
exports.Effect = Effect;
class DefenseBoostEffect extends Effect {
    originalValue;
    constructor(name, target, roundsRemaining) {
        super(name, target, roundsRemaining);
        this.originalValue = target.defensePower;
    }
    applyEffect() {
        this.target.defensePower *= 1.25;
    }
    revertEffect() {
        this.target.defensePower = this.originalValue;
    }
    showResult() { }
}
exports.DefenseBoostEffect = DefenseBoostEffect;
class BleedingEffect extends Effect {
    constructor(name, target, roundsRemaining) {
        super(name, target, roundsRemaining);
    }
    showResult;
    applyEffect() {
        let bleedingDamage = Math.ceil(this.target.maxHp * 0.03);
        this.target.hp -= bleedingDamage;
        this.target.hp = Math.ceil(this.target.hp);
        this.showResult = async () => {
            await (0, logs_1.typewriter)(`[Lvl ${this.target.lvl}] ${this.target.name} took ${bleedingDamage} damage from the ${this.name}`);
        };
    }
    revertEffect() { }
}
exports.BleedingEffect = BleedingEffect;
class CounterAttackedEffect extends Effect {
    source;
    constructor(name, target, roundsRemaining, source) {
        super(name, target, roundsRemaining);
        this.source = source;
    }
    showResult;
    async applyEffect() {
        let attackPowerPercentageDifference = (Math.abs(this.source.attackPower - this.target.attackPower) /
            ((this.source.attackPower + this.target.attackPower) / 2)) *
            100;
        let dmg = Math.ceil((this.source.attackPower +
            this.source.equipment.weapon.damage +
            ((this.source.attackPower + this.source.equipment.weapon.damage) *
                (attackPowerPercentageDifference / 100)) /
                2) *
            (100 / (100 + this.target.defensePower)));
        this.target.hp -= dmg;
        this.showResult = async () => {
            await (0, logs_1.typewriter)(`[Lvl ${this.source.lvl}] ${this.source.name} countered [Lvl ${this.target.lvl}] ${this.target.name} attack and dealt ${dmg} damage back`);
        };
    }
    revertEffect() { }
}
exports.CounterAttackedEffect = CounterAttackedEffect;
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
