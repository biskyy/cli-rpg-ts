export interface Item {
  type: string;
  name: string;
  desc: string;
  value: number;
  [x: string]: any;
}

export const testItem: Item = {
  type: 'Item',
  name: 'testItem',
  desc: 'test',
  value: 100000000,
};

export const Lighter: Item = {
  type: 'Item',
  name: 'Lighter',
  desc: 'Simple lighter, produces small amount of light.',
  value: 10,
};

export const CooperAxe: Item = {
  type: 'Axe',
  name: 'Cooper Axe',
  desc: 'Best axe for begginers.',
  value: 80,
  axePower: 5,
};

export const IronAxe: Item = {
  type: 'Axe',
  name: 'Iron Axe',
  desc: 'Mid-tier axe.',
  value: 200,
  axePower: 10,
};

export const SteelAxe: Item = {
  type: 'Axe',
  name: 'Steel Axe',
  desc: 'The perfect axe for experts.',
  value: 400,
  axePower: 20,
};
