"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwErr = exports.randomEquipmentFromArr = exports.randomItemsFromArr = exports.randomFromArr = exports.timeSleep = exports.cls = void 0;
const logs_1 = require("./logs");
const cls = () => {
    console.clear();
};
exports.cls = cls;
const timeSleep = (milliseconds) => {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
};
exports.timeSleep = timeSleep;
const randomFromArr = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
};
exports.randomFromArr = randomFromArr;
const randomItemsFromArr = (arr, n) => {
    var result = new Array(n), len = arr.length, taken = new Array(len);
    if (n > len)
        throw new RangeError('getRandom: more elements taken than available');
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
};
exports.randomItemsFromArr = randomItemsFromArr;
const randomEquipmentFromArr = (arr, n) => {
    var result = new Array(n), len = arr.length, taken = new Array(len);
    if (n > len)
        throw new RangeError('getRandom: more elements taken than available');
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
};
exports.randomEquipmentFromArr = randomEquipmentFromArr;
const throwErr = (details) => {
    (0, logs_1.infoLog)();
    console.log('Uh Oh. Something went wrong!');
    console.log(`Details: ${details}`);
    (0, logs_1.infoLogEnd)();
};
exports.throwErr = throwErr;
