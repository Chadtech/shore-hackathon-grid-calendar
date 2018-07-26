import React, { Component } from 'react';

import styled from 'styled-components';

import CalendarDataAxis from './date-axis';
import CalendarTimeAxis from './time-axis';

const Container = styled.div``;

class CalendarNav extends Component {


  render() {

    return <Container>

        <CalendarDataAxis/>
        <CalendarTimeAxis/>

    </Container>;
  }
}

export default CalendarNav;
