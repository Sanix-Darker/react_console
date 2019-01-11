import React, {Component} from 'react';

import DispoxConsole from './dispox_console';

// Sockets calls
import { onLog,
        onConnect,
        //onDisConnect,
        onConnected,
        onDisConnected} from './socket';
import openSocket from 'socket.io-client';

class EchoConsole extends Component {
    constructor (props){
        super(props);

        this.state = {
            logs: []
        }
    }

    addLogs(newlog){
        let all_log = this.state.logs;
        all_log.push("> "+newlog);
        this.setState({
            logs: all_log
        });
    }

    componentDidMount(){
        const socket = openSocket("http://localhost:5000/test");

        onConnect(socket, value => {
            //console.log("onConnect value: "+value);
            this.addLogs("Trying to connect to PythonService...");
        });

        // onDisConnect(socket, value => {
        //     // console.log("onDisConnect value: "+value);
        //     // this.addLogs("Deconnected from PythonService...");
        // });

        onConnected(socket, value => {
            //console.log("onConnected value: ",value);
            this.addLogs("Status: PythonService connected");
        });

        onDisConnected(socket, value => {
            //console.log("onDisConnected value: ",value);
            this.addLogs("Status: PythonService disconnected");
        });

        onLog(socket, value => {
            //console.log("onLog value: ", value);
            this.addLogs(value.data);
        });
    }

    render() {
        return (<div>
                    <DispoxConsole ref="console"
                        logs={[this.state.logs]}/>
                </div>);
    }
}

export default EchoConsole;