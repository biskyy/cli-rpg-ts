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
                (0, utils_1.cls)();
                (0, playerUtils_1.profile)(player);
                (0, exports.playerMenu)(player);
                break;
            case 'Inventory':
                (0, utils_1.cls)();
                (0, playerUtils_1.inventory)(player);
                (0, exports.playerMenu)(player);
                break;
            case 'Stats':
                (0, utils_1.cls)();
                (0, playerUtils_1.stats)(player);
                (0, exports.playerMenu)(player);
                break;
            case 'Perks':
                (0, utils_1.cls)();
                (0, playerUtils_1.perks)(player);
                break;
            case 'Back':
                (0, utils_1.cls)();
                (0, playMenu_1.playMenu)(player);
                break;
        }
    });
};
exports.playerMenu = playerMenu;
