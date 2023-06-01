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
exports.p1 = exports.Player = exports.armors = exports.allEquipment = exports.allItems = exports.inventory = void 0;
const logs_1 = require("../helpers/logs");
const utils_1 = require("../helpers/utils");
const armor = __importStar(require("../items/armors"));
const item = __importStar(require("../items/items"));
const noItem_1 = require("../items/noItem");
const sword = __importStar(require("../items/swords"));
const area_1 = require("../locations/area");
const city_1 = require("../locations/city");
const perks_1 = require("./perks");
exports.inventory = [item.testItem];
exports.allItems = Object.values(item);
exports.allEquipment = Object.values(sword);
exports.armors = Object.values(armor);
class Player {
    name;
    origin;
    equipment;
    inventory;
    coins;
    maxHp;
    hp;
    lvl;
    maxExp;
    exp;
    attackPower;
    defensePower;
    location;
    miscStats;
    perks;
    gameOver;
    constructor(name, equipment, inventory, coins, maxHp, hp, lvl, maxExp, exp, attackPower, defensePower, location, miscStats, perks) {
        this.name = name;
        this.equipment = equipment;
        this.inventory = inventory;
        this.coins = coins;
        this.maxHp = maxHp;
        this.hp = hp;
        this.lvl = lvl;
        this.maxExp = maxExp;
        this.exp = exp;
        this.attackPower = attackPower;
        this.defensePower = defensePower;
        this.location = location;
        this.miscStats = miscStats;
        this.perks = perks;
        this.gameOver = false;
    }
    changeMaxExp = (n) => {
        this.maxExp *= n;
    };
    eat = (eatValue) => {
        if (this.hp >= this.maxHp) {
            this.hp = this.maxHp;
            (0, logs_1.infoLog)();
            console.log(`You're already full hp!(${this.hp}HP)`);
            (0, logs_1.infoLogEnd)();
            return;
        }
        if (this.hp >= this.maxHp - eatValue) {
            this.hp = this.maxHp;
            (0, logs_1.infoLog)();
            console.log(`You restored your health. (${this.hp}HP)`);
            (0, logs_1.infoLogEnd)();
            return;
        }
        this.hp += eatValue;
        (0, logs_1.infoLog)();
        console.log(`You restored ${eatValue} hp.(${this.hp}HP)`);
        (0, logs_1.infoLogEnd)();
        return;
    };
    attack = (monster) => {
        let pDamage = Math.ceil(this.attackPower * (100 / (100 + monster.defense)));
        let eDamage = Math.ceil(monster.attack * (100 / (100 + this.defensePower)));
        monster.hp -= pDamage;
        this.hp -= eDamage;
        monster.hp = Math.max(0, monster.hp);
        this.hp = Math.max(0, this.hp);
        (0, logs_1.infoHuntLog)();
        console.log('You did ' + pDamage + ' damage to a ' + monster.name.toLowerCase());
        console.log('The ' + monster.name.toLowerCase() + ' did ' + eDamage + ' damage to you');
        (0, logs_1.infoLogEnd)();
    };
    battle = (monster) => {
        while (true) {
            this.attack(monster);
            (0, utils_1.timeSleep)(1500);
            if (this.checkPlayerDead()) {
                (0, logs_1.infoLog)();
                console.log(`Uh Oh! Looks like you died to a ${monster.name}!`);
                (0, logs_1.infoLogEnd)();
                break;
            }
            if (monster.hp <= 0) {
                (0, logs_1.infoLog)();
                console.log(`You found and killed a ${monster.name.toLowerCase()}.`);
                console.log(`You have ${this.hp} hp remaining!`);
                console.log(`You've gained ${monster.exp} exp,`);
                console.log(`and received ${monster.coins} coins.`);
                (0, logs_1.infoLogEnd)();
                this.exp += monster.exp;
                this.coins += monster.coins;
                this.miscStats.monstersKilled.count += 1;
                this.checkHunterPerk();
                this.checkExp();
                break;
            }
        }
    };
    hunt = (arr) => {
        let monster = (0, utils_1.randomFromArr)(arr);
        (0, logs_1.infoLog)();
        console.log(`You go hunting in the woods and find a ${monster.name.toLowerCase()}`);
        (0, logs_1.infoLogEnd)();
        this.battle(monster);
    };
    sleep = () => {
        if (this.hp < this.maxHp) {
            this.hp = this.maxHp;
            (0, logs_1.infoLog)();
            console.log(`You went to sleep and regenerated all your health(${this.hp}HP).`);
            (0, logs_1.infoLogEnd)();
            return;
        }
        (0, logs_1.infoLog)();
        console.log('You went to sleep.');
        (0, logs_1.infoLogEnd)();
        return;
    };
    profile = () => {
        (0, logs_1.infoLog)();
        console.log(`Name: ${this.name}`);
        console.log(`HP: ${this.hp}/${this.maxHp}`);
        console.log(`Level: ${this.lvl}`);
        console.log(`Exp: ${this.exp}/${this.maxExp}\n`);
        console.log(`Attack: ${this.attackPower}`);
        console.log(`Defense: ${this.defensePower}\n`);
        console.log(`Coins: ${this.coins}`);
        console.log(`Location: ${this.location}\n`);
        console.log(`Equipment:`);
        console.log(`-Sword: ${this.equipment.sword.name}`);
        console.log(`-Armor: ${this.equipment.armor.name}`);
        (0, logs_1.infoLogEnd)();
    };
    // setupStats = () => {
    //   this.attackPower = th;
    //   this.defensePower = playerDefense;
    //   this.attackPower +=
    //     this.equipment.sword.attackPower +
    //     (this.lvl - 1) +
    //     this.miscStats.strength.count;
    //   this.defensePower += this.equipment.armor.defensePower + (this.lvl - 1);
    // };
    printInventory = () => {
        (0, logs_1.infoLog)();
        for (let i = 0; i < this.inventory.length; i++) {
            if (this.inventory[i].type === 'noArmor') {
                continue;
            }
            if (this.inventory[i].type === 'noSword') {
                continue;
            }
            console.log(`${i + 1}. ${this.inventory[i].name}`);
        }
        (0, logs_1.infoLogEnd)();
    };
    locationInfo = async () => {
        switch (this.location) {
            case area_1.Area.CITY:
                (0, utils_1.cls)();
                (0, logs_1.infoLog)();
                await (0, logs_1.typewriter)('You are in your city.');
                await (0, logs_1.typewriter)('From here you can go to shop to get some new items.');
                await (0, logs_1.typewriter)('There is also the blacksmith from which you can buy new equipment!');
                (0, logs_1.infoLogEnd)();
                break;
            case area_1.Area.FOREST:
                (0, utils_1.cls)();
                (0, logs_1.infoLog)();
                await (0, logs_1.typewriter)('You are in the forest near your city.');
                await (0, logs_1.typewriter)('Here you can go hunting monsters.');
                await (0, logs_1.typewriter)('By defeating monsters you can get coins and loot.');
                (0, logs_1.infoLogEnd)();
                break;
            case city_1.City.HOME:
                (0, utils_1.cls)();
                (0, logs_1.infoLog)();
                await (0, logs_1.typewriter)('You are currently in your house.');
                await (0, logs_1.typewriter)(`Here you can eat to regenarate health,`);
                await (0, logs_1.typewriter)(`Or sleep when it's night time(sleeping will regenarate all your missing health).`);
                (0, logs_1.infoLogEnd)();
                break;
            case city_1.City.SHOP:
                (0, logs_1.infoLog)();
                await (0, logs_1.typewriter)('You are currently in the shop from your city.');
                await (0, logs_1.typewriter)('From here you can either buy new items,');
                await (0, logs_1.typewriter)('or sell items from your inventory to get money');
                (0, logs_1.infoLogEnd)();
                break;
            case city_1.City.BLACKSMITH:
                (0, logs_1.infoLog)();
                await (0, logs_1.typewriter)('You are in currently in the blacksmith from your city');
                await (0, logs_1.typewriter)('From here you can either buy new equipment,');
                await (0, logs_1.typewriter)('or sell equipment from your inventory for money.');
                (0, logs_1.infoLogEnd)();
                break;
        }
    };
    changeSword = (sword) => {
        if (this.inventory.includes(sword)) {
            this.equipment.sword = sword;
        }
        else {
            (0, utils_1.throwErr)(`It's look like you don't have this item in your inventory.`);
        }
    };
    changeArmor = (armor) => {
        if (this.inventory.includes(armor)) {
            this.equipment.armor = armor;
        }
        else {
            (0, utils_1.throwErr)(`It's look like you don't have this item in your inventory.`);
        }
    };
    checkExp = () => {
        if (this.exp > this.maxExp) {
            this.updateLvl();
        }
        else {
            return;
        }
    };
    updateLvl = () => {
        this.exp = 0;
        this.lvl += 1;
        this.changeMaxExp(1.2);
        (0, logs_1.infoLog)();
        console.log(`You leveled up! Congrats, you're now level ${this.lvl}`);
        (0, logs_1.infoLogEnd)();
    };
    checkPlayerDead = () => {
        if (this.hp <= 0) {
            return true;
        }
        else {
            return false;
        }
    };
    printStats = () => {
        for (let i in this.miscStats) {
            console.log(`${this.miscStats[i].name}: ${this.miscStats[i].count}`);
        }
    };
    printPerks = () => {
        if (this.perks.length > 0) {
            for (let i = 0; i < this.perks.length; i++) {
                console.log(this.perks[i]);
            }
        }
        else {
            (0, logs_1.infoLog)();
            console.log("Looks like you don't have any perks!");
            (0, logs_1.infoLogEnd)();
        }
    };
    newPerkInfo = (perk) => {
        (0, logs_1.infoLog)();
        console.log(`Congratulations! You have earned a new perk: ${perk}`);
        (0, logs_1.infoLogEnd)();
    };
    checkHunterPerk = () => {
        if (this.miscStats.monstersKilled.count >= 50) {
            this.perks.push(perks_1.Perk.HUNTER);
            this.newPerkInfo(perks_1.Perk.HUNTER);
        }
    };
}
exports.Player = Player;
exports.p1 = new Player('Adventurer', {
    sword: noItem_1.noSword,
    armor: noItem_1.noArmor,
}, [item.testItem], 500, 100, 100, 1, 100, 0, 10, 5, area_1.Area.CITY, {
    monstersKilled: { name: 'Monsters killed', count: 0 },
    strength: { name: 'Strength', count: 0 },
    treesChopped: { name: 'Trees chopped', count: 0 },
}, []);
