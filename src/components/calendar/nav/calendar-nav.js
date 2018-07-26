import React, { Component } from 'react';

import styled from 'styled-components';

import CalendarDataAxis from './date-axis';
import styles from '../../../styles/styles';

const Container = styled.div`
  background-color: ${styles.white};
`;

class CalendarNav extends Component {
  render() {
    return (
      <Container>
        <CalendarDataAxis />
      </Container>
    );
  }
}

export default CalendarNav;
