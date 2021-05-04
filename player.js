"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationInfo = exports.showInventory = exports.hunt = exports.setupStats = exports.battle = exports.profile = exports.sleep = exports.eat = exports.attack = exports.p1 = exports.changeMaxExp = exports.maxExp = exports.allItems = exports.inventory = exports.equipment = exports.coins = exports.eatValue = exports.playerHp = exports.playerMaxHp = void 0;
var item = require("./items");
var area_1 = require("./locations/area");
var city_1 = require("./locations/city");
var utils_1 = require("./utils");
exports.playerMaxHp = 100;
exports.playerHp = exports.playerMaxHp;
exports.eatValue = 10;
exports.coins = 500;
exports.equipment = {
    sword: item.WoodenSword,
    armor: item.ClothArmor,
};
exports.inventory = [
    item.testItem,
    exports.equipment.sword,
    exports.equipment.armor,
];
exports.allItems = Object.values(item);
exports.maxExp = 100;
var changeMaxExp = function (n) {
    exports.maxExp *= n;
};
exports.changeMaxExp = changeMaxExp;
exports.p1 = {
    name: 'Adventurer',
    equipment: exports.equipment,
    inventory: exports.inventory,
    coins: exports.coins,
    maxHp: exports.playerMaxHp,
    hp: exports.playerHp,
    lvl: 1,
    exp: 0,
    attack: 10,
    defense: 5,
    location: area_1.Area.CITY,
};
var attack = function (player, monster) {
    var pDamage = Math.ceil(player.attack * (100 / (100 + monster.defense)));
    var eDamage = Math.ceil(monster.attack * (100 / (100 + player.defense)));
    monster.hp -= pDamage;
    player.hp -= eDamage;
    monster.hp = Math.max(0, monster.hp);
    player.hp = Math.max(0, player.hp);
    utils_1.infoHuntLog();
    console.log('You did ' + pDamage + ' damage to a ' + monster.name.toLowerCase());
    console.log('The ' + monster.name.toLowerCase() + ' did ' + eDamage + ' damage to you');
    utils_1.infoLogEnd();
};
exports.attack = attack;
var eat = function (player) {
    if (player.hp >= exports.playerMaxHp) {
        player.hp = player.maxHp;
        utils_1.infoLog();
        console.log("You're already full hp!(" + player.hp + "HP)");
        utils_1.infoLogEnd();
        return;
    }
    if (player.hp >= exports.playerMaxHp - exports.eatValue) {
        player.hp = player.maxHp;
        utils_1.infoLog();
        console.log("You restored your health. (" + player.hp + "HP)");
        utils_1.infoLogEnd();
        return;
    }
    player.hp += exports.eatValue;
    utils_1.infoLog();
    console.log("You restored " + exports.eatValue + " hp.(" + player.hp + "HP)");
    utils_1.infoLogEnd();
    return;
};
exports.eat = eat;
var sleep = function (player) {
    if (player.hp < player.maxHp) {
        player.hp = player.maxHp;
        utils_1.infoLog();
        console.log("You went to sleep and regenerated all your health(" + player.hp + "HP).");
        utils_1.infoLogEnd();
        return;
    }
    utils_1.infoLog();
    console.log('You went to sleep.');
    utils_1.infoLogEnd();
    return;
};
exports.sleep = sleep;
var profile = function (player) {
    utils_1.infoLog();
    console.log("Name: " + player.name);
    console.log("HP: " + player.hp + "/" + player.maxHp);
    console.log("Level: " + player.lvl);
    console.log("Exp: " + player.exp + "/" + exports.maxExp + "\n");
    console.log("Attack: " + player.attack);
    console.log("Defense: " + player.defense + "\n");
    console.log("Coins: " + player.coins);
    console.log("Location: " + player.location + "\n");
    console.log("Equipment:");
    console.log("-Sword: " + player.equipment.sword.name);
    console.log("-Armor: " + player.equipment.armor.name);
    utils_1.infoLogEnd();
};
exports.profile = profile;
var battle = function (player, monster) {
    while (true) {
        exports.attack(player, monster);
        utils_1.timeSleep(1500);
        if (player.hp <= 0) {
            utils_1.infoLog();
            console.log('Looks like you died to a ' + monster.name + '!');
            utils_1.infoLogEnd();
            break;
        }
        if (monster.hp <= 0) {
            utils_1.infoLog();
            console.log("You found and killed a " + monster.name.toLowerCase() + ".");
            console.log("You have " + player.hp + " hp remaining!");
            console.log("You've gained " + monster.exp + " exp,");
            console.log("and received " + monster.coins + " coins.");
            utils_1.infoLogEnd();
            player.exp += monster.exp;
            player.coins += monster.coins;
            if (player.exp > exports.maxExp) {
                player.exp = 0;
                player.lvl += 1;
                exports.changeMaxExp(1.2);
                utils_1.infoLog();
                console.log("You leveled up! Congrats, you're now level " + player.lvl);
                utils_1.infoLogEnd();
                exports.setupStats(player);
            }
            break;
        }
    }
};
exports.battle = battle;
var setupStats = function (player) {
    player.attack += player.equipment.sword.attack + (player.lvl - 1);
    player.defense += player.equipment.armor.defense + (player.lvl - 1);
};
exports.setupStats = setupStats;
var hunt = function (player, arr) {
    var monster = utils_1.randomFromArr(arr);
    utils_1.infoLog();
    console.log("You go hunting in the woods and find a " + monster.name.toLowerCase());
    utils_1.infoLogEnd();
    exports.battle(player, monster);
};
exports.hunt = hunt;
var showInventory = function (player) {
    utils_1.infoLog();
    for (var i = 0; i < player.inventory.length; i++) {
        console.log(i + 1 + ". " + player.inventory[i].name);
    }
    utils_1.infoLogEnd();
};
exports.showInventory = showInventory;
var locationInfo = function (player) {
    switch (player.location) {
        case area_1.Area.CITY:
            utils_1.cls();
            utils_1.infoLog();
            console.log('You are in your city.');
            console.log('From here you can go to shop to get some new items.');
            console.log('There is also the blacksmith from which you can buy new equipment!');
            utils_1.infoLogEnd();
            break;
        case area_1.Area.FOREST:
            utils_1.cls();
            utils_1.infoLog();
            console.log('You are in the forest near your city.');
            console.log('Here you can go hunting monsters.');
            console.log('By defeating monsters you can get coins and loot.');
            utils_1.infoLogEnd();
            break;
        case city_1.City.HOME:
            utils_1.cls();
            utils_1.infoLog();
            console.log('You are currently in your house.');
            console.log("Here you can eat to regenarate health,");
            console.log("Or sleep when it's night time(sleeping will regenarate all your missing health).");
            utils_1.infoLogEnd();
        case city_1.City.SHOP:
            utils_1.infoLog();
            console.log('You are currently in the shop from your city.');
            console.log('From here you can either buy new items,');
            console.log('or sell items from your inventory to get money');
            utils_1.infoLogEnd();
            break;
    }
};
exports.locationInfo = locationInfo;
