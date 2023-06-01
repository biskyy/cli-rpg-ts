"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmMenu = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const confirmMenu = async (str) => {
    let confirmation;
    await inquirer_1.default
        .prompt([
        {
            type: 'list',
            name: 'choice',
            message: `Are you sure you want to ${str}?`,
            choices: ['Yes', 'No'],
        },
    ])
        .then((answers) => {
        switch (answers.choice) {
            case 'Yes':
                confirmation = true;
                break;
            case 'No':
                confirmation = false;
                break;
        }
    });
    return confirmation;
};
exports.confirmMenu = confirmMenu;
