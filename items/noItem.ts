import { Armor } from './armors';
import { Sword } from './swords';

export const noSword: Sword = {
  type: 'noSword',
  name: 'No Sword Equiped',
  attack: 0,
  value: 0,
};

export const noArmor: Armor = {
  type: 'noArmor',
  name: 'No Armor Equiped',
  defense: 0,
  value: 0,
};
