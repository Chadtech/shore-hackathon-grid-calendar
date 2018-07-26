import React, { Component } from 'react';

import { 
  BrowserRouter as Router,
  Route,
  Link
 } from 'react-router-dom';

// components
import Header from './components/headerComponents/header';
import Footer from './components/footerComponents/footer';
import HomePages from './components/pages/homePages';
import Products from './components/pages/aboutPages';

// includes
import './Assets/css/style.min.css';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        
        <Header/>
        
        <Route exact path='/' component={HomePages}/>
        <Route exact path='/products' component={Products}/> 
          
        <Footer/>
        

      </div>
      </Router>
    );
  }
}

export default App;
