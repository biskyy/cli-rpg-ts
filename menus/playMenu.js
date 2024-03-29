"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.playMenu = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const area_1 = require("../locations/area");
const city_1 = require("../locations/city");
const mainMenu_1 = require("./mainMenu");
const goToMenu_1 = require("./goToMenu");
const shopMenu_1 = require("./shopMenu");
const homeMenu_1 = require("./homeMenu");
const utils_1 = require("../helpers/utils");
const monsters_1 = require("../npcs/monsters");
const bsMenu_1 = require("./bsMenu");
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
    return inquirer_1.default
        .prompt([
        {
            type: 'list',
            message: 'Please select a option!\n',
            name: 'choice',
            choices: _choices,
            pageSize: 12,
        },
    ])
        .then(async (answers) => {
        switch (answers.choice) {
            case 'Help':
                (0, utils_1.cls)();
                await player.locationInfo();
                (0, exports.playMenu)(player);
                break;
            case 'Hunt':
                player.hunt(Object.values(monsters_1.monsters));
                (0, exports.playMenu)(player);
                break;
            case 'Shop':
                (0, utils_1.cls)();
                player.location = city_1.City.SHOP;
                (0, shopMenu_1.shopMenu)(player);
                break;
            case 'Blacksmith':
                (0, utils_1.cls)();
                player.location = city_1.City.BLACKSMITH;
                (0, bsMenu_1.bsMenu)(player);
                break;
            case 'Player Info':
                (0, utils_1.cls)();
                (0, playerMenu_1.playerMenu)(player);
                break;
            case 'Go to..':
                (0, utils_1.cls)();
                (0, goToMenu_1.goToMenu)(player);
                break;
            case 'Home':
                (0, utils_1.cls)();
                player.location = city_1.City.HOME;
                (0, homeMenu_1.homeMenu)(player);
                break;
            case 'Back':
                (0, utils_1.cls)();
                (0, mainMenu_1.mainMenu)(player);
                break;
        }
    });
};
exports.playMenu = playMenu;
