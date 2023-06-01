import { infoLog, infoLogEnd } from '../helpers/logs';

export enum ItemType {
  ITEM = 'Item',
  AXE = 'Axe',
  SWORD = 'Sword',
  ARMOR = 'Armor',
  NOSWORD = 'no sword',
  NOARMOR = 'no armor',
}

export class Item {
  type: ItemType;
  name: string;
  desc: string;
  value: number;

  constructor(type: ItemType, name: string, desc: string, value: number) {
    this.type = type;
    this.name = name;
    this.desc = desc;
    this.value = value;
  }
  printInfo() {
    infoLog();
    console.log(`${this.type} Item`);
    console.log(`Name: ${this.name}`);
    console.log(`Desc: ${this.desc}`);
    console.log(`Value: ${this.value}`);
    infoLogEnd();
  }
}

export class Axe extends Item {
  axePower: number;
  constructor(
    type: ItemType,
    name: string,
    desc: string,
    value: number,
    axePower: number
  ) {
    super(type, name, desc, value);
    this.axePower = axePower;
  }
  printInfo() {
    infoLog();
    console.log(`${this.type} Item`);
    console.log(`Name: ${this.name}`);
    console.log(`Desc: ${this.desc}`);
    console.log(`Value: ${this.value}`);
    console.log(`Axe Power: ${this.axePower}`);
    infoLogEnd();
  }
}

export const items = {
  testItem: new Item(ItemType.ITEM, 'testItem', 'test', 100000000),

  Lighter: new Item(
    ItemType.ITEM,
    'Lighter',
    'Simple lighter, produces small amount of light.',
    10
  ),

  CooperAxe: new Axe(
    ItemType.AXE,
    'Cooper Axe',
    'Best axe for begginers.',
    80,
    5
  ),

  IronAxe: new Axe(ItemType.AXE, 'Iron Axe', 'Mid-tier axe.', 200, 10),

  SteelAxe: new Axe(
    ItemType.AXE,
    'Steel Axe',
    'The perfect axe for experts.',
    400,
    20
  ),
};
