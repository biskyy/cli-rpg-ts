import { Sword } from '../items/swords';
import { Armor } from '../items/armors';
import { Item } from '../items/items';
import { Inventory } from '../player';
import { infoLog, infoLogEnd } from './logs';

export const cls = () => {
  console.clear();
};

export const timeSleep = (milliseconds: number) => {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
};

export const randomFromArr = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const randomItemsFromArr = (arr: Inventory[], n: number) => {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError('getRandom: more elements taken than available');
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
};

export const randomEquipmentFromArr = (arr: (Armor | Sword)[], n: number) => {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError('getRandom: more elements taken than available');
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
};

export const throwErr = (details: string) => {
  infoLog();
  console.log('Uh Oh. Something went wrong!');
  console.log(`Details: ${details}`);
  infoLogEnd();
};
