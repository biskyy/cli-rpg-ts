"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bsSellMenu = exports.bsBuyMenu = exports.bsMenu = void 0;
const player_1 = require("../player/player");
const utils_1 = require("../helpers/utils");
const logs_1 = require("../helpers/logs");
const playMenu_1 = require("./playMenu");
const area_1 = require("../locations/area");
const confirmMenu_1 = require("./confirmMenu");
const inquirer_1 = __importDefault(require("inquirer"));
const bsMenu = (player) => {
    return inquirer_1.default
        .prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Welcome to the Blacksmith!',
            choices: ['Buy', 'Sell', 'Help', 'Exit'],
        },
    ])
        .then(async (answers) => {
        switch (answers.choice) {
            case 'Exit':
                (0, utils_1.cls)();
                player.location = area_1.Area.CITY;
                (0, playMenu_1.playMenu)(player);
                break;
            case 'Buy':
                (0, exports.bsBuyMenu)(player);
                break;
            case 'Sell':
                if (player.inventory.filter((item) => {
                    return ['Armor', 'Sword'].includes(item.type);
                }).length > 0) {
                    (0, utils_1.cls)();
                    (0, exports.bsSellMenu)(player);
                    return;
                }
                else {
                    (0, utils_1.cls)();
                    (0, logs_1.infoLog)();
                    console.log(`Uh Oh. Looks like you don't have any items in your inventory, which means you can't sell anything.`);
                    (0, logs_1.infoLogEnd)();
                    (0, exports.bsMenu)(player);
                    return;
                }
                break;
            case 'Help':
                await player.locationInfo();
                break;
        }
    });
};
exports.bsMenu = bsMenu;
const bsCatalog = (0, utils_1.randomEquipmentFromArr)(player_1.allEquipment, 4);
const _choices = bsCatalog.map((x) => x.name);
_choices.push('Back');
const bsBuyMenu = (player) => {
    (0, utils_1.cls)();
    return inquirer_1.default
        .prompt([
        {
            type: 'list',
            name: 'choice',
            message: `Please select the item to buy! You have ${player.coins} coins.`,
            choices: _choices,
        },
    ])
        .then(async (answers) => {
        let i = _choices.indexOf(answers.choice);
        switch (answers.choice) {
            case 'Back':
                (0, utils_1.cls)();
                (0, exports.bsMenu)(player);
                break;
            case bsCatalog[i].name:
                (0, utils_1.cls)();
                let confirmation = await (0, confirmMenu_1.confirmMenu)('buy this item');
                if (confirmation) {
                    if (player.coins >= bsCatalog[i].value) {
                        player.coins -= bsCatalog[i].value;
                        player.inventory.push(bsCatalog[i]);
                        (0, logs_1.infoShopLog)();
                        console.log(`You successfully bought ${bsCatalog[i].name}`);
                        (0, logs_1.infoLogEnd)();
                    }
                    else {
                        console.log(`You don't have enough money(${player.coins})`);
                    }
                    (0, exports.bsBuyMenu)(player);
                }
                else {
                    (0, logs_1.infoLog)();
                    console.log('You canceled this action!');
                    (0, logs_1.infoLogEnd)();
                    (0, exports.bsBuyMenu)(player);
                }
                break;
        }
    });
};
exports.bsBuyMenu = bsBuyMenu;
const bsSellMenu = (player) => {
    let _choices = [];
    if (player.inventory.filter((item) => {
        return ['Armor', 'Sword'].includes(item.type);
    }).length == 0) {
        (0, utils_1.cls)();
        (0, logs_1.infoLog)();
        console.log(`Uh Oh. Looks like you don't have any items in your inventory, which means you can't sell anything.`);
        (0, logs_1.infoLogEnd)();
        (0, exports.bsMenu)(player);
        return;
    }
    for (let i = 0; i < player.inventory.length; i++) {
        if (player.inventory[i].type === 'Sword' ||
            player.inventory[i].type === 'Armor') {
            _choices.push(player.inventory[i].name);
        }
    }
    _choices.push('Back');
    return inquirer_1.default
        .prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Please select a item to sell!\n',
            choices: _choices,
        },
    ])
        .then(async (answers) => {
        let i = _choices.indexOf(answers.choice);
        let invIndex = player.inventory
            .map((x) => x.name)
            .indexOf(answers.choice);
        switch (answers.choice) {
            case 'Back':
                (0, utils_1.cls)();
                (0, exports.bsMenu)(player);
                break;
            case _choices[i]:
                let confirmation = await (0, confirmMenu_1.confirmMenu)('sell this item');
                if (confirmation) {
                    if (player.equipment.sword.name == answers.choice) {
                        (0, utils_1.cls)();
                        (0, logs_1.infoLog)();
                        console.log('WARNING! The item you trying to sell is your current Sword.');
                        (0, logs_1.infoLogEnd)();
                        let _confirmation = await (0, confirmMenu_1.confirmMenu)('you want to continue');
                        if (_confirmation) {
                            player.changeSword(null);
                        }
                        else {
                            (0, utils_1.cls)();
                            (0, logs_1.infoLog)();
                            console.log('You canceled this action');
                            (0, logs_1.infoLogEnd)();
                            (0, exports.bsSellMenu)(player);
                            return;
                        }
                    }
                    if (player.equipment.armor.name == answers.choice) {
                        (0, utils_1.cls)();
                        (0, logs_1.infoLog)();
                        console.log('WARNING! The item you trying to sell is your current Armor.');
                        (0, logs_1.infoLogEnd)();
                        let _confirmation = await (0, confirmMenu_1.confirmMenu)('you want to continue');
                        if (_confirmation) {
                            player.changeArmor(null);
                        }
                        else {
                            (0, utils_1.cls)();
                            (0, logs_1.infoLog)();
                            console.log('You canceled this action');
                            (0, logs_1.infoLogEnd)();
                            (0, exports.bsSellMenu)(player);
                            return;
                        }
                    }
                    player.coins += Math.ceil(player.inventory[invIndex].value / 1.5);
                    (0, utils_1.cls)();
                    (0, logs_1.infoLog)();
                    console.log(`You successfully sold your ${_choices[i]}.`);
                    (0, logs_1.infoLogEnd)();
                    player.inventory.splice(invIndex, 1);
                    (0, exports.bsSellMenu)(player);
                }
                else {
                    (0, logs_1.infoLog)();
                    console.log('You canceled this action');
                    (0, logs_1.infoLogEnd)();
                    (0, exports.bsSellMenu)(player);
                }
                break;
        }
    });
};
exports.bsSellMenu = bsSellMenu;
