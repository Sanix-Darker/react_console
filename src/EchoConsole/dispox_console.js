import React, {Component} from 'react';
import './dispox_console.scss';

// import axios from 'axios';

class dispox_console extends Component {

    state = {
        list_log: "",
        start_timer: false,
        current_step: 0,
        stop: false,
        estimate_time: "",
        array_status_step: [
            <span>
                * [<span id="loading"></span>] Data generation for machine learning.<br/>
            </span>,
            <span>
                * [<b>✓</b>] Data generation for machine learning.<br/>
                * [<span id="loading"></span>] Model training...<br/>
            </span>,
            <span>
                * [<b>✓</b>] Data generation for machine learning.<br/>
                * [<b>✓</b>] Model training.<br/>
                * [<span id="loading"></span>] ATM (Analytic Twin Model) generation...<br/>
            </span>,
            <span>
                * [<b>✓</b>] Data generation for machine learning.<br/>
                * [<b>✓</b>] Model training.<br/>
                * [<b>✓</b>] ATM (Analytic Twin Model) generation.<br/>
                * [<span id="loading"></span>] Model ready for scoring... (this is the final message with production rate<br/> &nbsp; &nbsp; &nbsp; displayed on the console)<br/>
            </span>,
            <span>
                * [<b>✓</b>] Data generation for machine learning.<br/>
                * [<b>✓</b>] Model training.<br/>
                * [<b>✓</b>] ATM (Analytic Twin Model) generation.<br/>
                * [<b>✓</b>] Model ready for scoring. (this is the final message with production rate<br/> &nbsp; &nbsp; &nbsp; displayed on the console)<br/>
            </span>
        ]
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            list_log: nextProps.logs.map((log, i) => {
                return <div key={i}>{log}<br/></div>;
            }),
            current_step: nextProps.step,
            estimate_time: nextProps.estimate_time,
            stop: nextProps.stop
        });
        //console.log("nextProps: ", nextProps);

        if(this.state.start_timer === false){
            // console.log("this.props.logs.length: ", this.props.logs.length);
            if(this.props.logs.length > 2){
                this.state.start_timer = true;
                // console.log("this.state.start_timer: ", this.state.start_timer);
                this.startTimer();
            }
        }
    };

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    startTimer(){
        const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

        let s = new Date().getTime(),
            x = setInterval(function() {
    
            let present = new Date().getTime(),
                gap = s - present;
    
                document.getElementById('remaining-days').innerText = -(Math.floor(gap / (day)) + 1);
                document.getElementById('remaining-hours').innerText = -(Math.floor((gap % (day)) / (hour)) + 1);
                document.getElementById('remaining-minutes').innerText = -(Math.floor((gap % (hour)) / (minute)) + 1);
                document.getElementById('remaining-seconds').innerText = -(Math.floor((gap % (minute)) / second) + 1);
            });
    }

    componentDidMount(){

        // Close / Open Terminal
        let elem = document.getElementById('box'),
        fadeInInterval,
        fadeOutInterval;
        
        let opens = document.getElementsByClassName('open');
        for(let i = 0; i < opens.length; i++) {
          ((index) => {
            opens[index].addEventListener("click", () => {
                clearInterval(fadeInInterval);
                clearInterval(fadeOutInterval);
                elem.fadeIn = (timing) => {
                    let newValue = 0;
                    elem.style.display = 'block';
                    elem.style.opacity = 0;
                    fadeInInterval = setInterval(() => { 
                        if (newValue < 1) {
                            newValue += 0.01;
                        } else if (newValue === 1) {
                            clearInterval(fadeInInterval);   
                        }
                        elem.style.opacity = newValue;
                    }, timing);
                }
                elem.fadeIn(10);
             })
          })(i);
        }

        let closes = document.getElementsByClassName('close');
        for(let i = 0; i < closes.length; i++) {
          ((index) => {
            closes[index].addEventListener("click", () => {

                clearInterval(fadeInInterval);
                clearInterval(fadeOutInterval);
                elem.fadeOut = function(timing) {
                    let newValue = 1;
                    elem.style.opacity = 1;
                    fadeOutInterval = setInterval( () => { 
                        if (newValue > 0) {
                            newValue -= 0.01;
                        } else if (newValue < 0) {
                            elem.style.opacity = 0;
                            elem.style.display = 'none';
                            clearInterval(fadeOutInterval);
                        }
                        elem.style.opacity = newValue;
                    }, timing);
                }
                elem.fadeOut(10);
             })
          })(i);
        }

        // Draggable bloc of code
        document.onmousemove=mouseMove;
        document.onmouseup = mouseUp;
        let dragObject = null;
        let mouseOffset = null;

        let dragDiv = document.getElementById('box');
        makeDraggable(dragDiv);

        function mouseMove(ev){
            ev = ev || window.event;
            let mousePos = mouseCoords(ev);
            if (dragObject){
                dragObject.style.position = 'absolute';
                dragObject.style.top = (mousePos.y - mouseOffset.y) + 'px';
                dragObject.style.left = (mousePos.x - mouseOffset.x) + 'px';
                return false;
            }
        }
        
        function getMouseOffset(target, ev){
          ev = ev || window.event;
          let docPos = getPosition(target);
          let mousePos = mouseCoords(ev);
          return {x: mousePos.x - docPos.x, y: mousePos.y - docPos.y};
        }
        
        function getPosition(e){
          let left = 0;
          let top = 0;
          while(e.offsetParent){
            left += e.offsetLeft;
            top += e.offsetTop;
            e = e.offsetParent;
          }
          left += e.offsetLeft;
          top += e.offsetTop;
          return {x: left, y: top};
        }
        
        function mouseUp(ev){
          dragObject = null;
        }

        function makeDraggable(item){
          if(!item) return;
          item.onmousedown = function(ev){
            dragObject = this;
            mouseOffset = getMouseOffset(this, ev);
            return false;
          }
        }

        function mouseCoords(ev){
          if (ev.pageX || ev.pageY){
            return {x:ev.pageX, y:ev.pageY};
          }
          return{
            x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
            y: ev.clientY + document.body.scrollTop - document.body.clientTop
          };
        }
        document.getElementById('terminal').classList.add("notfullscreen");
        // Expand code
        let expand = false;
        document.getElementById("expand").addEventListener("click", () => {
            if( expand === true){
                document.getElementById('terminal').classList.remove("fullscreen");
                document.getElementById('terminal').classList.add("notfullscreen");

                // By default, add the absolute position to terminalheader
                document.getElementById('terminalheader').classList.remove("fixed_position");
                document.getElementById('terminalheader').classList.add("absolute_position");
            }else{
                document.getElementById('terminal').classList.add("fullscreen");
                document.getElementById('terminal').classList.remove("notfullscreen");

                document.getElementById('terminalheader').classList.remove("absolute_position");
                document.getElementById('terminalheader').classList.add("fixed_position");
            }
            expand = !expand;
        });


        // Minimize the Terminal
        let box_long = true;
        document.getElementById("minimize").addEventListener("click", () => {
            // minHeightBox
            if(box_long === true){
                document.getElementById('box').classList.add("minHeightBox");
            }else{
                document.getElementById('box').classList.remove("minHeightBox");
            }
            box_long = !box_long;
        });
    }
    
    handleKeyPress(event){
        if(event.key === 'Enter'){
            // console.log('enter press here! ')
            // console.log("Youtr command: "+event.target.value+" can not be executed!");
            // console.log("This feature has been disabled!");
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
    toggleTerminal(){

    }

      render() {
        return (
            <div id="box">
                <div id="terminal">
                    { /* <div className="titleConsole">Terminal</div> */ }
                    <div id="terminalheader">
                        <div className="btnTerminal toggleTerminal close" title="Close terminal"></div>
                        <div className="btnTerminal expandTerminal" id="expand" title="Expand terminal"></div>
                        <div className="btnTerminal minimizeTerminal" id="minimize" title="Minimize terminal"></div>
                    </div>
                    <div className="statusHeader">
                        <br/>
                        # ==========================================================================<br/>
                        # Welcome to Dispox cloud computing console <br/>
                        # This console allow you to view progress logs from cloud servers cluster <br/>
                        # running Dispox simulation and machine learning computing.<br/>
                        # ==========================================================================<br/><br/>
                    </div>

                    <div className="statusWorking">
                         --ML progress messages sections---------------------------------------------<br/>
                         {this.state.stop ? 
                            <div>
                                * <span className="extraMiniInfoConsole">Estimate time : {this.state.estimate_time}</span><br/>
                                <span>* [<span id="loading"></span>] Process onGoing, please wait for server to free some space...<br/></span>
                            </div>
                            :this.props.logs.length === 2 ? /* if == 2 the server is connected... technically */
                                <span>* [<span id="loading"></span>] Server Connected, processing...<br/></span>:
                                !this.state.start_timer ? /* if not start timer Waiting for Connexion */
                                    <span>* [<span id="loading"></span>] Waiting for Connexion ...<br/></span> :
                                    <span>
                                        * <span className="extraMiniInfoConsole">Elapsed time : <span id="remaining-days">0</span>d - <span id="remaining-hours">00</span>h:<span id="remaining-minutes">00</span>m:<span id="remaining-seconds">00</span>s | Estimate time : {this.state.estimate_time}</span> <br/>
                                        {this.state.array_status_step[this.state.current_step]}
                                    </span>
                         }
                        ----------------------------------------------------------------------------
                    </div>
                    <nav>
                        ↑ Server logs ↑
                        {/*<div>
                            ><input type="text"
                                    className="invisibleInput"
                                    id="input"
                                    onKeyPress={this.handleKeyPress}/>
                        </div>*/}
                        {this.state.list_log}
                        {/*<div style={{ float:"left", clear: "both" }}
                            ref={(el) => { this.messagesEnd = el; }}>
                        </div>*/}
                    </nav>
                </div>
            </div>
        );
    }

}

export default dispox_console;