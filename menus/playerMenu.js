"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerMenu = void 0;
const utils_1 = require("../helpers/utils");
const playerUtils_1 = require("../player/playerUtils");
const playMenu_1 = require("./playMenu");
const inquirer = require('inquirer');
const playerMenu = (player) => {
    return inquirer
        .prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Please select a option!',
            choices: ['Profile', 'Inventory', 'Stats', 'Perks', 'Back'],
        },
    ])
        .then((answers) => {
        switch (answers.choice) {
            case 'Profile':
                utils_1.cls();
                playerUtils_1.profile(player);
                exports.playerMenu(player);
                break;
            case 'Inventory':
                utils_1.cls();
                playerUtils_1.inventory(player);
                exports.playerMenu(player);
                break;
            case 'Stats':
                utils_1.cls();
                playerUtils_1.stats(player);
                exports.playerMenu(player);
                break;
            case 'Perks':
                utils_1.cls();
                playerUtils_1.perks(player);
                break;
            case 'Back':
                utils_1.cls();
                playMenu_1.playMenu(player);
                break;
        }
    });
};
exports.playerMenu = playerMenu;
