"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.goToMenu = void 0;
const inquirer = require('inquirer');
const area_1 = require("../locations/area");
const utils_1 = require("../helpers/utils");
const logs_1 = require("../helpers/logs");
const playMenu_1 = require("./playMenu");
const goToMenu = (player) => {
    let _choices = Object.values(area_1.Area);
    let index = _choices.indexOf(player.location);
    _choices.splice(index, 1);
    return inquirer
        .prompt([
        {
            type: 'list',
            message: 'Please select the area to which you wanna travel!\n',
            name: 'choice',
            choices: _choices,
        },
    ])
        .then((answers) => {
        switch (answers.choice) {
            case area_1.Area.CITY:
                player.location = area_1.Area.CITY;
                (0, utils_1.cls)();
                (0, logs_1.infoLog)();
                console.log('You are now in your city!');
                (0, logs_1.infoLogEnd)();
                (0, playMenu_1.playMenu)(player);
                break;
            case area_1.Area.FOREST:
                player.location = area_1.Area.FOREST;
                (0, utils_1.cls)();
                (0, logs_1.infoLog)();
                console.log('You are now in the forest near your city.');
                (0, logs_1.infoLogEnd)();
                (0, playMenu_1.playMenu)(player);
                break;
        }
    });
};
exports.goToMenu = goToMenu;
