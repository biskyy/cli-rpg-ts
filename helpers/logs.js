"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typewriter = exports.infoLogEnd = exports.infoShopLog = exports.infoHuntLog = exports.infoLog = void 0;
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
    console.log('----------------------------');
};
exports.infoLogEnd = infoLogEnd;
const typewriter = (text, delay) => {
    return new Promise((resolve) => {
        let index = 0;
        const type = () => {
            if (index < text.length) {
                process.stdout.write(text.charAt(index));
                index++;
                setTimeout(type, delay ? delay : 30);
            }
            else {
                process.stdout.write('\n');
                resolve(0);
            }
        };
        type();
    });
};
exports.typewriter = typewriter;
