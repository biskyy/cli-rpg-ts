"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./helpers/utils");
const mainMenu_1 = require("./menus/mainMenu");
const player_1 = require("./player/player");
const playerUtils_1 = require("./player/playerUtils");
const input = async (player) => {
    let _input = await mainMenu_1.mainMenu(player);
    return _input;
};
const main = async (player) => {
    utils_1.cls();
    playerUtils_1.setupStats(player);
    await input(player);
};
main(player_1.p1);
