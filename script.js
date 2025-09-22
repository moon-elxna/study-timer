let stopwatchID;
let elapsedTime;
let timerID;
let remainingTime;
let duration;
useLocalStorage();
setClock();


// using local storage
function useLocalStorage() {

    if (localStorage.getItem("menu") == "timer") {
        overlayTimer();
    }
    else if (localStorage.getItem("menu") == "stopwatch") {
        overlayStopwatch();
    }
    else {
        overlayClock();

    }

    document.getElementById("sessions").innerHTML = localStorage.getItem("sessions");
}

function restart() {
    localStorage.removeItem("menu", "sessions");
    overlayClock();
}


// timer, stopwatch and clock
function startPause(mode) {

    if (mode === "stopwatch") {
        const startPause = document.getElementById("startPauseStopwatch").innerHTML;

        if (startPause === "Start") {
            const startTime = Date.now();
            stopwatchID = setInterval(function () {
                elapsedTime = (Date.now() - (startTime));
                document.getElementById("clockStopwatch").innerHTML = unixToTime((elapsedTime / 1000).toFixed(0));
            }, 100);
            document.getElementById("startPauseStopwatch").innerHTML = "Pause";

        }
        else if (startPause === "Pause") {
            clearInterval(stopwatchID);
            document.getElementById("startPauseStopwatch").innerHTML = "Continue";
        }
        else if (startPause === "Continue") {
            const startTime = Date.now() - elapsedTime;
            stopwatchID = setInterval(function () {
                elapsedTime = (Date.now() - (startTime));
                document.getElementById("clockStopwatch").innerHTML = unixToTime((elapsedTime / 1000).toFixed(0));
            }, 100);
            document.getElementById("startPauseStopwatch").innerHTML = "Pause";
        }
    }
    else if (mode === "timer") {
        const hours = parseInt(document.getElementById("hourTimer").value);
        const minutes = parseInt(document.getElementById("minuteTimer").value);
        const seconds = parseInt(document.getElementById("secondTimer").value);
        duration = timeToUnix(hours, minutes, seconds);
        const startPause = document.getElementById("startPauseTimer").innerHTML;

        if (startPause === "Start") {
            const targetTime = Date.now() + duration;
            timerID = setInterval(function () {
                remainingTime = (targetTime) - Date.now();
                document.getElementById("clockTimer").innerHTML = unixToTime((remainingTime / 1000).toFixed(0));
            }, 100);
            document.getElementById("startPauseTimer").innerHTML = "Pause";
        }

        else if (startPause === "Pause") {
            clearInterval(timerID);
            document.getElementById("startPauseTimer").innerHTML = "Continue";
        }

        else if (startPause === "Continue") {
            const targetTime = remainingTime + Date.now();
            timerID = setInterval(function () {
                remainingTime = (targetTime) - Date.now();
                document.getElementById("clockTimer").innerHTML = unixToTime((remainingTime / 1000).toFixed(0));
            }, 100);
            document.getElementById("startPauseTimer").innerHTML = "Pause";
        }

    }
}

function reset(mode) {
    if (mode === "stopwatch") {
        clearInterval(stopwatchID);
        document.getElementById("clockStopwatch").innerHTML = "00:00:00";
        document.getElementById("startPauseStopwatch").innerHTML = "Start"
    }
    else if (mode === "timer") {
        clearInterval(timerID);
        document.getElementById("clockTimer").innerHTML = "00:00:00";
        document.getElementById("startPauseTimer").innerHTML = "Start"
    }
}

function save(mode) {
    if (mode === "timer") {
        document.getElementById("sessions").innerHTML = unixToTime(duration / 1000);
    }
    else if (mode === "stopwatch") {
        reset(mode);
        document.getElementById("sessions").innerHTML = unixToTime(elapsedTime / 1000);
    }

    localStorage.setItem("sessions", document.getElementById("sessions").innerHTML)
}

function setClock() {
    setInterval(function () {
        document.getElementById("time").innerHTML = unixToTime((Date.now() / 1000).toFixed(0), "clock");
    }, 10);;

    setInterval(function () {
        document.getElementById("date").innerHTML = unixToDate((Date.now() / 1000).toFixed(0));
    }, 10);;
}


//overlay pages
function overlayClock() {
    document.getElementById("timerOverlay").style.display = "none";
    document.getElementById("stopwatchOverlay").style.display = "none";
    document.getElementById("clockOverlay").style.display = "block";
    localStorage.setItem("menu", "clock")
}

function overlayTimer() {
    document.getElementById("timerOverlay").style.display = "block";
    document.getElementById("stopwatchOverlay").style.display = "none";
    document.getElementById("clockOverlay").style.display = "none";
    localStorage.setItem("menu", "timer")
}

function overlayStopwatch() {
    document.getElementById("timerOverlay").style.display = "none";
    document.getElementById("stopwatchOverlay").style.display = "block";
    document.getElementById("clockOverlay").style.display = "none";
    localStorage.setItem("menu", "stopwatch")
}


// time and date conversion
function unixToDate(timestamp) {
    const n = new Date(timestamp * 1000); // convert seconds → ms
    const day = String(n.getDate()).padStart(2, "0");
    const month = String(n.getMonth() + 1).padStart(2, "0"); // months start at 0
    const year = String(n.getFullYear());
    return day + "." + month + "." + year;

}

function unixToTime(timestamp, mode) {
    if (mode === "clock") {
        const n = new Date(timestamp * 1000); // convert seconds → ms
        const hours = String(n.getHours()).padStart(2, "0");
        const minutes = String(n.getMinutes()).padStart(2, "0");
        const seconds = String(n.getSeconds()).padStart(2, "0");
        return hours + ":" + minutes + ":" + seconds;

    }
    else {
        const totalSeconds = Math.floor(timestamp);
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
        const seconds = String(totalSeconds % 60).padStart(2, "0");
        return hours + ":" + minutes + ":" + seconds;
    }
}

function timeToUnix(hours, minutes, seconds) {
    //conversion into ms
    const hoursMs = hours * 3600000;
    const minutesMs = minutes * 60000;
    const secondsMs = seconds * 1000;
    const timestamp = hoursMs + minutesMs + secondsMs;
    return timestamp;
}