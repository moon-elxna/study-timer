checkStorageMenu()
function checkStorageMenu(){
    if (localStorage.getItem("menu") !== null){
        document.getElementById("continueOverlay").style.display = "block";
        document.getElementById("timerOverlay").style.display = "none";
        document.getElementById("stopwatchOverlay").style.display = "none";
        document.getElementById("clockOverlay").style.display = "none";
    }
    else{
        document.getElementById("continueOverlay").style.display = "none";
    }
}

function useStorageMenu(){
    
    if (localStorage.getItem("menu") == "timer"){
        document.getElementById("continueOverlay").style.display = "none";
        document.getElementById("timerOverlay").style.display = "block";
        document.getElementById("stopwatchOverlay").style.display = "none";
        document.getElementById("clockOverlay").style.display = "none"; 
    }
    else if (localStorage.getItem("menu") == "stopwatch"){
        document.getElementById("continueOverlay").style.display = "none";
        document.getElementById("timerOverlay").style.display = "none";
        document.getElementById("stopwatchOverlay").style.display = "block";
        document.getElementById("clockOverlay").style.display = "none";
    }
    else{
        document.getElementById("continueOverlay").style.display = "none";
        document.getElementById("timerOverlay").style.display = "none";
        document.getElementById("stopwatchOverlay").style.display = "none";
        document.getElementById("clockOverlay").style.display = "block";

    }
}

function deleteStorageMenu(){
    localStorage.removeItem("menu");
    document.getElementById("continueOverlay").style.display = "none";
    document.getElementById("timerOverlay").style.display = "none";
    document.getElementById("stopwatchOverlay").style.display = "none";
    document.getElementById("clockOverlay").style.display = "block";
}

//swichting overlay
function overlayClock(){
    document.getElementById("timerOverlay").style.display = "none";
    document.getElementById("stopwatchOverlay").style.display = "none";
    document.getElementById("clockOverlay").style.display = "block";
    localStorage.setItem("menu", "clock")
}

function overlayTimer(){
    document.getElementById("timerOverlay").style.display = "block";
    document.getElementById("stopwatchOverlay").style.display = "none";
    document.getElementById("clockOverlay").style.display = "none";
    localStorage.setItem("menu", "timer")
}


function overlayStopwatch(){
    document.getElementById("timerOverlay").style.display = "none";
    document.getElementById("stopwatchOverlay").style.display = "block";
    document.getElementById("clockOverlay").style.display = "none";
    localStorage.setItem("menu", "stopwatch")
}