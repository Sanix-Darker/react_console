# React Console.

An Implementation of a connexion with a Python Microservice

## Installation && Deployment

```shell
# To install
cd to/the/project
npm install

# To launch
npm start
# Or
yarn start

# The app should be available on http://localhost:3000/

# For extras feature like closing or open the echoxconsole_terminal just use thee class
.echoxconsole_close to close the echoxconsole_terminal
.echoxconsole_open to open the echoxconsole_terminal
```

## How to use
```js
import EchoConsole from './EchoConsole/EchoConsole'
 
// Pass the EchoConsole's parameters as defined -->
  constructor (props){
    super(props);

    this.state = {
        logs: [], // Array of log for this client
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
        ....
          <EchoConsole  connected = {this.state.connected}
                        logs={this.state.logs} />
        ....
```

Now to handle the console, we have:
```html
<!-- close and open the console with echoxconsole_open/echoxconsole_close classes -->
<button className="echoxconsole_open">echoxconsole_open</button>
<button className="echoxconsole_close">echoxconsole_close</button>

<!-- ------------------------------------ -->
<!-- To access extras informations use theese selector and get their content: -->

<!-- Elapsed time -->
#echoxconsole_elapsed_time

<!-- Estimated time -->
#echoxconsole_estimate_time

<!-- alert(document.getElementById("echoxconsole_estimate_time").innerText);
```

## Render

<img src="render.PNG"/>

## Author

- [Sanix darker](https://github.com/Sanix-Darker)
