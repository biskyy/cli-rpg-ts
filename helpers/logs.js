"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.infoLogEnd = exports.infoShopLog = exports.infoHuntLog = exports.infoLog = void 0;
const infoLog = () => {
    console.log('------------Info------------');
};
exports.infoLog = infoLog;
const infoHuntLog = () => {
    console.log('------------Hunt------------');
};
exports.infoHuntLog = infoHuntLog;
const infoShopLog = () => {
    console.log('------------Shop------------');
};
exports.infoShopLog = infoShopLog;
const infoLogEnd = () => {
    console.log('----------------------------\n');
};
exports.infoLogEnd = infoLogEnd;
