"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playMenu = void 0;
var inquirer = require('inquirer');
var player_1 = require("../player");
var area_1 = require("../locations/area");
var city_1 = require("../locations/city");
var mainMenu_1 = require("./mainMenu");
var goToMenu_1 = require("./goToMenu");
var shopMenu_1 = require("./shopMenu");
var homeMenu_1 = require("./homeMenu");
var utils_1 = require("../helpers/utils");
var monsters_1 = require("../monsters");
var playMenu = function (player) {
    var _choices;
    switch (player.location) {
        case area_1.Area.CITY:
            _choices = [
                'Home',
                'Shop',
                'Blacksmith',
                'Profile',
                'Inventory',
                'Go to..',
                'Help',
                'Back',
            ];
            break;
        case area_1.Area.FOREST:
            _choices = ['Hunt', 'Profile', 'Inventory', 'Go to..', 'Help', 'Back'];
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
        .then(function (answers) {
        switch (answers.choice) {
            case 'Help':
                utils_1.cls();
                player_1.locationInfo(player);
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
                console.log('not implemented');
                exports.playMenu(player);
                break;
            case 'Profile':
                utils_1.cls();
                player_1.profile(player);
                exports.playMenu(player);
                break;
            case 'Inventory':
                utils_1.cls();
                player_1.showInventory(player);
                exports.playMenu(player);
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
