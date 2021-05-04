export interface Armor {
  name: string;
  defense: number;
  value: number;
}

export const ClothArmor: Armor = {
  name: 'Cloth Armor',
  defense: 1,
  value: 70,
};

export const CooperArmor: Armor = {
  name: 'Cooper Armor',
  defense: 5,
  value: 250,
};

export const IronArmor: Armor = {
  name: 'Iron Armor',
  defense: 12,
  value: 520,
};

export const SteelArmor: Armor = {
  name: 'Steel Armor',
  defense: 16,
  value: 700,
};
