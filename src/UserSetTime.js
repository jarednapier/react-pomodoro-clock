import React from 'react';
import './CSS/UserSetTime.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';


const UserSetTime = (props) => {
    return (
        <div className="set-time-container">
            <h2 id={props.labelId}>{props.title}</h2>
            <div className="set-time-controls">
                <FontAwesomeIcon
                    icon={faArrowUp}
                    className="icon"
                    id={props.iconIdInc}
                    size="3x"
                    onClick={() => {props.increment()}}
                />
                <p id={props.lengthId} className="length">{props.timeLength.toString()}</p>
                <FontAwesomeIcon
                    icon={faArrowDown}
                    className="icon"
                    id={props.iconIdDec}
                    size="3x"
                    onClick={() => {props.decrement()}}
                />
            </div>
        </div>
    );
};

UserSetTime.propTypes = {
    title: PropTypes.string.isRequired,
    labelId: PropTypes.string.isRequired,
    iconIdDec: PropTypes.string.isRequired,
    iconIdInc: PropTypes.string.isRequired,
    lengthId: PropTypes.string.isRequired,
    timeLength: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired
};

export default UserSetTime;