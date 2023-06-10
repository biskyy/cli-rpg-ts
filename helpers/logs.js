"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerConfirmation = exports.printBattleInfo = exports.typewriter = exports.infoLogEnd = exports.infoVSLog = exports.infoShopLog = exports.infoHuntLog = exports.infoLog = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const player_1 = require("../player/player");
const readline_1 = __importDefault(require("readline"));
readline_1.default.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY)
    process.stdin.setRawMode(true);
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
const infoVSLog = () => {
    console.log('-------------VS-------------');
};
exports.infoVSLog = infoVSLog;
const infoLogEnd = () => {
    console.log('----------------------------');
};
exports.infoLogEnd = infoLogEnd;
// export const typewriter = (text: string, delay?: number) => {
//   return new Promise((resolve) => {
//     let index = 0;
//     const type = () => {
//       if (index < text.length) {
//         process.stdout.write(text.charAt(index));
//         index++;
//         setTimeout(type, delay ? delay : 30);
//       } else {
//         process.stdout.write('\n');
//         resolve(0);
//       }
//     };
//     type();
//   });
// };
const typewriter = (text, delay) => {
    let skipped = false; // Track if the typewriter effect was skipped
    const handleKeyPress = (key) => {
        if (key === '\r') {
            skipped = true;
            cleanup();
        }
    };
    const cleanup = () => {
        process.stdin.pause(); // Pause the stdin stream
        process.stdin.removeListener('data', handleKeyPress); // Remove the event listener
        process.stdin.setRawMode(false); // Disable raw mode
        process.stdin.setEncoding('utf8'); // Set encoding back to default
    };
    process.stdin.setRawMode(true); // Enable reading individual keypresses
    process.stdin.setEncoding('utf8');
    process.stdin.resume();
    process.stdin.on('data', handleKeyPress); // Listen for keypress events
    return new Promise((resolve) => {
        let index = 0;
        const type = () => {
            if (skipped) {
                process.stdout.write(text.substring(index) + '\n');
                cleanup();
                resolve(0);
                return;
            }
            if (index < text.length) {
                process.stdout.write(text.charAt(index));
                index++;
                setTimeout(type, delay ? delay : 30);
            }
            else {
                process.stdout.write('\n');
                cleanup();
                resolve(0);
            }
        };
        type();
    });
};
exports.typewriter = typewriter;
// export const typewriter = (text: string, delay?: number) => {
//   let skipped = false; // Track if the typewriter effect was skipped
//   const handleKeyPress = (key) => {
//     if (key === '\r') {
//       skipped = true;
//       process.stdin.removeListener('data', handleKeyPress); // Remove the event listener
//     }
//   };
//   // const cleanup = () => {
//     // process.stdin.pause(); // Pause the stdin stream
//     // process.stdin.removeListener('data', handleKeyPress); // Remove the event listener
//     // process.stdin.setRawMode(false); // Disable raw mode
//     // process.stdin.setEncoding('utf8'); // Set encoding back to default
//   // };
//   process.stdin.setRawMode(true); // Enable reading individual keypresses
//   process.stdin.resume();
//   process.stdin.setEncoding('utf8');
//   process.stdin.on('data', handleKeyPress); // Listen for keypress events
//   return new Promise((resolve) => {
//     let index = 0;
//     const type = () => {
//       if (skipped) {
//         // If the skipTyping flag is true, print the entire text immediately
//         process.stdout.write(text.substring(index) + '\n');
//         // cleanup();
//         return;
//       }
//       if (index < text.length) {
//         process.stdout.write(text.charAt(index));
//         index++;
//         setTimeout(type, delay ? delay : 30);
//       } else {
//         process.stdout.write('\n');
//         // cleanup();
//         resolve(0)
//       }
//     };
//     type();
//   });
// };
const printBattleInfo = (second, first) => {
    let player = second instanceof player_1.Player ? second : first;
    let enemy = first instanceof player_1.Player ? second : first;
    (0, exports.infoLogEnd)();
    console.log(`[Lvl ${enemy.lvl}] ${enemy.name}`);
    console.log(`HP: ${enemy.hp}/${enemy.maxHp}`);
    console.log(`Attack Power: ${enemy.attackPower}`);
    console.log(`Defense Power: ${enemy.defensePower}`);
    if (enemy.effects.length != 0) {
        console.log('Effects:');
        for (const effect of enemy.effects) {
            console.log(`- ${effect.name}: ${effect.roundsRemaining}`);
        }
    }
    (0, exports.infoVSLog)();
    console.log(`[Lvl ${player.lvl}] ${player.name}`);
    console.log(`HP: ${player.hp}/${player.maxHp}`);
    console.log(`Attack Power: ${player.attackPower}`);
    console.log(`Defense Power: ${player.defensePower}`);
    if (player.effects.length != 0) {
        console.log('Effects:');
        for (const effect of player.effects) {
            console.log(`- ${effect.name}: ${effect.roundsRemaining}`);
        }
    }
    (0, exports.infoLogEnd)();
    console.log('');
};
exports.printBattleInfo = printBattleInfo;
const playerConfirmation = async () => await inquirer_1.default.prompt([
    {
        type: 'confirm',
        message: 'Continue',
        name: 'confirmChoice',
        default: true,
    },
]);
exports.playerConfirmation = playerConfirmation;
