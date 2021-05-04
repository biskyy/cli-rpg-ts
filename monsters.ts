export interface Monster {
  name: string;
  hp: number;
  attack: number;
  defense: number;
  exp: number;
  coins: number;
}

const bee: Monster = {
  name: 'Bee',
  hp: 10,
  attack: 3,
  defense: 1,
  exp: Math.floor(Math.random() * 10) + 1,
  coins: Math.floor(Math.random() * 5) + 1,
};

const wolf: Monster = {
  name: 'Wolf',
  hp: 20,
  attack: 4,
  defense: 5,
  exp: Math.floor(Math.random() * 20) + 10,
  coins: Math.floor(Math.random() * 15) + 5,
};

const deer: Monster = {
  name: 'Deer',
  hp: 20,
  attack: 0,
  defense: 15,
  exp: Math.floor(Math.random() * 30) + 10,
  coins: Math.floor(Math.random() * 25) + 10,
};

export const monsters = [bee, wolf, deer];
