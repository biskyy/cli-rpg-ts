import { Armor } from '../items/armors';
import { Weapon } from '../items/weapons';
import { Ability } from './abilities';
import { Effect } from './effects';
import { CombatOptions } from './player';

export interface IEquipment {
  weapon: Weapon | null;
  armor: Armor | null;
}

export abstract class Character {
  name: string;
  abilities: Ability[];
  equipment: IEquipment;
  maxHp: number;
  hp: number;
  lvl: number;
  attackPower: number;
  defensePower: number;
  effects: Effect[] = [];
  constructor(
    name: string,
    equipment: IEquipment,
    abilities: Ability[],
    maxHp: number,
    lvl: number,
    attackPower: number,
    defensePower: number
  ) {
    this.name = name;
    this.equipment = equipment;
    this.abilities = abilities;
    this.maxHp = maxHp;
    this.hp = maxHp;
    this.lvl = lvl;
    this.attackPower = attackPower;
    this.defensePower = defensePower;
  }
}
