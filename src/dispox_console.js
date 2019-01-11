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

        // Close / Open Terminal
        let elem = document.getElementById('box'),
        fadeInInterval,
        fadeOutInterval;
        
        let opens = document.getElementsByClassName('open');
        for(var i = 0; i < opens.length; i++) {
          (function(index) {
            opens[index].addEventListener("click", function() {
                clearInterval(fadeInInterval);
                clearInterval(fadeOutInterval);
                elem.fadeIn = function(timing) {
                    let newValue = 0;
                    elem.style.display = 'block';
                    elem.style.opacity = 0;
                    fadeInInterval = setInterval(function(){ 
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
        for(var i = 0; i < closes.length; i++) {
          (function(index) {
            closes[index].addEventListener("click", function() {

                clearInterval(fadeInInterval);
                clearInterval(fadeOutInterval);
                elem.fadeOut = function(timing) {
                    let newValue = 1;
                    elem.style.opacity = 1;
                    fadeOutInterval = setInterval(function(){ 
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
                <div id="terminalheader">
                    <div className="btnTerminal toggleTerminal close" title="Close terminal"></div>
                    <div className="btnTerminal expandTerminal" title="Expand terminal"></div>
                </div>
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
            </div>
        );
    }

}

export default dispox_console;