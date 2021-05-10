"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bsSellMenu = exports.bsBuyMenu = exports.bsMenu = void 0;
const player_1 = require("../player");
const utils_1 = require("../helpers/utils");
const logs_1 = require("../helpers/logs");
const playMenu_1 = require("./playMenu");
const area_1 = require("../locations/area");
const confirmMenu_1 = require("./confirmMenu");
const noItem_1 = require("../items/noItem");
const inquirer = require('inquirer');
const bsMenu = (player) => {
    return inquirer
        .prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Welcome to the Blacksmith!',
            choices: ['Buy', 'Sell', 'Help', 'Exit'],
        },
    ])
        .then((answers) => {
        switch (answers.choice) {
            case 'Exit':
                utils_1.cls();
                player.location = area_1.Area.CITY;
                playMenu_1.playMenu(player);
                break;
            case 'Buy':
                exports.bsBuyMenu(player);
                break;
            case 'Sell':
                if (player.inventory.filter((item) => {
                    return ['Armor', 'Sword'].includes(item.type);
                }).length > 0) {
                    utils_1.cls();
                    exports.bsSellMenu(player);
                    return;
                }
                else {
                    utils_1.cls();
                    logs_1.infoLog();
                    console.log(`Uh Oh. Looks like you don't have any items in your inventory, which means you can't sell anything.`);
                    logs_1.infoLogEnd();
                    exports.bsMenu(player);
                    return;
                }
                break;
            case 'Help':
                player_1.locationInfo(player);
                break;
        }
    });
};
exports.bsMenu = bsMenu;
const bsCatalog = utils_1.randomEquipmentFromArr(player_1.allEquipment, 4);
const _choices = bsCatalog.map((x) => x.name);
_choices.push('Back');
const bsBuyMenu = (player) => {
    utils_1.cls();
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
                exports.bsMenu(player);
                break;
            case bsCatalog[i].name:
                utils_1.cls();
                let confirmation = await confirmMenu_1.confirmMenu('buy this item');
                if (confirmation) {
                    if (player.coins >= bsCatalog[i].value) {
                        player.coins -= bsCatalog[i].value;
                        player.inventory.push(bsCatalog[i]);
                        logs_1.infoShopLog();
                        console.log(`You successfully bought ${bsCatalog[i].name}`);
                        logs_1.infoLogEnd();
                    }
                    else {
                        console.log(`You don't have enough money(${player.coins})`);
                    }
                    exports.bsBuyMenu(player);
                }
                else {
                    logs_1.infoLog();
                    console.log('You canceled this action!');
                    logs_1.infoLogEnd();
                    exports.bsBuyMenu(player);
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
        utils_1.cls();
        logs_1.infoLog();
        console.log(`Uh Oh. Looks like you don't have any items in your inventory, which means you can't sell anything.`);
        logs_1.infoLogEnd();
        exports.bsMenu(player);
        return;
    }
    for (let i = 0; i < player.inventory.length; i++) {
        if (player.inventory[i].type === 'Sword' ||
            player.inventory[i].type === 'Armor') {
            _choices.push(player.inventory[i].name);
        }
    }
    _choices.push('Back');
    return inquirer
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
                utils_1.cls();
                exports.bsMenu(player);
                break;
            case _choices[i]:
                let confirmation = await confirmMenu_1.confirmMenu('sell this item');
                if (confirmation) {
                    if (player.equipment.sword.name == answers.choice) {
                        utils_1.cls();
                        logs_1.infoLog();
                        console.log('WARNING! The item you trying to sell is your current Sword.');
                        logs_1.infoLogEnd();
                        let _confirmation = await confirmMenu_1.confirmMenu('you want to continue');
                        if (_confirmation) {
                            player.inventory.push(noItem_1.noSword);
                            player_1.changeSword(player, noItem_1.noSword);
                        }
                        else {
                            utils_1.cls();
                            logs_1.infoLog();
                            console.log('You canceled this action');
                            logs_1.infoLogEnd();
                            exports.bsSellMenu(player);
                            return;
                        }
                    }
                    if (player.equipment.armor.name == answers.choice) {
                        utils_1.cls();
                        logs_1.infoLog();
                        console.log('WARNING! The item you trying to sell is your current Armor.');
                        logs_1.infoLogEnd();
                        let _confirmation = await confirmMenu_1.confirmMenu('you want to continue');
                        if (_confirmation) {
                            player.inventory.push(noItem_1.noArmor);
                            player_1.changeArmor(player, noItem_1.noArmor);
                        }
                        else {
                            utils_1.cls();
                            logs_1.infoLog();
                            console.log('You canceled this action');
                            logs_1.infoLogEnd();
                            exports.bsSellMenu(player);
                            return;
                        }
                    }
                    player.coins += Math.ceil(player.inventory[invIndex].value / 1.5);
                    utils_1.cls();
                    logs_1.infoLog();
                    console.log(`You successfully sold your ${_choices[i]}.`);
                    logs_1.infoLogEnd();
                    player.inventory.splice(invIndex, 1);
                    exports.bsSellMenu(player);
                }
                else {
                    logs_1.infoLog();
                    console.log('You canceled this action');
                    logs_1.infoLogEnd();
                    exports.bsSellMenu(player);
                }
                break;
        }
    });
};
exports.bsSellMenu = bsSellMenu;
