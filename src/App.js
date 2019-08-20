import React, { useState, useEffect, useRef } from 'react';
import './CSS/App.css';
import UserSetTime from './UserSetTime';
import Timer from './Timer';
import Controls from './Controls';
import { millisecondsToTimeString, minToMilli } from './Utilities';
import wav_timerFinished from './Media/timerFinished.wav';

const App = () => {

    const [sessionActiveFlag, setSessionActiveFlag] = useState(true);
    const [session, setSession] = useState(25);
    const [rest, setRest] = useState(5);
    const [sessionMilliseconds, setSessionMilliseconds] = useState(minToMilli(session));
    const [restMilliseconds, setRestMilliseconds] = useState(minToMilli(rest));
    const [display, setDisplay] = useState(millisecondsToTimeString(sessionMilliseconds));
    const [timerActiveFlag, setTimerActiveFlag] = useState(false);
    const [intervalState, setIntervalState] = useState(null);
    const [audioState, setAudioState] = useState(null);


    useEffect(
        () => {
            setAudioState(document.getElementById("beep"));
        }, []
    );

    useEffect(
        () => {
            setSessionMilliseconds(minToMilli(session));
            setRestMilliseconds(minToMilli(rest));
        }, [session, rest]
    );

    const flagRef = useRef(sessionActiveFlag);
    flagRef.current = sessionActiveFlag;

    const timerRef = useRef(timerActiveFlag);
    timerRef.current = timerActiveFlag;

    const intervalRef = useRef(intervalState);
    intervalRef.current = intervalState;

    useEffect(
        () => {
            // console.log("Updating display");
            if (sessionMilliseconds === -1000 || restMilliseconds === -1000) {
                setDisplay("00:00");
                audioState.play();
                if (sessionActiveFlag) {
                    setSessionMilliseconds(minToMilli(session));
                } else {
                    setRestMilliseconds(minToMilli(rest));
                }
                setSessionActiveFlag(!sessionActiveFlag);
            }
            if (sessionActiveFlag) {
                setDisplay(millisecondsToTimeString(sessionMilliseconds));
            } else {
                setDisplay(millisecondsToTimeString(restMilliseconds));
            }
        }, [sessionActiveFlag, sessionMilliseconds, restMilliseconds, audioState, rest, session]
    );

    const handleInterval = () => {
        if (timerRef.current) {
            clearInterval(intervalRef.current);
        } else {
            setIntervalState(setInterval(
                () => {
                    // console.log("SetInterval function running...");
                    if (flagRef.current) {
                        setSessionMilliseconds(current => current - 1000);
                    } else {
                        setRestMilliseconds(current => current - 1000);
                    }
                }, 1000));
        }
    };

    const startStop = () => {
        if (timerActiveFlag) {
            // console.log("timerActiveFlag is true...");
            handleInterval();
            setTimerActiveFlag(false);
        } else {
            // console.log("timerActiveFlag is false...");
            handleInterval();
            setTimerActiveFlag(true);
        }
    };

    const incrementSession = () => {
        if (session === 60 || timerActiveFlag) {
            return;
        }
        setSession(session + 1);
    };

    const decrementSession = () => {
        if (session === 1 || timerActiveFlag) {
            return;
        }
        setSession(session - 1);
    };

    const incrementRest = () => {
        if (rest === 60 || timerActiveFlag) {
            return;
        }
        setRest(rest + 1);
    };

    const decrementRest = () => {
        if (rest === 1 || timerActiveFlag) {
            return;
        }
        setRest(rest - 1);
    };

    const reset = () => {
        audioState.load();
        clearInterval(intervalRef.current);
        setTimerActiveFlag(false);
        setSessionActiveFlag(true);
        setRest(5);
        setSession(25);
        setSessionMilliseconds(minToMilli(25));
        setRestMilliseconds(minToMilli(5));
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
            <Timer display={display} sessionActive={sessionActiveFlag} />
            <Controls reset={reset} startStop={startStop} />
            <audio src={wav_timerFinished} id="beep" />
        </div>
    );
};

export default App;
