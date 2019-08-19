import React from 'react';
import './CSS/Controls.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faUndo } from '@fortawesome/free-solid-svg-icons';

const Controls = (props) => {
    return (
        <div className="controls-container">
            <div id="start_stop" onClick={() => {props.startStop();}}>
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
                onClick={() => {props.reset();}}
            />
        </div>
    );
};

Controls.propTypes = {
    reset: PropTypes.func.isRequired,
    startStop: PropTypes.func.isRequired
};

export default Controls;