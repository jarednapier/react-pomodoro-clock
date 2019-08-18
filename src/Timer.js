import React, {useState, useEffect} from 'react';
import './CSS/Timer.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faUndo } from '@fortawesome/free-solid-svg-icons';

const Timer = (props) => {

    const [sessionFlag, setSessionFlag] = useState(true);
    const [timeString, setTimeString] = useState(props.sessionTime.toString() + ":00");

    useEffect(
        () => {
            setTimeString(props.sessionTime.toString() + ":00")
        }
    );

    const reset = () => {
        props.reset();
        setSessionFlag(true);
    };

    return (
        <React.Fragment>
            <div className="timer-container">
                <h2 id="timer-label">{sessionFlag ? "Session" : "Rest"}</h2>
                <p id="time-left">{timeString}</p>
            </div>
            <div className="controls-container">
            <div 
                id="start_stop" 
                onClick={() => {
                        props.active();
                    }}>
                <FontAwesomeIcon
                    icon={faPlay}
                    className="icon"
                    size="3x"
                />
                <FontAwesomeIcon
                icon={faPause}
                className="icon"
                size="3x"
                />
            </div>
            <FontAwesomeIcon
                icon={faUndo}
                className="icon"
                id="reset"
                size="3x"
                onClick={reset}
            />
            </div>            
        </React.Fragment>
    );
};

Timer.propTypes = {
    sessionTime: PropTypes.number.isRequired,
    restTime: PropTypes.number.isRequired,
    reset: PropTypes.func.isRequired,
    active: PropTypes.func.isRequired,
    activeFlag: PropTypes.bool.isRequired
};

export default Timer;