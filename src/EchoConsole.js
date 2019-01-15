import React, {Component} from 'react';

import DispoxConsole from './dispox_console';

// Sockets calls
import { onStep,
        onLog,
        onConnect,
        //onDisConnect,
        onConnected,
        onDisConnected} from './socket';
import openSocket from 'socket.io-client';

class EchoConsole extends Component {
    constructor (props){
        super(props);

        this.state = {
            logs: [],
            step: 0
        }
    }

    addLogs(newlog){
        let all_log = this.state.logs;

        // Instead of using a push, we will use the unshift 
        // to push a the beggining of the array
        // all_log.push("> "+newlog);
        all_log.unshift("> "+newlog);
        
        this.setState({
            logs: all_log
        });
    }
    
    addStatus(newstatus){
        let all_status = this.state.status;

        all_status.push("> "+newstatus);
        this.setState({
            status: all_status
        });
    }

    componentDidMount(){
        const socket = openSocket(this.props.socket_server+"/test");

        onConnect(socket, value => {
            //console.log("onConnect value: "+value);
            //this.addLogs("Trying to connect to PythonService...");
        });
        this.addLogs("Trying to connect to PythonService...");

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

        onStep(socket, value => {
            //console.log("onLog value: ", value);
            //this.addStatus(value.data);
            this.setState({
                step: value.data
            });
        });
    }

    render() {
        return (<div>
                    <DispoxConsole ref="console"
                        estimate_time = "0d - 00h:50m:00s"
                        step = {this.state.step}
                        logs={[this.state.logs]}/>
                </div>);
    }
}

export default EchoConsole;