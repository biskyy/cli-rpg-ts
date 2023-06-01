"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopSellMenu = exports.shopBuyMenu = exports.shopMenu = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const logs_1 = require("../helpers/logs");
const utils_1 = require("../helpers/utils");
const area_1 = require("../locations/area");
const player_1 = require("../player/player");
const playerUtils_1 = require("../player/playerUtils");
const confirmMenu_1 = require("./confirmMenu");
const playMenu_1 = require("./playMenu");
const shopMenu = async (player) => {
    return inquirer_1.default
        .prompt([
        {
            type: 'list',
            message: 'Welcome to the Shop!\n',
            name: 'choice',
            choices: ['Buy', 'Sell', 'Help', 'Exit'],
        },
    ])
        .then(async (answers) => {
        switch (answers.choice) {
            case 'Buy':
                (0, utils_1.cls)();
                (0, exports.shopBuyMenu)(player);
                break;
            case 'Sell':
                if (player.inventory.filter((item) => item.type === 'Item').length > 0) {
                    (0, utils_1.cls)();
                    (0, exports.shopSellMenu)(player);
                }
                else {
                    (0, utils_1.cls)();
                    (0, logs_1.infoLog)();
                    console.log(`Uh Oh. Looks like you don't have any items in your inventory, which means you can't sell anything.`);
                    (0, logs_1.infoLogEnd)();
                    (0, exports.shopMenu)(player);
                    return;
                }
                break;
            case 'Help':
                (0, utils_1.cls)();
                await (0, playerUtils_1.locationInfo)(player);
                (0, exports.shopMenu)(player);
                break;
            case 'Exit':
                (0, utils_1.cls)();
                player.location = area_1.Area.CITY;
                (0, playMenu_1.playMenu)(player);
                break;
        }
    });
};
exports.shopMenu = shopMenu;
const shopCatalog = (0, utils_1.randomItemsFromArr)(player_1.allItems, 2);
const _choices = shopCatalog.map((x) => x.name);
_choices.push('Back');
const shopBuyMenu = (player) => {
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
                (0, exports.shopMenu)(player);
                break;
            case shopCatalog[i].name:
                (0, utils_1.cls)();
                let confirmation = await (0, confirmMenu_1.confirmMenu)('sell this item');
                if (confirmation) {
                    if (player.coins >= shopCatalog[i].value) {
                        player.coins -= shopCatalog[i].value;
                        player.inventory.push(shopCatalog[i]);
                        (0, logs_1.infoShopLog)();
                        console.log(`You successfully bought ${shopCatalog[i].name}`);
                        (0, logs_1.infoLogEnd)();
                    }
                    else {
                        console.log(`You don't have enough money(${player.coins})`);
                    }
                    (0, exports.shopBuyMenu)(player);
                }
                else {
                    (0, logs_1.infoLog)();
                    console.log('You canceled this action!');
                    (0, logs_1.infoLogEnd)();
                    (0, exports.shopBuyMenu)(player);
                }
                break;
        }
    });
};
exports.shopBuyMenu = shopBuyMenu;
const shopSellMenu = (player) => {
    let _choices = [];
    if (player.inventory.filter((item) => item.type === 'Item').length == 0) {
        (0, utils_1.cls)();
        (0, logs_1.infoLog)();
        console.log(`Uh Oh. Looks like you don't have any items in your inventory, which means you can't sell anything.`);
        (0, logs_1.infoLogEnd)();
        (0, exports.shopMenu)(player);
        return;
    }
    for (let i = 0; i < player.inventory.length; i++) {
        if (player.inventory[i].type === 'Item') {
            _choices.push(player.inventory[i].name);
        }
    }
    _choices.push('Back');
    return inquirer_1.default
        .prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Please select the item you want to sell!',
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
                (0, exports.shopMenu)(player);
                break;
            case _choices[i]:
                let confirmation = await (0, confirmMenu_1.confirmMenu)('sell this item');
                if (confirmation) {
                    player.coins += Math.ceil(player.inventory[invIndex].value / 1.5);
                    (0, logs_1.infoLog)();
                    console.log(`You successfully sold your ${_choices[i]}.`);
                    (0, logs_1.infoLogEnd)();
                    player.inventory.splice(invIndex, 1);
                    (0, exports.shopSellMenu)(player);
                }
                else {
                    (0, logs_1.infoLog)();
                    console.log('You canceled this action');
                    (0, logs_1.infoLogEnd)();
                    (0, exports.shopSellMenu)(player);
                }
                break;
        }
    });
};
exports.shopSellMenu = shopSellMenu;
