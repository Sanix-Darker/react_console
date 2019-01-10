import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import EchoConsole from './EchoConsole';

class App extends Component {
  render() {
    return (
      <div >
        <header className="App-header">
          <img src={logo} className="App App-logo" alt="logo" />
          <p className="App">
            [ React Console ] - Implementation Connexion with a Python Micro Service.
          </p>
          <EchoConsole />
        </header>
        
      </div>
    );
  }
}

export default App;
