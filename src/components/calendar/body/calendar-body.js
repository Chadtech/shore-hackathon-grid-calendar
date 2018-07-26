import React, { Component } from 'react';

import styled from 'styled-components';
import GridSystem from '../../grid/grid';
import styles from '../../../styles/styles';
import Appointment from '../../../types/appointment';
import Utils from '../../../utils';

const timeInterval = 15;
// in minutes --^
const daysInWeek = 7;
const numberOfRows = 24 * (60 / timeInterval);

const { Grid, Cell } = GridSystem.make({
  columns: ['60px', GridSystem.repeat(daysInWeek, 'auto')],
  rows: [GridSystem.repeat(numberOfRows, '40px')],
});

const Container = styled.div`
  height: calc(100vh - 45px);
  width: 100%;
  overflow: auto;
  background-color: ${styles.white};
  position: relative;
  border: 2px solid ${styles.gray['300']};
`;

const BackgroundContainer = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: 1;
`;

const AppointmentContainer = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: 1;
`;

const BackgroundGrid = Grid.extend``;

const AppointmentGrid = Grid.extend``;

const BackgroundCell = Cell.extend`
  border: 1px solid ${styles.gray['300']};
`;

const AppointmentCell = Cell.extend`
  background-color: ${props => props.c};
  overflow: hidden;
`;

const TimeCell = Cell.extend``;

const AppointmentText = styled.p``;

const appointmentView = appointment => (
  <AppointmentCell
    column={Math.floor(appointment.startsAt / (24 * 60) + 1)}
    row={Math.floor((appointment.startsAt % (24 * 60)) / timeInterval)}
    w={1}
    h={Math.floor(Appointment.getDuration(appointment) / timeInterval)}
    c={appointment.color}
  />
);
// {
//   /* <AppointmentText> */
// }
// // {appointment.services[0] && appointment.services[0].name}
// {
//   /* </AppointmentText> */
// }
class CalendarBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [...Array(20)].map(() => Appointment.random()),
    };
  }

  render() {
    return (
      <Container>
        <BackgroundContainer>
          <BackgroundGrid>
            {[...Array(daysInWeek).keys()].map(i =>
              [...Array(numberOfRows).keys()].map(j => (
                <BackgroundCell
                  key={[String(i), ',', String(j)].join('')}
                  column={i + 1}
                  row={j}
                  w={1}
                  h={1}
                />
              )),
            )}
          </BackgroundGrid>
        </BackgroundContainer>
        <AppointmentContainer>
          <AppointmentGrid>
            {this.state.appointments.map(appointmentView)}
            {[...Array(numberOfRows).keys()].map(i => (
              <TimeCell column={0} row={i} w={1} h={1}>
                {[
                  Utils.padLeftZero(
                    String(Math.floor((i * timeInterval) / 60)),
                  ),
                  ':',
                  Utils.padLeftZero(String((i * timeInterval) % 60)),
                ].join('')}
              </TimeCell>
            ))}
          </AppointmentGrid>
        </AppointmentContainer>
      </Container>
    );
  }
}

export default CalendarBody;
