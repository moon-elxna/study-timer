useStorageMenu();

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

//swichting overlay
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