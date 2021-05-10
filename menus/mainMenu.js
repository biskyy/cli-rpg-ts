"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainMenu = void 0;
const inquirer = require('inquirer');
const player_1 = require("../player");
const utils_1 = require("../helpers/utils");
const playMenu_1 = require("./playMenu");
const mainMenu = (player) => {
    return inquirer
        .prompt([
        {
            type: 'list',
            message: 'Welcome to Typescript RPG!\nPlease select a option.\n\n',
            name: 'choice',
            choices: ['Play', 'Profile', 'Exit'],
        },
    ])
        .then((answers) => {
        switch (answers.choice) {
            case 'Play':
                utils_1.cls();
                playMenu_1.playMenu(player);
                break;
            case 'Profile':
                utils_1.cls();
                player_1.profile(player);
                exports.mainMenu(player);
                break;
            case 'Exit':
                utils_1.cls();
                process.exit(1);
                break;
            default:
                break;
        }
    });
};
exports.mainMenu = mainMenu;
