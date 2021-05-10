"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeArmor = exports.changeSword = exports.locationInfo = exports.showInventory = exports.hunt = exports.setupStats = exports.battle = exports.profile = exports.sleep = exports.eat = exports.attack = exports.p1 = exports.changeMaxExp = exports.playerDefense = exports.playerAttack = exports.maxExp = exports.armors = exports.allEquipment = exports.allItems = exports.inventory = exports.equipment = exports.coins = exports.eatValue = exports.playerHp = exports.playerMaxHp = void 0;
const swords_1 = require("./items/swords");
const armors_1 = require("./items/armors");
const item = require("./items/items");
const sword = require("./items/swords");
const armor = require("./items/armors");
const area_1 = require("./locations/area");
const city_1 = require("./locations/city");
const utils_1 = require("./helpers/utils");
const logs_1 = require("./helpers/logs");
exports.playerMaxHp = 100;
exports.playerHp = exports.playerMaxHp;
exports.eatValue = 10;
exports.coins = 500;
exports.equipment = {
    sword: swords_1.WoodenSword,
    armor: armors_1.ClothArmor,
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
exports.inventory = [item.testItem, swords_1.WoodenSword, armors_1.ClothArmor];
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
const profile = (player) => {
    logs_1.infoLog();
    console.log(`Name: ${player.name}`);
    console.log(`HP: ${player.hp}/${player.maxHp}`);
    console.log(`Level: ${player.lvl}`);
    console.log(`Exp: ${player.exp}/${exports.maxExp}\n`);
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
                exports.setupStats(player);
            }
            break;
        }
    }
};
exports.battle = battle;
const setupStats = (player) => {
    player.attack = exports.playerAttack;
    player.defense = exports.playerDefense;
    player.attack += player.equipment.sword.attack + (player.lvl - 1);
    player.defense += player.equipment.armor.defense + (player.lvl - 1);
};
exports.setupStats = setupStats;
const hunt = (player, arr) => {
    let monster = utils_1.randomFromArr(arr);
    logs_1.infoLog();
    console.log(`You go hunting in the woods and find a ${monster.name.toLowerCase()}`);
    logs_1.infoLogEnd();
    exports.battle(player, monster);
};
exports.hunt = hunt;
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
