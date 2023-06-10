"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.p1 = exports.Player = exports.allEquipment = exports.allItems = exports.inventory = void 0;
const logs_1 = require("../helpers/logs");
const utils_1 = require("../helpers/utils");
const items_1 = require("../items/items");
const armors_1 = require("../items/armors");
const weapons_1 = require("../items/weapons");
const area_1 = require("../locations/area");
const city_1 = require("../locations/city");
const perks_1 = require("./perks");
const duel_1 = require("./duel");
const abilities_1 = require("./abilities");
const character_1 = require("./character");
exports.inventory = [items_1.items.testItem];
exports.allItems = Object.values(items_1.items);
exports.allEquipment = Object.values({
    ...armors_1.armors,
    ...weapons_1.weapons,
});
class Player extends character_1.Character {
    origin;
    inventory;
    coins;
    maxExp;
    exp;
    location;
    miscStats;
    perks;
    hasFleed;
    gameOver;
    constructor(name, equipment, inventory, coins, maxHp, lvl, maxExp, exp, attackPower, defensePower, location, miscStats, perks) {
        super(name, equipment, [], maxHp, lvl, attackPower, defensePower);
        this.abilities.push(new abilities_1.ConquerorsHakiAbility("Conqueror's Haki" /* CombatOptions.ConquerorsHaki */, this), new abilities_1.DefendBoostAbility("Defend" /* CombatOptions.Defend */), new abilities_1.FleeAbility('Flee'), new abilities_1.SpeechAbility("Say Something" /* CombatOptions.SaySomething */));
        this.inventory = inventory;
        this.coins = coins;
        this.maxExp = maxExp;
        this.exp = exp;
        this.location = location;
        this.miscStats = miscStats;
        this.perks = perks;
        this.hasFleed = false;
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
    // attack = async (monster: Monster) => {
    //   let pDamage = Math.ceil(
    //     // damage calc for player
    //     ((this.equipment.weapon != null ? this.equipment.weapon.damage : 0) +
    //       this.attackPower) *
    //       (100 / (100 + monster.defensePower))
    //   );
    //   monster.hp -= pDamage; // subtract hp from monster
    //   monster.hp = Math.max(0, monster.hp); // round the hp of the monster
    //   printBattleInfo(this, monster);
    //   infoLog();
    //   await typewriter(
    //     `You did ${pDamage} damage to [Lvl ${monster.lvl}] ${monster.name}` // log the action
    //   );
    //   infoLogEnd();
    // };
    duel = async (monster) => {
        const duel = new duel_1.Duel(this, monster);
        await duel.start();
        while (duel.player.hp > 0 && duel.monster.hp > 0 && !duel.player.hasFleed) {
            await duel.proccessRound();
            if (duel.player.hasFleed) {
                (0, logs_1.infoLog)();
                await (0, logs_1.typewriter)(`[Lvl ${duel.player.lvl}] ${duel.player.name} decides to flee the battle like a coward!`);
                (0, logs_1.infoLogEnd)();
                duel.player.hasFleed = false;
                break;
            }
        }
        if (duel.player.hp <= 0) {
            duel.player.coins /= 2;
            (0, logs_1.infoLog)();
            await (0, logs_1.typewriter)(`Seems like you died to [Lvl ${duel.monster.lvl}] ${monster.name}`);
            await (0, logs_1.typewriter)(`You lost ${duel.player.coins / 2} coins`);
            (0, logs_1.infoLogEnd)();
        }
        if (duel.monster.hp <= 0) {
            duel.player.exp += duel.monster.exp;
            duel.player.coins += duel.monster.coins;
            this.checkExp();
            (0, logs_1.infoLog)();
            await (0, logs_1.typewriter)(`Congrats on defeating [Lvl ${duel.monster.lvl}] ${monster.name}`);
            await (0, logs_1.typewriter)(`You gained ${duel.monster.exp} points of experience and find ${duel.monster.coins} coins while looting the dead body.`);
            (0, logs_1.infoLogEnd)();
        }
        return;
    };
    hunt = (arr) => {
        let monster = (0, utils_1.randomFromArr)(arr);
        (0, logs_1.infoHuntLog)();
        console.log(`You go hunting in the woods and find a ${monster.name.toLowerCase()}`);
        (0, logs_1.infoLogEnd)();
        this.duel(monster);
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
    printProfile = () => {
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
        console.log(`-Weapon: ${this.equipment.weapon != null
            ? this.equipment.weapon.name
            : 'No sword equipped'}`);
        console.log(`-Armor: ${this.equipment.armor != null
            ? this.equipment.armor.name
            : 'No armor equipped'}`);
        (0, logs_1.infoLogEnd)();
    };
    printInventory = () => {
        (0, logs_1.infoLog)();
        for (let i = 0; i < this.inventory.length; i++) {
            if (this.inventory[i].type === items_1.ItemType.NOARMOR ||
                this.inventory[i].type === items_1.ItemType.NOSWORD) {
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
    changeWeapon = (weapon) => {
        if (this.inventory.includes(weapon)) {
            this.equipment.weapon = weapon;
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
    weapon: weapons_1.weapons.JujuBow,
    armor: null,
}, [items_1.items.testItem], 500, 100, 1, 100, 0, 10, 5, area_1.Area.CITY, {
    monstersKilled: { name: 'Monsters killed', count: 0 },
    strength: { name: 'Strength', count: 0 },
    treesChopped: { name: 'Trees chopped', count: 0 },
}, []);
