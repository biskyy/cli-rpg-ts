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

export const cls = () => {
  console.clear();
};

export const timeSleep = (milliseconds: number) => {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
};

export const randomFromArr = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const randomsFromArr = (arr, n: number) => {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError('getRandom: more elements taken than available');
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
};
