"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Duel = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const logs_1 = require("../helpers/logs");
const utils_1 = require("../helpers/utils");
const effects_1 = require("./effects");
const confirmMenu_1 = require("../menus/confirmMenu");
class Duel {
    player;
    monster;
    roundNo;
    constructor(player, monster) {
        this.player = player;
        this.monster = monster;
        this.roundNo = 0;
    }
    async start() {
        await (0, logs_1.typewriter)(`[Lvl ${this.player.lvl}] ${this.player.name} challanged a [Lvl ${this.monster.lvl}] ${this.monster.name} to a duel.`);
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
        if (this.roundNo !== 0)
            (0, utils_1.cls)(); // prevent start method from getting cleared
        // player's turn
        await this.playerTurn();
        await (0, logs_1.playerConfirmation)();
        if (this.player.hasFleed)
            return; // checking if the player has fleed
        if (this.monster.hp <= 0)
            return; // checking if the monster is dead
        // effect applying and displaying for player
        (0, utils_1.cls)();
        for (const effect of this.player.effects) {
            await effect.applyEffect();
        }
        (0, logs_1.printBattleInfo)(this.player, this.monster);
        for (const effect of this.player.effects) {
            await effect.showResult();
            (0, logs_1.infoLogEnd)();
        }
        if (this.player.effects.length !== 0)
            await (0, logs_1.playerConfirmation)();
        // monster's turn
        await this.monsterTurn();
        await (0, logs_1.playerConfirmation)();
        // effect applying and displaying for monster
        (0, utils_1.cls)();
        for (const effect of this.monster.effects) {
            await effect.applyEffect();
        }
        (0, logs_1.printBattleInfo)(this.player, this.monster);
        for (const effect of this.monster.effects) {
            await effect.showResult();
            (0, logs_1.infoLogEnd)();
        }
        if (this.monster.effects.length !== 0)
            await (0, logs_1.playerConfirmation)();
        this.proccessEffects(); // process effects expiration date
        this.roundNo++; // increase number of rounds
    }
    async playerTurn() {
        (0, logs_1.printBattleInfo)(this.player, this.monster);
        await inquirer_1.default
            .prompt([
            {
                type: 'list',
                message: 'What will you do?',
                name: 'choice',
                choices: [
                    ...(this.player.equipment.weapon.abilities.map((ability) => ability.name) ?? []),
                ].concat(this.player.abilities.map((ability) => ability.name)),
            },
        ])
            .then(async (answer) => {
            switch (answer.choice) {
                case "Conqueror's Haki" /* CombatOptions.ConquerorsHaki */:
                    (0, utils_1.cls)();
                    await this.player.abilities
                        .find((ability) => ability.name === "Conqueror's Haki" /* CombatOptions.ConquerorsHaki */)
                        .use(this.monster);
                    break;
                case "Triple Shot" /* CombatOptions.TripleShot */:
                    (0, utils_1.cls)();
                    await this.player.equipment.weapon.abilities
                        .find((ability) => ability.name === "Triple Shot" /* CombatOptions.TripleShot */)
                        .use(this.monster, this.player);
                    break;
                case "Heart Piercer" /* CombatOptions.HeartPiercer */:
                    (0, utils_1.cls)();
                    await this.player.equipment.weapon.abilities
                        .find((ability) => ability.name === "Heart Piercer" /* CombatOptions.HeartPiercer */)
                        .use(this.monster, this.player);
                    break;
                case "Defend" /* CombatOptions.Defend */:
                    this.player.effects.push(new effects_1.DefenseBoostEffect("Defend" /* CombatOptions.Defend */, this.player, 1));
                    break;
                case "Counter Attack" /* CombatOptions.CounterAttack */:
                    this.player.equipment.weapon.abilities
                        .find((ability) => ability.name === "Counter Attack" /* CombatOptions.CounterAttack */)
                        .use(this.monster, this.player);
                    break;
                case "Flee" /* CombatOptions.Flee */:
                    const confirmation = await (0, confirmMenu_1.confirmMenu)('flee the battle');
                    if (confirmation) {
                        this.player.abilities
                            .find((ability) => ability.name === "Flee" /* CombatOptions.Flee */)
                            .use(this.player);
                    }
                    else {
                        (0, utils_1.cls)();
                        await this.playerTurn();
                    }
                    break;
                // case CombatOptions.SaySomething:
                //   this.player.abilities
                //     .find((ability) => ability.name === CombatOptions.SaySomething)
                //     .use(this.monster, this.player, 'say something');
                //   break;
                case "Basic Attack" /* CombatOptions.BasicAttack */:
                    this.player.equipment.weapon.abilities
                        .find((ability) => ability.name === "Basic Attack" /* CombatOptions.BasicAttack */)
                        .use(this.monster, this.player);
                    break;
            }
        });
    }
    async monsterTurn() {
        (0, utils_1.cls)();
        await this.monster.attack(this.player);
    }
}
exports.Duel = Duel;
