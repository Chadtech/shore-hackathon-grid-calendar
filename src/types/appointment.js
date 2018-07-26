import Utils from '../utils';

const services = [
  { name: 'debug elm', duration: 30 },
  { name: 'templaytch translaych', duration: 15 },
  { name: 'burger or indische', duration: 45 },
  { name: 'uberprufen', duration: 45 },
];

export default {
  random: () => {
    return {
      color: Utils.randomColor(),
      services: [...Array(Utils.randomInt(3)).keys()].map(
        i => services[Utils.randomInt(4)],
      ),
      startsAt: Utils.randomInt(7 * 24 * 60),
    };
  },
  getDuration: ({ services }) =>
    services.map(({ duration }) => duration).reduce((sum, d) => sum + d, 0),
};
