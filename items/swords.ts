export interface Sword {
  type: string;
  name: string;
  attack: number;
  value: number;
}

export const WoodenSword: Sword = {
  type: 'Sword',
  name: 'Wooden Sword',
  attack: 3,
  value: 40,
};

export const CooperSword: Sword = {
  type: 'Sword',
  name: 'Cooper Sword',
  attack: 6,
  value: 200,
};

export const IronSword: Sword = {
  type: 'Sword',
  name: 'Iron Sword',
  attack: 10,
  value: 450,
};

export const SteelSword: Sword = {
  type: 'Sword',
  name: 'Steel Sword',
  attack: 15,
  value: 650,
};
