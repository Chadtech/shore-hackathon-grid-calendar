import React, { Component } from 'react';

import Calendar from '../calendar/calendar';

class Home extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Calendar />
      </div>
    );
  }
}

export default Home;
