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
