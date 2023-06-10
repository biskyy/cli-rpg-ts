import inquirer from 'inquirer';
import { Monster } from '../npcs/monsters';
import { Character } from '../player/character';
import { Player } from '../player/player';
import { cls } from './utils';

import readline from 'readline';

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) process.stdin.setRawMode(true);

export const infoLog = () => {
  console.log('------------Info------------');
};

export const infoHuntLog = () => {
  console.log('------------Hunt------------');
};

export const infoShopLog = () => {
  console.log('------------Shop------------');
};

export const infoVSLog = () => {
  console.log('-------------VS-------------');
};

export const infoLogEnd = () => {
  console.log('----------------------------');
};

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

export const typewriter = (text: string, delay?: number) => {
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
      } else {
        process.stdout.write('\n');
        cleanup();
        resolve(0);
      }
    };

    type();
    
  });
};

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

export const printBattleInfo = (second: Character, first: Character) => {
  let player = second instanceof Player ? second : first;
  let enemy = first instanceof Player ? second : first;
  infoLogEnd();
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
  infoVSLog();
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
  infoLogEnd();
  console.log('');
};

export const playerConfirmation = async () =>
  await inquirer.prompt([
    {
      type: 'confirm',
      message: 'Continue',
      name: 'confirmChoice',
      default: true,
    },
  ]);
