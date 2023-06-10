"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Character = void 0;
class Character {
    name;
    abilities;
    equipment;
    maxHp;
    hp;
    lvl;
    attackPower;
    defensePower;
    effects = [];
    constructor(name, equipment, abilities, maxHp, lvl, attackPower, defensePower) {
        this.name = name;
        this.equipment = equipment;
        this.abilities = abilities;
        this.maxHp = maxHp;
        this.hp = maxHp;
        this.lvl = lvl;
        this.attackPower = attackPower;
        this.defensePower = defensePower;
    }
}
exports.Character = Character;
