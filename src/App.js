import React from 'react';
import './CSS/App.css';
import UserSetTime from './UserSetTime';
import Timer from './Timer';
import Controls from './Controls';

const App = () => {
    return (
        <div className="clock-container">
            <h1 id="title">POMODORO CLOCK</h1>
            <div className="settings">
                <UserSetTime />
                <UserSetTime />
            </div>
            <Timer />
            <Controls />
        </div>
    );
};

export default App;
