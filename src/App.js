import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import uuid from 'uuid/v4';

import EchoConsole from './EchoConsole/EchoConsole';

class App extends Component {
  
  render() {
    let ddx_id = uuid();

    return (
      <div >
        <header className="App-header">
          <img src={logo} className="App App-logo" alt="logo" />
          <p className="App">
            [ Dispox Console ] - Implementation Connexion with a Python Micro Service.
            <button className="echoxconsole_open">Open</button>
            <button className="echoxconsole_close">Close</button>
          </p>
          <EchoConsole ddx_id = {ddx_id}
                        socket_server = "http://192.168.56.1:5000"/>{/* http://35.231.219.140:5000 */}
        </header>
        
      </div>
    );
  }
}

export default App;
