import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import uuid from 'uuid/v4';

import EchoConsole from './EchoConsole/EchoConsole';

class App extends Component {

  constructor (props){
    super(props);

    this.state = {
        logs: [], // Array of log for this client
        step: 0, // Step is a log with type=step and value message
        estimate_time: "Calculating....",// Estimatetime is a log with type=estimatetime and value is message
        stop: false, // stop is the status of stopping or starting the python MicroService
        connected: true // This params determine whetheir if the Serveur is connected or not
    }
  }

  // This method appends logs in an array
  addLogs(newlog){
      let all_log = this.state.logs;
      all_log.unshift("> "+newlog);
      this.setState({
          logs: all_log
      });
  }

  render() {

    return (
      <div >
        <header className="App-header">
          <img src={logo} className="App App-logo" alt="logo" />
          <p className="App">
            [ Dispox Console ] - Implementation Connexion with a Python Micro Service.
            <button className="echoxconsole_open">Open</button>
            <button className="echoxconsole_close">Close</button>
          </p>
          <EchoConsole  estimate_time = {this.state.estimate_time}
                        connected = {this.state.connected}
                        step = {this.state.step}
                        stop = {this.state.stop}
                        logs={this.state.logs} />
        </header>
        
      </div>
    );
  }
}

export default App;
