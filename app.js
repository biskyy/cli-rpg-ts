"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./helpers/utils");
const monsters_1 = require("./npcs/monsters");
const player_1 = require("./player/player");
const main = async (player) => {
    (0, utils_1.cls)();
    player.duel(monsters_1.monsters.wolf);
};
main(player_1.p1);
