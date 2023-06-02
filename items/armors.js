"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.armors = exports.Armor = void 0;
const items_1 = require("./items");
class Armor extends items_1.Item {
    defensePower;
    constructor(type, name, desc, value, defensePower) {
        super(type, name, desc, value);
        this.defensePower = defensePower;
    }
}
exports.Armor = Armor;
exports.armors = {
    ClothArmor: new Armor(items_1.ItemType.ARMOR, 'Cloth Armor', 'Some basic armor for surving some of the very early game', 70, 1),
    CooperArmor: new Armor(items_1.ItemType.ARMOR, 'Cooper Armor', 'The upgrade', 250, 5),
    IronArmor: new Armor(items_1.ItemType.ARMOR, 'Iron Armor', 'Mid', 520, 12),
    SteelArmor: new Armor(items_1.ItemType.ARMOR, 'Steel Armor', 'Why not', 700, 22),
};
