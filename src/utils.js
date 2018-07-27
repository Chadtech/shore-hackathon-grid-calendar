const randomInt = m => Math.floor(Math.random() * m);

const padLeftZero = str => {
  if (str.length === 1) {
    return '0' + str;
  }
  return str;
};

const randomColor = () =>
  [
    '#',
    padLeftZero(randomInt(255).toString(16)),
    padLeftZero(randomInt(255).toString(16)),
    padLeftZero(randomInt(255).toString(16)),
  ].join('');

const range = size => [...Array(size).keys()];

// This takes a function as a parameter
// because if it was just a value
// it would have the same reference
//
//   *`~^ Functional Tricks ^~`*
//
const repeat = (elementF, number) => range(number).map(() => elementF());

const log = (str, a) => {
  console.log(str, a);
  return a;
};

const concat = listOfLists => [].concat([], ...listOfLists);

export default {
  randomColor,
  randomInt,
  padLeftZero,
  range,
  repeat,
  log,
  concat,
};
