import React, { Component } from 'react';

import Calendar from '../calendar/calendar';

const widthBreakPoint = 768;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dayInFocus: window.innerWidth > widthBreakPoint ? undefined : 1,
      daysToShow: 1,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      if (window.innerWidth > widthBreakPoint) {
        this.setState({ dayInFocus: undefined });
      } else {
        if (typeof this.state.dayInFocus === 'undefined') {
          this.setState({ dayInFocus: 1 });
        }
      }
    });
  }
  render() {
    return (
      <div className="container-fluid">
        <Calendar state={this.state} />
      </div>
    );
  }
}

export default Home;
