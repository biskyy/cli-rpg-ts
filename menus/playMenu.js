"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playMenu = void 0;
const inquirer = require('inquirer');
const player_1 = require("../player/player");
const area_1 = require("../locations/area");
const city_1 = require("../locations/city");
const mainMenu_1 = require("./mainMenu");
const goToMenu_1 = require("./goToMenu");
const shopMenu_1 = require("./shopMenu");
const homeMenu_1 = require("./homeMenu");
const utils_1 = require("../helpers/utils");
const monsters_1 = require("../monsters");
const bsMenu_1 = require("./bsMenu");
const playerUtils_1 = require("../player/playerUtils");
const playerMenu_1 = require("./playerMenu");
const playMenu = (player) => {
    let _choices;
    switch (player.location) {
        case area_1.Area.CITY:
            _choices = [
                'Home',
                'Shop',
                'Blacksmith',
                'Player Info',
                'Go to..',
                'Help',
                'Back',
            ];
            break;
        case area_1.Area.FOREST:
            _choices = ['Hunt', 'Player Info', 'Go to..', 'Help', 'Back'];
            break;
        default:
            break;
    }
    return inquirer
        .prompt([
        {
            type: 'list',
            message: 'Please select a option!\n',
            name: 'choice',
            choices: _choices,
            pageSize: 12,
        },
    ])
        .then((answers) => {
        switch (answers.choice) {
            case 'Help':
                utils_1.cls();
                playerUtils_1.locationInfo(player);
                exports.playMenu(player);
                break;
            case 'Hunt':
                player_1.hunt(player, monsters_1.monsters);
                exports.playMenu(player);
                break;
            case 'Shop':
                utils_1.cls();
                player.location = city_1.City.SHOP;
                shopMenu_1.shopMenu(player);
                break;
            case 'Blacksmith':
                utils_1.cls();
                player.location = city_1.City.BLACKSMITH;
                bsMenu_1.bsMenu(player);
                break;
            case 'Player Info':
                utils_1.cls();
                playerMenu_1.playerMenu(player);
                break;
            case 'Go to..':
                utils_1.cls();
                goToMenu_1.goToMenu(player);
                break;
            case 'Home':
                utils_1.cls();
                player.location = city_1.City.HOME;
                homeMenu_1.homeMenu(player);
                break;
            case 'Back':
                utils_1.cls();
                mainMenu_1.mainMenu(player);
                break;
        }
    });
};
exports.playMenu = playMenu;
