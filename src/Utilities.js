export const millisecondsToTimeString = (ms) => {
    let minutes = Math.floor((ms / 1000) / 60);
    let seconds = (ms / 1000) % 60;
    let minuteString = "";
    let secondString = "";
    if(minutes < 10) {
        minuteString = "0" + minutes.toFixed(0);
    } else {
        minuteString = minutes.toFixed(0);
    }
    if(seconds < 10) {
        secondString = "0" + seconds.toFixed(0);
    } else {
        secondString = seconds.toFixed(0);
    }
    return minuteString + ":" + secondString;
};

export const minToMilli = (num) => {
    return num * 60 * 1000;
};