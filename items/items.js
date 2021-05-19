"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SteelAxe = exports.IronAxe = exports.CooperAxe = exports.Lighter = exports.testItem = void 0;
exports.testItem = {
    type: 'Item',
    name: 'testItem',
    desc: 'test',
    value: 100000000,
};
exports.Lighter = {
    type: 'Item',
    name: 'Lighter',
    desc: 'Simple lighter, produces small amount of light.',
    value: 10,
};
exports.CooperAxe = {
    type: 'Axe',
    name: 'Cooper Axe',
    desc: 'Best axe for begginers.',
    value: 80,
    axePower: 5,
};
exports.IronAxe = {
    type: 'Axe',
    name: 'Iron Axe',
    desc: 'Mid-tier axe.',
    value: 200,
    axePower: 10,
};
exports.SteelAxe = {
    type: 'Axe',
    name: 'Steel Axe',
    desc: 'The perfect axe for experts.',
    value: 400,
    axePower: 20,
};
