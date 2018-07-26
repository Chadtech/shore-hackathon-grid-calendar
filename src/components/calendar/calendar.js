import React, { Component } from 'react';

import Body from './body/calendar-body';
import Nav from './nav/calendar-nav';
import styled from 'styled-components';

const Container = styled.div``;

class Calendar extends Component {
  render() {
    return (
      <Container>
        <Nav />
        <Body />
      </Container>
    );
  }
}

export default Calendar;
