"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopSellMenu = exports.shopBuyMenu = exports.shopMenu = void 0;
const inquirer = require('inquirer');
const logs_1 = require("../helpers/logs");
const utils_1 = require("../helpers/utils");
const area_1 = require("../locations/area");
const player_1 = require("../player/player");
const playerUtils_1 = require("../player/playerUtils");
const confirmMenu_1 = require("./confirmMenu");
const playMenu_1 = require("./playMenu");
const shopMenu = (player) => {
    return inquirer
        .prompt([
        {
            type: 'list',
            message: 'Welcome to the Shop!\n',
            name: 'choice',
            choices: ['Buy', 'Sell', 'Help', 'Exit'],
        },
    ])
        .then((answers) => {
        switch (answers.choice) {
            case 'Buy':
                utils_1.cls();
                exports.shopBuyMenu(player);
                break;
            case 'Sell':
                if (player.inventory.filter((item) => item.type === 'Item').length > 0) {
                    utils_1.cls();
                    exports.shopSellMenu(player);
                }
                else {
                    utils_1.cls();
                    logs_1.infoLog();
                    console.log(`Uh Oh. Looks like you don't have any items in your inventory, which means you can't sell anything.`);
                    logs_1.infoLogEnd();
                    exports.shopMenu(player);
                    return;
                }
                break;
            case 'Help':
                utils_1.cls();
                playerUtils_1.locationInfo(player);
                break;
            case 'Exit':
                utils_1.cls();
                player.location = area_1.Area.CITY;
                playMenu_1.playMenu(player);
                break;
        }
    });
};
exports.shopMenu = shopMenu;
const shopCatalog = utils_1.randomItemsFromArr(player_1.allItems, 2);
const _choices = shopCatalog.map((x) => x.name);
_choices.push('Back');
const shopBuyMenu = (player) => {
    return inquirer
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
                utils_1.cls();
                exports.shopMenu(player);
                break;
            case shopCatalog[i].name:
                utils_1.cls();
                let confirmation = await confirmMenu_1.confirmMenu('sell this item');
                if (confirmation) {
                    if (player.coins >= shopCatalog[i].value) {
                        player.coins -= shopCatalog[i].value;
                        player.inventory.push(shopCatalog[i]);
                        logs_1.infoShopLog();
                        console.log(`You successfully bought ${shopCatalog[i].name}`);
                        logs_1.infoLogEnd();
                    }
                    else {
                        console.log(`You don't have enough money(${player.coins})`);
                    }
                    exports.shopBuyMenu(player);
                }
                else {
                    logs_1.infoLog();
                    console.log('You canceled this action!');
                    logs_1.infoLogEnd();
                    exports.shopBuyMenu(player);
                }
                break;
        }
    });
};
exports.shopBuyMenu = shopBuyMenu;
const shopSellMenu = (player) => {
    let _choices = [];
    if (player.inventory.filter((item) => item.type === 'Item').length == 0) {
        utils_1.cls();
        logs_1.infoLog();
        console.log(`Uh Oh. Looks like you don't have any items in your inventory, which means you can't sell anything.`);
        logs_1.infoLogEnd();
        exports.shopMenu(player);
        return;
    }
    for (let i = 0; i < player.inventory.length; i++) {
        if (player.inventory[i].type === 'Item') {
            _choices.push(player.inventory[i].name);
        }
    }
    _choices.push('Back');
    return inquirer
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
                utils_1.cls();
                exports.shopMenu(player);
                break;
            case _choices[i]:
                let confirmation = await confirmMenu_1.confirmMenu('sell this item');
                if (confirmation) {
                    player.coins += Math.ceil(player.inventory[invIndex].value / 1.5);
                    logs_1.infoLog();
                    console.log(`You successfully sold your ${_choices[i]}.`);
                    logs_1.infoLogEnd();
                    player.inventory.splice(invIndex, 1);
                    exports.shopSellMenu(player);
                }
                else {
                    logs_1.infoLog();
                    console.log('You canceled this action');
                    logs_1.infoLogEnd();
                    exports.shopSellMenu(player);
                }
                break;
        }
    });
};
exports.shopSellMenu = shopSellMenu;
