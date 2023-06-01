"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.homeMenu = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const utils_1 = require("../helpers/utils");
const logs_1 = require("../helpers/logs");
const area_1 = require("../locations/area");
const playMenu_1 = require("./playMenu");
const homeMenu = (player) => {
    return inquirer_1.default
        .prompt([
        {
            type: 'list',
            message: 'Please select an option!\n',
            name: 'choice',
            choices: ['Eat', 'Sleep', 'Help', 'Exit'],
        },
    ])
        .then(async (answers) => {
        switch (answers.choice) {
            case 'Eat':
                (0, utils_1.cls)();
                player.eat(20);
                (0, exports.homeMenu)(player);
                break;
            case 'Sleep':
                (0, utils_1.cls)();
                player.sleep();
                (0, exports.homeMenu)(player);
                break;
            case 'Help':
                (0, utils_1.cls)();
                await player.locationInfo();
                (0, exports.homeMenu)(player);
                break;
            case 'Exit':
                (0, utils_1.cls)();
                (0, logs_1.infoLog)();
                console.log('You leave your house.');
                (0, logs_1.infoLogEnd)();
                player.location = area_1.Area.CITY;
                (0, playMenu_1.playMenu)(player);
                break;
        }
    });
};
exports.homeMenu = homeMenu;
