import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// components
import Header from './components/header/header';
import Home from './components/pages/home';

// includes
import './Assets/css/style.min.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/" component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;
