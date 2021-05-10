"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmMenu = void 0;
const inquirer = require('inquirer');
const confirmMenu = async (str) => {
    let confirmation;
    await inquirer
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
