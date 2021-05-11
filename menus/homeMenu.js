"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.homeMenu = void 0;
const inquirer = require('inquirer');
const player_1 = require("../player/player");
const utils_1 = require("../helpers/utils");
const logs_1 = require("../helpers/logs");
const area_1 = require("../locations/area");
const playMenu_1 = require("./playMenu");
const playerUtils_1 = require("../player/playerUtils");
const homeMenu = (player) => {
    return inquirer
        .prompt([
        {
            type: 'list',
            message: 'Please select an option!\n',
            name: 'choice',
            choices: ['Eat', 'Sleep', 'Help', 'Exit'],
        },
    ])
        .then((answers) => {
        switch (answers.choice) {
            case 'Eat':
                utils_1.cls();
                player_1.eat(player);
                exports.homeMenu(player);
                break;
            case 'Sleep':
                utils_1.cls();
                player_1.sleep(player);
                exports.homeMenu(player);
                break;
            case 'Help':
                utils_1.cls();
                playerUtils_1.locationInfo(player);
                exports.homeMenu(player);
                break;
            case 'Exit':
                utils_1.cls();
                logs_1.infoLog();
                console.log('You leave your house.');
                logs_1.infoLogEnd();
                player.location = area_1.Area.CITY;
                playMenu_1.playMenu(player);
                break;
        }
    });
};
exports.homeMenu = homeMenu;
