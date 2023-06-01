"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerMenu = void 0;
const utils_1 = require("../helpers/utils");
const playMenu_1 = require("./playMenu");
const inquirer_1 = __importDefault(require("inquirer"));
const playerMenu = (player) => {
    return inquirer_1.default
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
                player.profile();
                (0, exports.playerMenu)(player);
                break;
            case 'Inventory':
                (0, utils_1.cls)();
                player.printInventory();
                (0, exports.playerMenu)(player);
                break;
            case 'Stats':
                (0, utils_1.cls)();
                player.printStats();
                (0, exports.playerMenu)(player);
                break;
            case 'Perks':
                (0, utils_1.cls)();
                player.printPerks();
                (0, exports.playerMenu)(player);
                break;
            case 'Back':
                (0, utils_1.cls)();
                (0, playMenu_1.playMenu)(player);
                break;
        }
    });
};
exports.playerMenu = playerMenu;
