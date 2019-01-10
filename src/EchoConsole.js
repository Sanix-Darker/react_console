import React, {Component} from 'react';

import Console from 'react-console-component';
import './react-console.scss';

class EchoConsole extends Component {
    constructor (props){
        super(props);

        this.state = {
            
        }
    }
    
    echo(text) {
        if(text.toLowerCase() === "help"){
            this.refs.console.log("This project is an interface to receive logs from the python Microservice(for RabbitMq)");
        }else{
            this.refs.console.log(text);
        }
        this.refs.console.return();
    }

    render() {
        return (<div>
                    <Console ref="console"
                        welcomeMessage = {"Welcome to Dispox Console \nHit 'help' if you are new here."}
                        handler={(e) => this.echo(e)}
                        autofocus={true}/>
                </div>);
    }
}

export default EchoConsole;