"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hunt = exports.battle = exports.sleep = exports.eat = exports.attack = exports.p1 = exports.changeMaxExp = exports.playerDefense = exports.playerAttack = exports.maxExp = exports.armors = exports.allEquipment = exports.allItems = exports.inventory = exports.equipment = exports.coins = exports.eatValue = exports.playerHp = exports.playerMaxHp = void 0;
const logs_1 = require("../helpers/logs");
const utils_1 = require("../helpers/utils");
const armor = require("../items/armors");
const item = require("../items/items");
const noItem_1 = require("../items/noItem");
const sword = require("../items/swords");
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
const changeMaxExp = (n) => {
    exports.maxExp *= n;
};
exports.changeMaxExp = changeMaxExp;
exports.inventory = [item.testItem];
exports.p1 = {
    name: 'Adventurer',
    equipment: exports.equipment,
    inventory: exports.inventory,
    coins: exports.coins,
    maxHp: exports.playerMaxHp,
    hp: exports.playerHp,
    lvl: 1,
    exp: 0,
    attack: exports.playerAttack,
    defense: exports.playerDefense,
    location: area_1.Area.CITY,
    gameOver: false,
};
const attack = (player, monster) => {
    let pDamage = Math.ceil(player.attack * (100 / (100 + monster.defense)));
    let eDamage = Math.ceil(monster.attack * (100 / (100 + player.defense)));
    monster.hp -= pDamage;
    player.hp -= eDamage;
    monster.hp = Math.max(0, monster.hp);
    player.hp = Math.max(0, player.hp);
    logs_1.infoHuntLog();
    console.log('You did ' + pDamage + ' damage to a ' + monster.name.toLowerCase());
    console.log('The ' + monster.name.toLowerCase() + ' did ' + eDamage + ' damage to you');
    logs_1.infoLogEnd();
};
exports.attack = attack;
const eat = (player) => {
    if (player.hp >= exports.playerMaxHp) {
        player.hp = player.maxHp;
        logs_1.infoLog();
        console.log(`You're already full hp!(${player.hp}HP)`);
        logs_1.infoLogEnd();
        return;
    }
    if (player.hp >= exports.playerMaxHp - exports.eatValue) {
        player.hp = player.maxHp;
        logs_1.infoLog();
        console.log(`You restored your health. (${player.hp}HP)`);
        logs_1.infoLogEnd();
        return;
    }
    player.hp += exports.eatValue;
    logs_1.infoLog();
    console.log(`You restored ${exports.eatValue} hp.(${player.hp}HP)`);
    logs_1.infoLogEnd();
    return;
};
exports.eat = eat;
const sleep = (player) => {
    if (player.hp < player.maxHp) {
        player.hp = player.maxHp;
        logs_1.infoLog();
        console.log(`You went to sleep and regenerated all your health(${player.hp}HP).`);
        logs_1.infoLogEnd();
        return;
    }
    logs_1.infoLog();
    console.log('You went to sleep.');
    logs_1.infoLogEnd();
    return;
};
exports.sleep = sleep;
const battle = (player, monster) => {
    while (true) {
        exports.attack(player, monster);
        utils_1.timeSleep(1500);
        if (player.hp <= 0) {
            logs_1.infoLog();
            console.log('Looks like you died to a ' + monster.name + '!');
            logs_1.infoLogEnd();
            break;
        }
        if (monster.hp <= 0) {
            logs_1.infoLog();
            console.log(`You found and killed a ${monster.name.toLowerCase()}.`);
            console.log(`You have ${player.hp} hp remaining!`);
            console.log(`You've gained ${monster.exp} exp,`);
            console.log(`and received ${monster.coins} coins.`);
            logs_1.infoLogEnd();
            player.exp += monster.exp;
            player.coins += monster.coins;
            if (player.exp > exports.maxExp) {
                player.exp = 0;
                player.lvl += 1;
                exports.changeMaxExp(1.2);
                logs_1.infoLog();
                console.log(`You leveled up! Congrats, you're now level ${player.lvl}`);
                logs_1.infoLogEnd();
                playerUtils_1.setupStats(player);
            }
            break;
        }
    }
};
exports.battle = battle;
const hunt = (player, arr) => {
    let monster = utils_1.randomFromArr(arr);
    logs_1.infoLog();
    console.log(`You go hunting in the woods and find a ${monster.name.toLowerCase()}`);
    logs_1.infoLogEnd();
    exports.battle(player, monster);
};
exports.hunt = hunt;
