import { Monster } from '../npcs/monsters';
import {
  Ability,
  CounterAttackAbility,
  HeartPiercerAbility,
  TripleShotAbility,
} from '../player/abilities';
import { CombatOptions, Player, p1 } from '../player/player';
import { Item, ItemType } from './items';

export class Weapon extends Item {
  damage: number;
  abilities: Ability[];
  constructor(
    type: ItemType,
    name: string,
    desc: string,
    value: number,
    damage: number,
    abilities: (weaponContext: any) => Ability[]
  ) {
    super(type, name, desc, value);
    this.damage = damage;
    this.abilities = abilities(this);
    // this.abilities.push(...abilities());
  }
}

export const weapons = {
  WoodenSword: new Weapon(
    ItemType.SWORD,
    'Wooden Weapon',
    'Better than nothing',
    40,
    2,
    () => []
  ),
  CooperSword: new Weapon(
    ItemType.SWORD,
    'Cooper Weapon',
    'Your first real upgrade innit?',
    200,
    6,
    () => []
  ),
  IronSword: new Weapon(
    ItemType.SWORD,
    'Iron Weapon',
    'Mid',
    450,
    10,
    () => []
  ),
  SteelSword: new Weapon(
    ItemType.SWORD,
    'Steel Weapon',
    'Not that mid',
    850,
    15,
    () => []
  ),
  JujuBow: new Weapon(
    ItemType.SWORD,
    'Juju Bow',
    'This bow is reserved for the brave souls who challenged the enderman and emerged victorious.',
    2450,
    310,
    (weaponContext): Ability[] => [
      new TripleShotAbility(CombatOptions.TripleShot, weaponContext),
      new HeartPiercerAbility(CombatOptions.HeartPiercer, weaponContext),
      new CounterAttackAbility(CombatOptions.CounterAttack, weaponContext),
    ]
  ),
};
