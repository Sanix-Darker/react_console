import React, {Component} from 'react';

import DispoxConsole from './dispox_console';

class EchoConsole extends Component {
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

    componentWillReceiveProps(nextProps){
        this.state = nextProps;
    }

    componentDidMount(){
        this.state = this.props;
    }

    render() {
        return (<div>
                    <DispoxConsole ref="console"
                        estimate_time = {this.state.estimate_time}
                        connected = {this.state.connected}
                        step = {this.state.step}
                        stop = {this.state.stop}
                        logs={this.state.logs}/>
                </div>);
    }
}

export default EchoConsole;