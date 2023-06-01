"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hunt = exports.battle = exports.sleep = exports.eat = exports.attack = exports.p1 = exports.changeMaxExp = exports.perks = exports.stats = exports.playerDefense = exports.playerAttack = exports.maxExp = exports.armors = exports.allEquipment = exports.allItems = exports.inventory = exports.equipment = exports.coins = exports.eatValue = exports.playerHp = exports.playerMaxHp = void 0;
const logs_1 = require("../helpers/logs");
const utils_1 = require("../helpers/utils");
const armor = __importStar(require("../items/armors"));
const item = __importStar(require("../items/items"));
const noItem_1 = require("../items/noItem");
const sword = __importStar(require("../items/swords"));
const area_1 = require("../locations/area");
const playerUtils_1 = require("./playerUtils");
exports.playerMaxHp = 100;
exports.playerHp = exports.playerMaxHp;
exports.eatValue = 10;
exports.coins = 500;
exports.equipment = {
    sword: noItem_1.noSword,
    armor: noItem_1.noArmor,
};
exports.inventory = [item.testItem];
exports.allItems = Object.values(item);
exports.allEquipment = Object.values(sword);
exports.armors = Object.values(armor);
exports.maxExp = 100;
exports.playerAttack = 10;
exports.playerDefense = 5;
exports.stats = {
    monstersKilled: { name: 'Monsters killed', count: 0 },
    strength: { name: 'Strength', count: 0 },
    treesChopped: { name: 'Trees chopped', count: 0 },
};
exports.perks = [];
const changeMaxExp = (n) => {
    exports.maxExp *= n;
};
exports.changeMaxExp = changeMaxExp;
class Player {
    name;
    origin;
    equipment;
    inventory;
    coins;
    maxHp;
    hp;
    lvl;
    exp;
    attack;
    defense;
    location;
    stats;
    perks;
    gameOver;
    constructor(name, equipment, inventory, coins, maxHp, hp, lvl, exp, attack, defense, location, stats, perks) {
        this.name = name;
        this.equipment = equipment;
        this.inventory = inventory;
        this.coins = coins;
        this.maxHp = maxHp;
        this.hp = maxHp;
        this.lvl = lvl;
        this.exp = exp;
        this.attack = attack;
        this.defense = defense;
        this.location = location;
        this.stats = stats;
        this.perks = perks;
    }
}
exports.p1 = new Player('Adventurer', exports.equipment, exports.inventory, exports.coins, exports.playerMaxHp, exports.playerHp, 1, 0, exports.playerAttack, exports.playerDefense, area_1.Area.CITY, exports.stats, exports.perks);
const attack = (player, monster) => {
    let pDamage = Math.ceil(player.attack * (100 / (100 + monster.defense)));
    let eDamage = Math.ceil(monster.attack * (100 / (100 + player.defense)));
    monster.hp -= pDamage;
    player.hp -= eDamage;
    monster.hp = Math.max(0, monster.hp);
    player.hp = Math.max(0, player.hp);
    (0, logs_1.infoHuntLog)();
    console.log('You did ' + pDamage + ' damage to a ' + monster.name.toLowerCase());
    console.log('The ' + monster.name.toLowerCase() + ' did ' + eDamage + ' damage to you');
    (0, logs_1.infoLogEnd)();
};
exports.attack = attack;
const eat = (player) => {
    if (player.hp >= exports.playerMaxHp) {
        player.hp = player.maxHp;
        (0, logs_1.infoLog)();
        console.log(`You're already full hp!(${player.hp}HP)`);
        (0, logs_1.infoLogEnd)();
        return;
    }
    if (player.hp >= exports.playerMaxHp - exports.eatValue) {
        player.hp = player.maxHp;
        (0, logs_1.infoLog)();
        console.log(`You restored your health. (${player.hp}HP)`);
        (0, logs_1.infoLogEnd)();
        return;
    }
    player.hp += exports.eatValue;
    (0, logs_1.infoLog)();
    console.log(`You restored ${exports.eatValue} hp.(${player.hp}HP)`);
    (0, logs_1.infoLogEnd)();
    return;
};
exports.eat = eat;
const sleep = (player) => {
    if (player.hp < player.maxHp) {
        player.hp = player.maxHp;
        (0, logs_1.infoLog)();
        console.log(`You went to sleep and regenerated all your health(${player.hp}HP).`);
        (0, logs_1.infoLogEnd)();
        return;
    }
    (0, logs_1.infoLog)();
    console.log('You went to sleep.');
    (0, logs_1.infoLogEnd)();
    return;
};
exports.sleep = sleep;
const battle = (player, monster) => {
    while (true) {
        (0, exports.attack)(player, monster);
        (0, utils_1.timeSleep)(1500);
        if ((0, playerUtils_1.checkPlayerDead)(player)) {
            (0, logs_1.infoLog)();
            console.log(`Uh Oh! Looks like you died to a ${monster.name}!`);
            (0, logs_1.infoLogEnd)();
            break;
        }
        if (monster.hp <= 0) {
            (0, logs_1.infoLog)();
            console.log(`You found and killed a ${monster.name.toLowerCase()}.`);
            console.log(`You have ${player.hp} hp remaining!`);
            console.log(`You've gained ${monster.exp} exp,`);
            console.log(`and received ${monster.coins} coins.`);
            (0, logs_1.infoLogEnd)();
            player.exp += monster.exp;
            player.coins += monster.coins;
            player.stats.monstersKilled.count += 1;
            (0, playerUtils_1.checkHunterPerk)(player);
            (0, playerUtils_1.checkExp)(player);
            break;
        }
    }
};
exports.battle = battle;
const hunt = (player, arr) => {
    let monster = (0, utils_1.randomFromArr)(arr);
    (0, logs_1.infoLog)();
    console.log(`You go hunting in the woods and find a ${monster.name.toLowerCase()}`);
    (0, logs_1.infoLogEnd)();
    (0, exports.battle)(player, monster);
};
exports.hunt = hunt;
