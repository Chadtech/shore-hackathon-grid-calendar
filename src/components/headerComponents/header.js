import React, { Component } from 'react';

import {
    Link
   } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <header>
        <nav class="navbar navbar-expand-sm bg-light navbar-light">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li class="nav-item">
                <Link to="/products" className="nav-link">About</Link>
              </li>
            </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
