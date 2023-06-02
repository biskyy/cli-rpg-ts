"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swords = exports.Sword = void 0;
const items_1 = require("./items");
class Sword extends items_1.Item {
    attackPower;
    constructor(type, name, desc, value, attackPower) {
        super(type, name, desc, value);
        this.attackPower = attackPower;
    }
}
exports.Sword = Sword;
exports.swords = {
    WoodenSword: new Sword(items_1.ItemType.SWORD, 'Wooden Sword', 'Better than nothing', 40, 2),
    CooperSword: new Sword(items_1.ItemType.SWORD, 'Cooper Sword', 'Your first real upgrade innit?', 200, 6),
    IronSword: new Sword(items_1.ItemType.SWORD, 'Iron Sword', 'Mid', 450, 10),
    SteelSword: new Sword(items_1.ItemType.SWORD, 'Steel Sword', 'Not that mid', 850, 15),
    JujuBow: new Sword(items_1.ItemType.SWORD, 'Juju Bow', 'This bow is reserved for the brave souls who challenged the enderman and emerged victorious.', 2450, 310),
};
