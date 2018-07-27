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

const Button = styled.button`
  position: absolute;
  z-index: 10000;
  left: 0px;
  top: 20px;
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
  /* overflow: hidden; */
  position: relative;
`;

const AppointmentText = styled.p``;

const calculateLeft = (position, neighbors) => {
  return (position / (neighbors + 1)) * 100;
};

const AppointmentContainer = styled.div`
  position: absolute;
  left: ${props => calculateLeft(props.position, props.neighbors)}%
  top: 0px;
  background-color: ${props => props.c};
  box-sizing: border-box;
  border: 1px solid #000000;
  border-radius: 2px;
  overflow: hidden;
  width: calc(
    ${props => String(Math.floor(100 / (props.neighbors + 1)))}% - 10px
  );
  transform: scale(1);
  transition: transform 75ms ease-in, border 75ms ease-in;
  height: 100%;
  :first-child {
    margin-left: ${props => 10 * props.inset}px;
  }
  ${props => (props.isforefront === 'true' ? 'z-index: 9000000;' : '')}
  cursor: pointer;
  :hover {
    border: 1px solid #404040;
    transform: scale(1.2);
  }
`;

const AppointmentBody = styled.div`
  padding: 5px;
  overflow: hidden;
  z-index: ${props =>
    props.isforefront === 'true' ? '90000000' : props.interval};
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

const getAppointmentDay = appointment =>
  Math.floor(appointment.startsAt / (24 * 60) + 1);

const getAppointmentInterval = appointment =>
  Math.floor((appointment.startsAt % (24 * 60)) / timeInterval);

const giveDayAndInterval = appointment => ({
  day: getAppointmentDay(appointment),
  interval: getAppointmentInterval(appointment),
  ...appointment,
});

const intoDays = (days, appointment) => {
  days[appointment.day].push(appointment);
  return days;
};

const intoIntervalBuckets = (intervals, appointment) => {
  intervals[appointment.interval].push(appointment);
  return intervals;
};

const giveDaysIntervalBuckets = day => {
  return day.reduce(
    intoIntervalBuckets,
    Utils.range(numberOfRows).map(() => []),
  );
};

const calculateAppointmentWidths = interval =>
  interval.map((appointment, i) => ({
    ...appointment,
    neighbors: interval.length - 1,
    position: i,
  }));

const giveAppointmentsInsets = interval =>
  interval.map(appointment => ({
    inset: 0,
    ...appointment,
  }));

const calculateIntervalInsets = day => {
  for (let i = 0; i < day.length; i++) {
    const thisInterval = day[i];
    const thisIntervalLength = thisInterval
      .map(Appointment.getDuration)
      .reduce((m, e) => Math.max(m, e), 0);
    const intervalsLong = thisIntervalLength / timeInterval;

    for (let j = 0; j < intervalsLong; j++) {
      const neighborInterval = day[j + i];
      if (typeof neighborInterval !== 'undefined') {
        day[j + i] = neighborInterval.map(appointment => ({
          ...appointment,
          inset: appointment.inset + 1,
        }));
      }
    }
  }
  return day;
};

const appointmentView = (forefrontAppointment, onClick) => (appointment, i) => (
  <AppointmentCell
    key={i}
    column={appointment.day}
    row={appointment.interval}
    w={1}
    h={Math.floor(Appointment.getDuration(appointment) / timeInterval)}
  >
    <AppointmentContainer
      c={appointment.color}
      overlaps={appointment.overlaps}
      position={appointment.position}
      neighbors={appointment.neighbors}
      inset={appointment.inset}
      isforefront={String(forefrontAppointment === appointment.id)}
      onClick={() => onClick(appointment.id)}
    >
      <AppointmentBody interval={appointment.interval}>
        <AppointmentText>
          {appointmentServiceString(appointment)}
        </AppointmentText>
      </AppointmentBody>
    </AppointmentContainer>
  </AppointmentCell>
);

// CALENDAR //

const randomAppointments = () =>
  Utils.concat(
    Utils.range(300)
      .map(() => Appointment.random())
      .map(giveDayAndInterval)
      .reduce(intoDays, Utils.repeat(() => [], daysInWeek + 1))
      .map(giveDaysIntervalBuckets)
      .map(day => day.map(calculateAppointmentWidths))
      .map(day => day.map(giveAppointmentsInsets))
      .map(day => calculateIntervalInsets(day))
      .map(Utils.concat),
  );

class CalendarBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: randomAppointments(),
      forefrontAppointment: '',
    };
    this.randomize = this.randomize.bind(this);
    this.makeForefront = this.makeForefront.bind(this);
  }

  randomize() {
    this.setState({ appointments: randomAppointments() });
  }

  makeForefront(id) {
    console.log(id);
    this.setState({ forefrontAppointment: id });
  }

  render() {
    return (
      <Container>
        <Button onClick={this.randomize}>Random Appointments</Button>
        <BackgroundContainer>
          <BackgroundGrid>
            {Utils.range(daysInWeek).map(i =>
              Utils.range(numberOfRows).map(j => (
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
            {this.state.appointments.map(
              appointmentView(
                this.state.forefrontAppointment,
                this.makeForefront,
              ),
            )}
            {Utils.range(numberOfRows).map(i => {
              const time = i * timeInterval;
              return (
                <TimeCell key={i} column={0} row={i} w={1} h={1}>
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
