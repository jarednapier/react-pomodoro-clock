import React from 'react';
import './CSS/Timer.css';
import PropTypes from 'prop-types';


const Timer = (props) => {

    return (
        <div className="timer-container">
            <h2 id="timer-label">{props.sessionActive ? "Session" : "Rest"}</h2>
            <p id="time-left">{props.display}</p>
        </div>
    );
};

Timer.propTypes = {
    display: PropTypes.string.isRequired,
    sessionActive: PropTypes.bool.isRequired
};

export default Timer;