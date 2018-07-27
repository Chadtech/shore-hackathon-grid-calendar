import Utils from '../utils';

const services = [
  { name: 'debug elm', duration: 30 },
  { name: 'templaytch translaych', duration: 15 },
  { name: 'burger or indische', duration: 45 },
  { name: 'uberprufen', duration: 45 },
  { name: 'baseball lessons', duration: 90 },
];

const getDuration = ({ services }) =>
  services.map(({ duration }) => duration).reduce((sum, d) => sum + d, 0);

const getEndsAt = appointment =>
  appointment.startsAt + getDuration(appointment);

export default {
  random: () => {
    return {
      color: Utils.randomColor(),
      services: Utils.range(Utils.randomInt(3) + 1).map(
        i => services[Utils.randomInt(services.length)],
      ),
      startsAt: Utils.randomInt(7 * 24 * 60),
      id: [
        Utils.randomInt(9000),
        Utils.randomInt(9000),
        Utils.randomInt(9000),
        Utils.randomInt(9000),
      ]
        .map(String)
        .join('-'),
    };
  },
  getDuration,
  calcOverlaps: appointments => {
    appointments.sort((a, b) => a.startsAt - b.startsAt);

    appointments.map((appointment, i) => {
      const extraOverlap = calcOverlap(appointments, i);
      appointment.overlaps = appointment.overlaps + extraOverlap;
      // appointment.position = appointment.position + extraOverlap;
      return appointment;

      //   const endsAt = getDuration(appointment) + appointment.startsAt;
      //   let j = 1;

      //   const isNeighboringAppointmentOverlapping = () => {
      //     if (typeof appointments[j + i] === 'undefined') {
      //       return false;
      //     }
      //     return appointments[j + i].startsAt < endsAt;
      //   };

      //   while (isNeighboringAppointmentOverlapping()) {
      //     const neighboringAppointment = appointments[j + i];
      //     appointment.overlaps += 1;
      //     neighboringAppointment.overlaps += 1;
      //     neighboringAppointment.position += 1;
      //     j++;
      //   }
    });
    return appointments;
  },
};

const calcOverlap = (appointments, i) => {
  let overlap = 0;
  let j = 1;
  const thisAppointment = appointments[i];
  console.log('This appointment', i, thisAppointment);
  const endsAt = getEndsAt(thisAppointment);

  const neighboringAppointmentOverlapping = () => {
    const neighbor = appointments[j + i];
    if (typeof neighbor === 'undefined') {
      return false;
    }
    console.log('NEIGHBOR', neighbor);
    return neighbor.startsAt < endsAt;
  };

  while (neighboringAppointmentOverlapping()) {
    const neighbor = appointments[j + i];
    // neighbor.overlap += 1;
    // neighbor.position += 1;
    overlap = Math.max(overlap, calcOverlap(appointments.slice(j), 0)) + 1;
    j++;
  }
  console.log('OVERLAP IN F', overlap, i, appointments[i]);
  return overlap;
};

const calcOverlaps = (appointments, i) => {
  const output = [];

  const thisAppointment = appointments[i];
};

// const getBottomNeighborOverlaps = (appointments, endsAt, i) => {
//   let j = 1;
//   let maxOverlap = 0;

//   const isNeighboringAppointmentOverlapping = () => {
//     if (typeof appointments[j + i] === 'undefined') {
//       return false;
//     }
//     return appointments[j + i].startsAt < endsAt;
//   };

//   while (isNeighboringAppointmentOverlapping()) {
//     const neighbor = appointments[i + j];
//     let maxOverlap = Math.max(
//       maxOverlap,
//       getBottomNeighborOverlaps(
//         appointments.slice(i + j),
//         getDuration(neighbor) + neighbor.startsAt,
//         i + j,
//       ),
//     );
//     j++;
//   }
//   return maxOverlap;
// };
