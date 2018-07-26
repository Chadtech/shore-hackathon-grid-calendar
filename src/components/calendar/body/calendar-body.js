import React, { Component } from 'react';

import styled from 'styled-components';
import GridSystem from '../../grid/grid';
import styles from '../../../styles/styles';
import Appointment from '../../../types/appointment';
import Utils from '../../../utils';

const timeInterval = 15;
// in minutes -^
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

const TimeCell = Cell.extend``;

// BACKGROUND //

const BackgroundContainer = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: 1;
`;

const BackgroundGrid = Grid.extend``;

const BackgroundCell = Cell.extend`
  border: 1px solid ${styles.gray['300']};
`;

// APPOINTMENTS //

const AppointmentGrid = Grid.extend``;

const AppointmentGridContainer = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: 1;
`;

const AppointmentCell = Cell.extend`
  overflow: hidden;
  position: relative;
`;

const AppointmentText = styled.p``;

const AppointmentContainer = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  background-color: ${props => props.c};
  width: calc(${props => String(Math.floor(100 / props.overlaps))}% - 10px);
  height: 100%;
`;

const AppointmentBody = styled.div`
  padding: 5px;
`;

const appointmentServiceString = appointment => {
  if (appointment.services.length === 0) {
    return '';
  }
  if (appointment.services.length === 1) {
    return appointment.services[0].name;
  }
  return [String(appointment.services.length), 'services'].join(' ');
};

const appointmentView = appointment => (
  <AppointmentCell
    column={Math.floor(appointment.startsAt / (24 * 60) + 1)}
    row={Math.floor((appointment.startsAt % (24 * 60)) / timeInterval)}
    w={1}
    h={Math.floor(Appointment.getDuration(appointment) / timeInterval)}
  >
    <AppointmentContainer
      c={appointment.color}
      overlaps={appointment.overlaps}
      position={appointment.position}
    >
      <AppointmentBody>
        <AppointmentText>
          {appointmentServiceString(appointment)}
        </AppointmentText>
      </AppointmentBody>
    </AppointmentContainer>
  </AppointmentCell>
);

// CALENDAR //

class CalendarBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: Appointment.calcOverlaps(
        [...Array(90)].map(() => Appointment.random()),
      ),
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
        <AppointmentGridContainer>
          <AppointmentGrid>
            {this.state.appointments.map(appointmentView)}
            {[...Array(numberOfRows).keys()].map(i => {
              const time = i * timeInterval;
              return (
                <TimeCell column={0} row={i} w={1} h={1}>
                  {[
                    Utils.padLeftZero(String(Math.floor(time / 60))),
                    ':',
                    Utils.padLeftZero(String(time % 60)),
                  ].join('')}
                </TimeCell>
              );
            })}
          </AppointmentGrid>
        </AppointmentGridContainer>
      </Container>
    );
  }
}

export default CalendarBody;
