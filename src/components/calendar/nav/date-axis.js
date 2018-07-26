import React, { Component } from 'react';

import styled from 'styled-components';

const WeekContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-flow: dense;
  background: white;
  padding-left: 60px;
  overflow: hidden;
  @media (max-width: 768px) {
    grid-template-columns: repeat(7, 1fr);
    min-width: 700px;
    padding-left: 5rem;
  }
`;

const WeekDay = styled.div`
  font-size: 0.7rem;
  font-weight: 700;
  padding-top: 16px;
  padding-bottom: 16px;
`;

var weeklist = [
  {
    date: 'Mo, 23/07',
  },
  {
    date: 'Tue, 24/07',
  },
  {
    date: 'Wed, 25/07',
  },
  {
    date: 'Thu, 26/07',
  },
  {
    date: 'Fri, 27/07',
  },
  {
    date: 'Sat, 28/07',
  },
  {
    date: 'Sun, 29/07',
  },
];

class CalendarDataAxis extends Component {
  render() {
    const weekItems = weeklist.map(day => <WeekDays date={day.date} />);

    return <WeekContainer>{weekItems}</WeekContainer>;
  }
}

class WeekDays extends React.Component {
  render() {
    return (
      <WeekDay className="weekday">
        <a href="">{this.props.date}</a>
      </WeekDay>
    );
  }
}

export default CalendarDataAxis;
