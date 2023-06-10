"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.items = exports.Axe = exports.Item = exports.ItemType = void 0;
const logs_1 = require("../helpers/logs");
var ItemType;
(function (ItemType) {
    ItemType["ITEM"] = "Item";
    ItemType["AXE"] = "Axe";
    ItemType["SWORD"] = "Weapon";
    ItemType["ARMOR"] = "Armor";
    ItemType["NOSWORD"] = "no sword";
    ItemType["NOARMOR"] = "no armor";
})(ItemType = exports.ItemType || (exports.ItemType = {}));
class Item {
    type;
    name;
    desc;
    value;
    constructor(type, name, desc, value) {
        this.type = type;
        this.name = name;
        this.desc = desc;
        this.value = value;
    }
    printInfo() {
        (0, logs_1.infoLog)();
        console.log(`${this.type} Item`);
        console.log(`Name: ${this.name}`);
        console.log(`Desc: ${this.desc}`);
        console.log(`Value: ${this.value}`);
        (0, logs_1.infoLogEnd)();
    }
}
exports.Item = Item;
class Axe extends Item {
    axePower;
    constructor(type, name, desc, value, axePower) {
        super(type, name, desc, value);
        this.axePower = axePower;
    }
    printInfo() {
        (0, logs_1.infoLog)();
        console.log(`${this.type} Item`);
        console.log(`Name: ${this.name}`);
        console.log(`Desc: ${this.desc}`);
        console.log(`Value: ${this.value}`);
        console.log(`Axe Power: ${this.axePower}`);
        (0, logs_1.infoLogEnd)();
    }
}
exports.Axe = Axe;
exports.items = {
    testItem: new Item(ItemType.ITEM, 'testItem', 'test', 100000000),
    Lighter: new Item(ItemType.ITEM, 'Lighter', 'Simple lighter, produces small amount of light.', 10),
    CooperAxe: new Axe(ItemType.AXE, 'Cooper Axe', 'Best axe for begginers.', 80, 5),
    IronAxe: new Axe(ItemType.AXE, 'Iron Axe', 'Mid-tier axe.', 200, 10),
    SteelAxe: new Axe(ItemType.AXE, 'Steel Axe', 'The perfect axe for experts.', 400, 20),
};
