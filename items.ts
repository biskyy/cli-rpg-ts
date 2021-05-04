export interface Item {
  name: string;
  desc: string;
  value: number;
  [x: string]: any;
}

export interface Armor {
  name: string;
  defense: number;
  value: number;
}

export interface Sword {
  name: string;
  attack: number;
  value: number;
}

export const testItem: Item = {
  name: "testItem",
  desc: "test",
  value: 100000000,
};

export const WoodenSword: Sword = {
  name: "Wooden Sword",
  attack: 3,
  value: 40,
};

export const CooperSword: Sword = {
  name: "Cooper Sword",
  attack: 6,
  value: 200,
};

export const IronSword: Sword = {
  name: "Iron Sword",
  attack: 10,
  value: 450,
};

export const SteelSword: Sword = {
  name: "Steel Sword",
  attack: 15,
  value: 650,
};

export const ClothArmor: Armor = {
  name: "Cloth Armor",
  defense: 1,
  value: 70,
};

export const CooperArmor: Armor = {
  name: "Cooper Armor",
  defense: 5,
  value: 250,
};

export const IronArmor: Armor = {
  name: "Iron Armor",
  defense: 12,
  value: 520,
};

export const SteelArmor: Armor = {
  name: "Steel Armor",
  defense: 16,
  value: 700,
};

export const Lighter: Item = {
  name: "Lighter",
  desc: "Simple lighter, produces small amount of light.",
  value: 10,
}
