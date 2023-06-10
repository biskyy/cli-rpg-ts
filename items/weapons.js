"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weapons = exports.Weapon = void 0;
const abilities_1 = require("../player/abilities");
const items_1 = require("./items");
class Weapon extends items_1.Item {
    damage;
    abilities;
    constructor(type, name, desc, value, damage, abilities) {
        super(type, name, desc, value);
        this.damage = damage;
        this.abilities = abilities(this);
        // this.abilities.push(...abilities());
    }
}
exports.Weapon = Weapon;
exports.weapons = {
    WoodenSword: new Weapon(items_1.ItemType.SWORD, 'Wooden Weapon', 'Better than nothing', 40, 2, () => []),
    CooperSword: new Weapon(items_1.ItemType.SWORD, 'Cooper Weapon', 'Your first real upgrade innit?', 200, 6, () => []),
    IronSword: new Weapon(items_1.ItemType.SWORD, 'Iron Weapon', 'Mid', 450, 10, () => []),
    SteelSword: new Weapon(items_1.ItemType.SWORD, 'Steel Weapon', 'Not that mid', 850, 15, () => []),
    JujuBow: new Weapon(items_1.ItemType.SWORD, 'Juju Bow', 'This bow is reserved for the brave souls who challenged the enderman and emerged victorious.', 2450, 310, (weaponContext) => [
        new abilities_1.TripleShotAbility("Triple Shot" /* CombatOptions.TripleShot */, weaponContext),
        new abilities_1.HeartPiercerAbility("Heart Piercer" /* CombatOptions.HeartPiercer */, weaponContext),
        new abilities_1.CounterAttackAbility("Counter Attack" /* CombatOptions.CounterAttack */, weaponContext),
    ]),
};
