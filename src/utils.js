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

export default {
  randomColor,
  randomInt,
};
