let timerID;
let elapsedTime;

useStorageMenu();
setClock();

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

function setClock() {
    setInterval(function () {
        document.getElementById("time").innerHTML = unixToTime((Date.now() / 1000).toFixed(0), "clock");
    }, 10);;

    setInterval(function () {
        document.getElementById("date").innerHTML = unixToDate((Date.now() / 1000).toFixed(0));
    }, 10);;
}

function startPauseTimer() {
    const startPause = document.getElementById("startPauseTimer").innerHTML;

    if (startPause === "Start") {
        const startTime = Date.now();
        timerID = setInterval(function () {
            elapsedTime = (Date.now() - (startTime));
            document.getElementById("clockTimer").innerHTML = unixToTime((elapsedTime / 1000).toFixed(0));
        }, 100);
        document.getElementById("startPauseTimer").innerHTML = "Pause";

    }
    else if (startPause === "Pause") {
        clearInterval(timerID);
        document.getElementById("startPauseTimer").innerHTML = "Continue";
    }
    else if (startPause === "Continue") {
        const startTime = Date.now() - elapsedTime;
        timerID = setInterval(function () {
            elapsedTime = (Date.now() - (startTime));
            document.getElementById("clockTimer").innerHTML = unixToTime((elapsedTime / 1000).toFixed(0));
        }, 100);
        document.getElementById("startPauseTimer").innerHTML = "Pause";
    }
}

function resetTimer() {
    clearInterval(timerID);
    document.getElementById("clockTimer").innerHTML = "00:00:00";
    document.getElementById("startPauseTimer").innerHTML = "Start"
}
function saveTimer() {
    resetTimer();
    document.getElementById("sessions").innerHTML = unixToTime(elapsedTime / 1000);

}

function useStorageMenu() {

    if (localStorage.getItem("menu") == "timer") {
        overlayTimer();
    }
    else if (localStorage.getItem("menu") == "stopwatch") {
        overlayStopwatch();
    }
    else {
        overlayClock();

    }
}

function restart() {
    localStorage.removeItem("menu");
    overlayClock();
}

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