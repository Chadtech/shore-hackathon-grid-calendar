import React, { Component } from 'react';

import Body from './body/calendar-body';
import Nav from './nav/calendar-nav';
import styled from 'styled-components';
import GridSystem from '../grid/grid';

const { Grid, Cell } = GridSystem.make({
  columns: ['auto'],
  rows: ['45px', 'auto'],
});

const Container = styled.div``;

class Calendar extends Component {
  render() {
    return (
      <Container>
        <Grid>
          <Cell row={0} column={0} w={1} h={1}>
            <Nav />
          </Cell>
          <Cell row={1} column={0} w={1} h={1}>
            <Body />
          </Cell>
        </Grid>
      </Container>
    );
  }
}

export default Calendar;
