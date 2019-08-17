import React from 'react';
import './CSS/Timer.css';
import PropTypes from 'prop-types';

const Timer = (props) => {
    return (
        <div className="timer-container">
            <h2 id="timer-label">{props.timerLabel}</h2>
            <p id="time-left">{props.timer}</p>
        </div>
    );
};

Timer.propTypes = {
    timerLabel: PropTypes.string.isRequired,
    timer:PropTypes.string.isRequired
};

export default Timer;