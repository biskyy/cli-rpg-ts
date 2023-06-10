"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monsters = exports.Monster = void 0;
const logs_1 = require("../helpers/logs");
const character_1 = require("../player/character");
class Monster extends character_1.Character {
    exp;
    coins;
    constructor(name, maxHp, lvl, attackPower, defensePower, exp, coins) {
        super(name, { weapon: null, armor: null }, [], maxHp, lvl, attackPower, defensePower);
        this.exp = exp;
        this.coins = coins;
    }
    async attack(player) {
        let mDamage = Math.ceil(this.attackPower * (100 / (100 + player.defensePower))); // damage calc for the monster
        player.hp -= mDamage; // subtract hp from the player
        player.hp = Math.max(0, player.hp); // round hp for the player
        (0, logs_1.printBattleInfo)(player, this);
        (0, logs_1.infoLog)();
        await (0, logs_1.typewriter)(`[Lvl ${this.lvl}] ${this.name} did ${mDamage} damage to [Lvl ${player.lvl}] ${player.name}` // log the action
        );
        (0, logs_1.infoLogEnd)();
    }
}
exports.Monster = Monster;
exports.monsters = {
    bee: new Monster('Bee', 10, 1, 3, 1, Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 5) + 1),
    wolf: new Monster('Wolf', 2700, 2, 5, 5, Math.floor(Math.random() * 20) + 10, Math.floor(Math.random() * 15) + 5),
    deer: new Monster('Deer', 20, 1, 0, 15, Math.floor(Math.random() * 30) + 10, Math.floor(Math.random() * 25) + 10),
};
