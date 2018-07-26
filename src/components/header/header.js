import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import styled from 'styled-components';

var CoolButton = styled.button`
  width: 100px;
  height: 100px;
  background: #ff0000;
`;

class Header extends Component {
  render() {
    return <header />;
  }
}

export default Header;
