"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPlayerDead = exports.checkExp = exports.changeArmor = exports.changeSword = exports.locationInfo = exports.showInventory = exports.setupStats = exports.profile = void 0;
const logs_1 = require("../helpers/logs");
const utils_1 = require("../helpers/utils");
const area_1 = require("../locations/area");
const city_1 = require("../locations/city");
const player_1 = require("./player");
const profile = (player) => {
    logs_1.infoLog();
    console.log(`Name: ${player.name}`);
    console.log(`HP: ${player.hp}/${player.maxHp}`);
    console.log(`Level: ${player.lvl}`);
    console.log(`Exp: ${player.exp}/${player_1.maxExp}\n`);
    console.log(`Attack: ${player.attack}`);
    console.log(`Defense: ${player.defense}\n`);
    console.log(`Coins: ${player.coins}`);
    console.log(`Location: ${player.location}\n`);
    console.log(`Equipment:`);
    console.log(`-Sword: ${player.equipment.sword.name}`);
    console.log(`-Armor: ${player.equipment.armor.name}`);
    logs_1.infoLogEnd();
};
exports.profile = profile;
const setupStats = (player) => {
    player.attack = player_1.playerAttack;
    player.defense = player_1.playerDefense;
    player.attack += player.equipment.sword.attack + (player.lvl - 1);
    player.defense += player.equipment.armor.defense + (player.lvl - 1);
};
exports.setupStats = setupStats;
const showInventory = (player) => {
    logs_1.infoLog();
    for (let i = 0; i < player.inventory.length; i++) {
        if (player.inventory[i].type === 'noArmor') {
            continue;
        }
        if (player.inventory[i].type === 'noSword') {
            continue;
        }
        console.log(`${i + 1}. ${player.inventory[i].name}`);
    }
    logs_1.infoLogEnd();
};
exports.showInventory = showInventory;
const locationInfo = (player) => {
    switch (player.location) {
        case area_1.Area.CITY:
            utils_1.cls();
            logs_1.infoLog();
            console.log('You are in your city.');
            console.log('From here you can go to shop to get some new items.');
            console.log('There is also the blacksmith from which you can buy new equipment!');
            logs_1.infoLogEnd();
            break;
        case area_1.Area.FOREST:
            utils_1.cls();
            logs_1.infoLog();
            console.log('You are in the forest near your city.');
            console.log('Here you can go hunting monsters.');
            console.log('By defeating monsters you can get coins and loot.');
            logs_1.infoLogEnd();
            break;
        case city_1.City.HOME:
            utils_1.cls();
            logs_1.infoLog();
            console.log('You are currently in your house.');
            console.log(`Here you can eat to regenarate health,`);
            console.log(`Or sleep when it's night time(sleeping will regenarate all your missing health).`);
            logs_1.infoLogEnd();
        case city_1.City.SHOP:
            logs_1.infoLog();
            console.log('You are currently in the shop from your city.');
            console.log('From here you can either buy new items,');
            console.log('or sell items from your inventory to get money');
            logs_1.infoLogEnd();
            break;
        case city_1.City.BLACKSMITH:
            logs_1.infoLog();
            console.log('You are in currently in the blacksmith from your city');
            console.log('From here you can either buy new equipment,');
            console.log('or sell equipment from your inventory for money.');
            logs_1.infoLogEnd();
            break;
    }
};
exports.locationInfo = locationInfo;
const changeSword = (player, sword) => {
    if (player.inventory.includes(sword)) {
        player.equipment.sword = sword;
        exports.setupStats(player);
    }
    else {
        utils_1.throwErr(`It's look like you don't have this item in your inventory.`);
    }
};
exports.changeSword = changeSword;
const changeArmor = (player, armor) => {
    if (player.inventory.includes(armor)) {
        player.equipment.armor = armor;
        exports.setupStats(player);
    }
    else {
        utils_1.throwErr(`It's look like you don't have this item in your inventory.`);
    }
};
exports.changeArmor = changeArmor;
const checkExp = (player) => {
    if (player.exp > player_1.maxExp) {
        updateLvl(player);
    }
    else {
        return;
    }
};
exports.checkExp = checkExp;
const updateLvl = (player) => {
    player.exp = 0;
    player.lvl += 1;
    player_1.changeMaxExp(1.2);
    logs_1.infoLog();
    console.log(`You leveled up! Congrats, you're now level ${player.lvl}`);
    logs_1.infoLogEnd();
    exports.setupStats(player);
};
const checkPlayerDead = (player) => {
    if (player.hp <= 0) {
        return true;
    }
    else {
        return false;
    }
};
exports.checkPlayerDead = checkPlayerDead;
