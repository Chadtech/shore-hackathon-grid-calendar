import React, { Component } from 'react';

import styled from 'styled-components';
import Utils from '../../../utils';
import GridSystem from '../../grid/grid';

const timeInterval = 15;
// in minutes -^
const daysInWeek = 7;
const numberOfRows = 24 * (60 / timeInterval);

const { Grid, Cell } = GridSystem.make({
  columns: ['60px', GridSystem.repeat(daysInWeek, 'auto')],
  rows: [GridSystem.repeat(numberOfRows, '40px')],
});

const dayStringFromInt = i => {
  switch (i) {
    case 1:
      return 'Mon';

    case 2:
      return 'Tue';

    case 3:
      return 'Wed';

    case 4:
      return 'Thu';

    case 5:
      return 'Fri';

    case 6:
      return 'Sat';

    default:
      return 'Sun';
  }
};

const WeekDay = styled.div`
  font-size: 0.7rem;
  font-weight: 700;
  padding-top: 16px;
  padding-bottom: 16px;
  text-align: center;
`;

const weekList = [...Array(7).keys()].map(i => {
  const thisDate = new Date(new Date().setDate(new Date().getDate() + i));
  return [
    dayStringFromInt(thisDate.getDay() % 7),
    ', ',
    String(thisDate.getDate()),
    '/',
    Utils.padLeftZero(String(thisDate.getMonth())),
  ].join('');
});

class CalendarDataAxis extends Component {
  render() {
    return (
      <Grid>
        {weekList.map((day, i) => (
          <Cell row={0} column={i + 1} w={1} h={1}>
            <WeekDay>{day}</WeekDay>
          </Cell>
        ))}
      </Grid>
    );
  }
}

export default CalendarDataAxis;
