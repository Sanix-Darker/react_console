import React, {Component} from 'react';

import DispoxConsole from './dispox_console';

// Sockets calls
import {onStop,
        onStep,
        onLog,
        onConnect,
        //onDisConnect,
        onEstimateTime,
        onConnected,
        onDisConnected} from './socket';
import openSocket from 'socket.io-client';

import axios from 'axios';

class EchoConsole extends Component {
    constructor (props){
        super(props);

        this.state = {
            ddx_id: "",
            logs: [],
            step: 0,
            estimate_time: "Calculating....",
            stop: false,
            connected: true
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

    componentWillReceiveProps(nextProps){

        this.state.ddx_id = nextProps.ddx_id;
        console.log("nextProps: ", nextProps);
    }

    checkAvailableServer(){
        // const thiss = this;
        // setInterval(() => {
        //     axios.get(this.props.socket_server)
        //         .then( (response) => {
        //             //console.log("Console Connected");
        //             // handle success
        //             thiss.setState({
        //                 connected: true
        //             });
        //         })
        //         .catch( (error) => {
        //             //console.log("Console not Connected");
        //             // handle error
        //             thiss.setState({
        //                 connected: false
        //             });
        //         });
        // }, 15000);
    }

    componentDidMount(){

        // Faire un ping reccurent setinterval au serveur pour etre sur que le serveur soit toujours available
        const socket = openSocket(this.props.socket_server+"/test");
        this.state.ddx_id = this.props.ddx_id;

        const thiss = this;
        setInterval(() => {
            axios.get(this.props.socket_server)
                .then( (response) => {
                    //console.log("Console Connected");
                    // handle success
                    thiss.setState({
                        connected: true
                    });
                })
                .catch( (error) => {
                    //console.log("Console not Connected");
                    // handle error
                    thiss.setState({
                        connected: false
                    });
                });
        }, 15000);

        onConnect(this.state.ddx_id, socket, value => {
            console.log("onConnect value: "+value);
            //this.addLogs("Trying to connect to PythonService...");
        });
        this.addLogs("Trying to connect to PythonService...");

        // onDisConnect(socket, value => {
        //     // console.log("onDisConnect value: "+value);
        //     // this.addLogs("Deconnected from PythonService...");
        // });

        // getters ==============================================
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

        onStop(socket, value => {
            this.setState({
                stop: !this.state.stop
            });
        });

        onEstimateTime(socket, value => {
            //console.log("onLog value: ", value);
            this.setState({
                estimate_time: value.data
            });
        });
    }

    render() {
        return (<div>
                    <DispoxConsole ref="console"
                        checkAvailableServer = {this.checkAvailableServer}
                        estimate_time = {this.state.estimate_time}
                        connected = {this.state.connected}
                        step = {this.state.step}
                        stop = {this.state.stop}
                        logs={this.state.logs}/>
                </div>);
    }
}

export default EchoConsole;