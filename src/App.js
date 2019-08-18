import React, { useState, useEffect } from 'react';
import './CSS/App.css';
import UserSetTime from './UserSetTime';
import Timer from './Timer';
import Controls from './Controls';

const App = () => {

    const [session, setSession] = useState(25);
    const [rest, setRest] = useState(5);
    const [timerActiveFlag, setTimerActiveFlag] = useState(false);

    const isActive = () => {
        setTimerActiveFlag(!timerActiveFlag);
    };

    const incrementSession = () => {
        if(session === 60 || timerActiveFlag) {
            return;
        }
        setSession(session + 1);
    };

    const decrementSession = () => {
        if(session === 1 || timerActiveFlag) {
            return;
        }
        setSession(session - 1);
    };

    const incrementRest = () => {
        if(rest === 60 || timerActiveFlag) {
            return;
        }
        setRest(rest + 1);
    };

    const decrementRest = () => {
        if(rest === 1 || timerActiveFlag) {
            return;
        }
        setRest(rest - 1);
    };

    const reset = () => {
        setRest(5);
        setSession(25);
    }

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
                    timeLength={rest}
                    increment={incrementRest}
                    decrement={decrementRest}
                />
                <UserSetTime
                    title="Session Length"
                    labelId="session-label"
                    iconIdDec="session-decrement"
                    iconIdInc="session-increment"
                    lengthId="session-length"
                    timeLength={session}
                    increment={incrementSession}
                    decrement={decrementSession}
                />
            </div>
            <Timer sessionTime={session} restTime={rest} reset={reset} active={isActive} activeFlag={timerActiveFlag}/>
        </div>
    );
};

export default App;
