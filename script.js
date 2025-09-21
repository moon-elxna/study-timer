useStorageMenu();
unixToTime((Date.now() / 1000).toFixed(0));

function unixToTime(timestamp) {
    const date = new Date(timestamp * 1000); // convert seconds → ms
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // months start at 0
    const year = String(date.getFullYear()).slice(-2);
    document.getElementById("time").innerHTML = hours + ":" + minutes + ": " + seconds + ", " + day + "." + month + "." + year;
    //ChatGPT retten einfax Leben xd 
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