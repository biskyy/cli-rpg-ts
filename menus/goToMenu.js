"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.goToMenu = void 0;
var inquirer = require('inquirer');
var area_1 = require("../locations/area");
var utils_1 = require("../helpers/utils");
var logs_1 = require("../helpers/logs");
var playMenu_1 = require("./playMenu");
var goToMenu = function (player) {
    var _choices = Object.values(area_1.Area);
    var index = _choices.indexOf(player.location);
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
        .then(function (answers) {
        switch (answers.choice) {
            case area_1.Area.CITY:
                player.location = area_1.Area.CITY;
                utils_1.cls();
                logs_1.infoLog();
                console.log('You are now in your city!');
                logs_1.infoLogEnd();
                playMenu_1.playMenu(player);
                break;
            case area_1.Area.FOREST:
                player.location = area_1.Area.FOREST;
                utils_1.cls();
                logs_1.infoLog();
                console.log('You are now in the forest near your city.');
                logs_1.infoLogEnd();
                playMenu_1.playMenu(player);
                break;
        }
    });
};
exports.goToMenu = goToMenu;
