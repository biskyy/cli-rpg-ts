import { Item, ItemType } from './items';

export class Armor extends Item {
  defensePower: number;
  constructor(
    type: ItemType,
    name: string,
    desc: string,
    value: number,
    defensePower: number
  ) {
    super(type, name, desc, value);
    this.defensePower = defensePower;
  }
}

export const armors = {
  ClothArmor: new Armor(
    ItemType.ARMOR,
    'Cloth Armor',
    'Some basic armor for surving some of the very early game',
    70,
    1
  ),

  CooperArmor: new Armor(ItemType.ARMOR, 'Cooper Armor', 'The upgrade', 250, 5),

  IronArmor: new Armor(ItemType.ARMOR, 'Iron Armor', 'Mid', 520, 12),

  SteelArmor: new Armor(ItemType.ARMOR, 'Steel Armor', 'Why not', 700, 22),
};
