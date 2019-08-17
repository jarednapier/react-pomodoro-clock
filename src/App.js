import React from 'react';
import './CSS/App.css';
import UserSetTime from './UserSetTime';
import Timer from './Timer';
import Controls from './Controls';

const App = () => {
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
                />
                <UserSetTime
                    title="Session Length"
                    labelId="session-label"
                    iconIdDec="session-decrement"
                    iconIdInc="session-increment"
                    lengthId="session-length"
                />
            </div>
            <Timer timerLabel="Label" timer="Time" />
            <Controls />
        </div>
    );
};

export default App;
