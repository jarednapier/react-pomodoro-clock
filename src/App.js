import React from 'react';
import './CSS/App.css';
import UserSetTime from './UserSetTime';
import Timer from './Timer';
import Controls from './Controls';
import { millisecondsToTimeString, minToMilli } from './Utilities';
import wav_timerFinished from './Media/timerFinished.wav';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionActiveFlag: true,
            session: 25,
            rest: 5,
            sessionMilliseconds: minToMilli(25),
            restMilliseconds: minToMilli(5),
            display: millisecondsToTimeString(25 * 60 * 1000),
            timerActiveFlag: false
        };
        this.audio = null;
        this.interval = undefined;
    }

    componentDidMount() {
        this.audio = document.getElementById("beep");
    }

    componentDidUpdate() {
            // console.log("Updating display");
            if(this.state.display === "00:00") {
                this.audio = document.getElementById("beep");
                this.audio.play();
                if(this.state.sessionActiveFlag) {
                    this.setState({sessionMilliseconds: minToMilli(this.state.session)});
                } else {
                    this.setState({restMilliseconds: minToMilli(this.state.rest)});
                }
                this.setState({
                    sessionActiveFlag: !this.state.sessionActiveFlag
                });
            }
            if(this.state.sessionActiveFlag) {
                this.setState({
                    display: millisecondsToTimeString(this.state.sessionMilliseconds)
                });
            } else {
                this.setState({
                    display: millisecondsToTimeString(this.state.restMilliseconds)
                });    
            }
    }

    startStop = () => {
        if(this.state.timerActiveFlag) {
            // console.log("timerActiveFlag is true...");
            clearInterval(this.interval);
            this.interval = undefined;
            this.setState({
                timerActiveFlag: false
            });
        } else {
            // console.log("timerActiveFlag is false...");
            this.setState({
                timerActiveFlag: true
            });
            this.interval = setInterval(
                () => {
                    // console.log("SetInterval function running...");
                    if(this.state.sessionActiveFlag) {
                        this.setState({
                            sessionMilliseconds: this.state.sessionMilliseconds - 1000
                        });
                    } else {
                        this.setState({
                            restMilliseconds: this.state.restMilliseconds - 1000
                        });
                    }
                }, 1000);
        }
    };

    incrementSession = () => {
        if(this.state.session === 60 || this.state.timerActiveFlag) {
            return;
        }
        this.setState({session: this.state.session + 1});
    };

    decrementSession = () => {
        if(this.state.session === 1 || this.state.timerActiveFlag) {
            return;
        }
        this.setState({session: this.state.session - 1});
    };

    incrementRest = () => {
        if(this.state.rest === 60 || this.state.timerActiveFlag) {
            return;
        }
        this.setState({rest: this.state.rest + 1});
    };

    decrementRest = () => {
        if(this.state.rest === 1 || this.state.timerActiveFlag) {
            return;
        }
        this.setState({rest: this.state.rest - 1});
    };

    reset = () => {
        this.audio = null;
        clearInterval(this.interval);
        this.interval = undefined;
        this.setState({
            timerActiveFlag: false,
            sessionActiveFlag: true,
            rest: 5,
            session: 25,
            sessionMilliseconds: minToMilli(25),
            restMilliseconds: minToMilli(5)
        });
    };

    render() {
        return (
            <div className="clock-container">
                <h1 id="title">Pomodoro Clock</h1>
                <div className="settings">
                    <UserSetTime 
                        title="Break Length"
                        labelId="break-label"
                        iconIdDec="break-decrement"
                        iconIdInc="break-increment"
                        lengthId="break-length"
                        timeLength={this.state.rest}
                        increment={this.incrementRest}
                        decrement={this.decrementRest}
                    />
                    <UserSetTime
                        title="Session Length"
                        labelId="session-label"
                        iconIdDec="session-decrement"
                        iconIdInc="session-increment"
                        lengthId="session-length"
                        timeLength={this.state.session}
                        increment={this.incrementSession}
                        decrement={this.decrementSession}
                    />
                </div>
                <Timer display={this.state.display} sessionActive={this.state.sessionActiveFlag}/>
                <Controls reset={this.reset} startStop={this.startStop} />
                <audio src={wav_timerFinished} id="beep"/>
            </div>
        );
    }
}

