"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomsFromArr = exports.randomFromArr = exports.timeSleep = exports.cls = void 0;
var cls = function () {
    console.clear();
};
exports.cls = cls;
var timeSleep = function (milliseconds) {
    var date = Date.now();
    var currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
};
exports.timeSleep = timeSleep;
var randomFromArr = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
};
exports.randomFromArr = randomFromArr;
var randomsFromArr = function (arr, n) {
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
exports.randomsFromArr = randomsFromArr;
