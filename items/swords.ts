import { Item, ItemType } from './items';

export class Sword extends Item {
  attackPower: number;
  constructor(
    type: ItemType,
    name: string,
    desc: string,
    value: number,
    attackPower: number
  ) {
    super(type, name, desc, value);
    this.attackPower = attackPower;
  }
}

export const swords = {
  WoodenSword: new Sword(
    ItemType.SWORD,
    'Wooden Sword',
    'Better than nothing',
    40,
    2
  ),
  CooperSword: new Sword(
    ItemType.SWORD,
    'Cooper Sword',
    'Your first real upgrade innit?',
    200,
    6
  ),
  IronSword: new Sword(ItemType.SWORD, 'Iron Sword', 'Mid', 450, 10),
  SteelSword: new Sword(ItemType.SWORD, 'Steel Sword', 'Not that mid', 850, 15),
  JujuBow: new Sword(
    ItemType.SWORD,
    'Juju Bow',
    'This bow is reserved for the brave souls who challenged the enderman and emerged victorious.',
    2450,
    310
  ),
};
