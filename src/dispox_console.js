import React, {Component} from 'react';
import './dispox_console.scss';

// import axios from 'axios';

class dispox_console extends Component {

    state = {
        list_log: ""
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            list_log: nextProps.logs[0].map((log, i) => {
                return <div key={i}>{log}<br/></div>;
            })
        });
    };

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount(){

    }
    
    handleKeyPress(event){
        if(event.key == 'Enter'){
            console.log('enter press here! ')
            console.log("Youtr command: "+event.target.value+" can not be executed!");
            console.log("This feature has been disabled!");
            // axios.get('http://localhost:5000/command?command='+event.target.value)
            //     .then(response => {
            //         console.log(response.data);
            //         const log = <div>> {event.target.value}<br/>{response.data}<br/></div>
            //         this.setState({
            //             list_log: this.state.list_log+log
            //         });
            //         event.target.value = "";
            //     })
            //     .catch(response => {
            //         console.log(response);
            //     });
        }
    }
     
      render() {
        return (
            <div id="terminal">
                # =================================================================<br/>
                # Welcome to Dispox Console <br/>
                # This console allow you to have logs from the python micro service <br/>
                # on machine Learning Third party.<br/>
                # =================================================================<br/><br/>
                <span>{this.state.list_log}
                    <div>
                        ><input type="text"
                                className="invisibleInput"
                                id="input"
                                onKeyPress={this.handleKeyPress}/>
                    </div>
                    <div style={{ float:"left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el; }}>
                    </div>
                </span>
            </div>
        );
    }

}

export default dispox_console;