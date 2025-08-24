//swichting overlay
function overlayClock(){
    document.getElementById("timerOverlay").style.display = "none";
    document.getElementById("stopwatchOverlay").style.display = "none";
    document.getElementById("clockOverlay").style.display = "block";
}

function overlayTimer(){
    document.getElementById("timerOverlay").style.display = "block";
    document.getElementById("stopwatchOverlay").style.display = "none";
    document.getElementById("clockOverlay").style.display = "none";
}


function overlayStopwatch(){
    document.getElementById("timerOverlay").style.display = "none";
    document.getElementById("stopwatchOverlay").style.display = "block";
    document.getElementById("clockOverlay").style.display = "none";
}