export const infoLog = () => {
  console.log('------------Info------------');
};

export const infoHuntLog = () => {
  console.log('------------Hunt------------');
};

export const infoShopLog = () => {
  console.log('------------Shop------------');
};

export const infoLogEnd = () => {
  console.log('----------------------------\n');
};
export const typewriter = (text: string, delay?: number) => {
  return new Promise((resolve) => {
    let index = 0;
    let output = '';

    const type = () => {
      if (index < text.length) {
        output += text.charAt(index);
        process.stdout.write(text.charAt(index));
        index++;
        setTimeout(type, delay ? delay : 35);
      } else {
        process.stdout.write('\n');
        resolve(0);
      }
    };

    type();
  });
};
