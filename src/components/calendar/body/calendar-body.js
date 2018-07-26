import React, { Component } from 'react';

import styled from 'styled-components';
import GridSystem from '../../grid/grid';
import styles from '../../../styles/styles';
import Appointment from '../../../types/appointment';

const timeInterval = 60;
// in minutes --^
const daysInWeek = 7;
const numberOfRows = 24 * (60 / timeInterval);

const { Grid, Cell } = GridSystem.make({
  columns: [GridSystem.repeat(daysInWeek, 'auto')],
  rows: [GridSystem.repeat(numberOfRows, '40px')],
});

const Container = styled.div`
  height: calc(100vh - 70px);
  width: 100%;
  overflow: auto;
  background-color: ${styles.white};
  position: relative;
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
`;

const AppointmentText = styled.p``;

const appointmentView = appointment => (
  <AppointmentCell
    column={Math.floor(appointment.startsAt / (24 * timeInterval))}
    row={Math.floor((appointment.startsAt % (24 * 60)) / timeInterval)}
    w={1}
    h={Math.floor(Appointment.getDuration(appointment) / timeInterval)}
    c={appointment.color}
  >
    <AppointmentText />
  </AppointmentCell>
);

//       {appointment.services[0] && appointment.services[0].name}

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
                  column={i}
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
          </AppointmentGrid>
        </AppointmentContainer>
      </Container>
    );
  }
}

export default CalendarBody;
