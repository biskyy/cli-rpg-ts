"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainMenu = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const utils_1 = require("../helpers/utils");
const playMenu_1 = require("./playMenu");
const mainMenu = async (player) => {
    return inquirer_1.default
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
                (0, utils_1.cls)();
                (0, playMenu_1.playMenu)(player);
                break;
            case 'Profile':
                (0, utils_1.cls)();
                player.printProfile();
                (0, exports.mainMenu)(player);
                break;
            case 'Exit':
                (0, utils_1.cls)();
                process.exit(0);
                break;
            default:
                break;
        }
    });
};
exports.mainMenu = mainMenu;
