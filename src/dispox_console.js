import React, {Component} from 'react';
import './dispox_console.scss';


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
    render(){
        console.log("this.props.logs[0]: ", this.props.logs[0]);
        return (
            <div id="terminal">
                # Welcome to Dispox Console <br/>
                # This console allow you to have logs from the python service.<br/><br/>
                <span>{this.state.list_log}<div>></div></span>
            </div>
        );
    }

}

export default dispox_console;