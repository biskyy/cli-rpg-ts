"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerMenu = void 0;
const playerUtils_1 = require("../player/playerUtils");
const inquirer = require('inquirer');
const playerMenu = (player) => {
    return inquirer
        .prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Please select a option!',
            choices: ['Profile', 'Inventory', 'Stats', 'Back'],
        },
    ])
        .then((answers) => {
        switch (answers.choice) {
            case 'Profile':
                playerUtils_1.profile(player);
                break;
            case 'Inventory':
                playerUtils_1.inventory(player);
                break;
            case 'Stats':
                playerUtils_1.stats(player);
                break;
        }
    });
};
exports.playerMenu = playerMenu;
