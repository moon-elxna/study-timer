//---main---
const modes = ["clock", "timer", "stopwatch"]; 
const mainpage = modes[0];
const intervals = {
    stopwatch: null,
    timer: null
}
/*let elapsedTime;
let remainingTime;
let duration;*/
use_localstorage()
set_clock();


//---EventListeners---
for(let i = 0; i < modes.length; i++){
    document.getElementById(modes[i]).addEventListener("click", function(){overlay_page(modes[i])});  
}

//---functions---
function use_localstorage() {
    let mode = localStorage.getItem("menu");
    if(mode != null){
        overlay_page(mode);
    }
    else{
        overlay_page(mainpage);
    }
    document.getElementById("sessions").innerHTML = localStorage.getItem("sessions");//to fix
}

function overlay_page(mode){
    let index = []; let j = 0;
    for(let i= 0; i< modes.length; i++){
        if(modes[i] != mode){
            index[j] = i; j++ 
        }
    }
    document.getElementById(mode +"_overlay").style.display = "block";
    for(let i = 0; i < index.length; i++){
        document.getElementById(modes[index[i]] +"_overlay").style.display = "none";
    }
    localStorage.setItem("menu", mode)
}

function restart() {
    localStorage.removeItem("menu");
    localStorage.removeItem("sessions");
    document.getElementById("sessions").innerHTML = " ";
    overlay_page(mainpage);
}

function set_clock() {
    setInterval(function () {
        document.getElementById("time").innerHTML = unix_to_time((Date.now() / 1000).toFixed(0), "clock");
    }, 10);;

    setInterval(function () {
        document.getElementById("date").innerHTML = unix_to_date((Date.now() / 1000).toFixed(0));
    }, 10);;
}

function unix_to_date(timestamp) {
    const n = new Date(timestamp * 1000); // convert sec to ms
    return (String(n.getDate()).padStart(2, "0")) + "." + (String(n.getMonth() + 1).padStart(2, "0")) + "." + (String(n.getFullYear()));
}

function unix_to_time(timestamp, mode) {
    if (mode === "clock") {
        const n = new Date(timestamp * 1000); // convert seconds → ms
        return (String(n.getHours()).padStart(2, "0")) + ":" + (String(n.getMinutes()).padStart(2, "0")) + ":" + (String(n.getSeconds()).padStart(2, "0"));
    }
    else {
        const totalSeconds = Math.floor(timestamp);
        return (String(Math.floor(totalSeconds / 3600)).padStart(2, "0")) + ":" + (String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0")) + ":" + (String(totalSeconds % 60).padStart(2, "0"));
    }
}

function time_to_unix(hours, minutes, seconds) {
    return (hours * 3600000) + (minutes * 60000) + (seconds * 1000); //conversion into ms
}

function start_pause_stopwatch() {
    const startPause = document.getElementById("startPauseStopwatch").innerHTML;
    if (startPause === "Start") {
        const startTime = Date.now();
        stopwatch_id = setInterval(function () {
            elapsedTime = (Date.now() - (startTime));
            document.getElementById("clockStopwatch").innerHTML = unix_to_time((elapsedTime / 1000).toFixed(0));
        }, 100);
        document.getElementById("startPauseStopwatch").innerHTML = "Pause";

    }
    else if (startPause === "Pause") {
        clearInterval(stopwatch_id);
        document.getElementById("startPauseStopwatch").innerHTML = "Continue";
    }
    else if (startPause === "Continue") {
        const startTime = Date.now() - elapsedTime;
        stopwatch_id = setInterval(function () {
            elapsedTime = (Date.now() - (startTime));
            document.getElementById("clockStopwatch").innerHTML = unix_to_time((elapsedTime / 1000).toFixed(0));
        }, 100);
            document.getElementById("startPauseStopwatch").innerHTML = "Pause";
    }
}

function start_pause_timer() {

        if (
            ((document.getElementById("hourTimer").value === "") && (document.getElementById("minuteTimer").value === "") && (document.getElementById("secondTimer").value === ""))
            || ((document.getElementById("hourTimer").value == "0") && (document.getElementById("minuteTimer").value == "0") && (document.getElementById("secondTimer").value == "0"))
        ) { }
        else {
            //get value from input as integeres when NaN then queal to 0
            const hours = parseInt(document.getElementById("hourTimer").value) || 0;
            const minutes = parseInt(document.getElementById("minuteTimer").value) || 0;
            const seconds = parseInt(document.getElementById("secondTimer").value) || 0;

            duration = time_to_unix(hours, minutes, seconds);

            const startPause = document.getElementById("startPauseTimer").innerHTML;
            if (startPause === "Start") {
                //clear user input
                document.getElementById("hourTimer").value = "";
                document.getElementById("minuteTimer").value = "";
                document.getElementById("secondTimer").value = "";
                const targetTime = Date.now() + duration;
                timer_id = setInterval(function () {
                    remainingTime = (targetTime) - Date.now();
                    document.getElementById("clockTimer").innerHTML = unix_to_time((remainingTime / 1000).toFixed(0));
                }, 100);
                document.getElementById("startPauseTimer").innerHTML = "Pause";
            }

            else if (startPause === "Pause") {
                clearInterval(timer_id);
                document.getElementById("startPauseTimer").innerHTML = "Continue";
            }

            else if (startPause === "Continue") {
                const targetTime = remainingTime + Date.now();
                timer_id = setInterval(function () {
                    remainingTime = (targetTime) - Date.now();
                    document.getElementById("clockTimer").innerHTML = unix_to_time((remainingTime / 1000).toFixed(0));
                }, 100);
                document.getElementById("startPauseTimer").innerHTML = "Pause";
            }

        }
}

function reset(mode) {
    clearInterval(intervals[mode]);
    document.getElementById("clock_" + mode).innerHTML = "00:00:00";
    document.getElementById("startPauseStopwatch").innerHTML = "Start"

    if (mode === "stopwatch") {
        
        
        
    }
    else if (mode === "timer") {
        clearInterval(timer_id);
        document.getElementById("clockTimer").innerHTML = "00:00:00";
        document.getElementById("startPauseTimer").innerHTML = "Start"
    }
}

function save(mode) {
    const list = document.getElementById("sessions");
    const newItem = document.createElement("li");

    if (mode === "timer") {
        newItem.textContent = unix_to_time((duration / 1000) || 0);
        list.appendChild(newItem);
    }
    else if (mode === "stopwatch") {
        reset(mode);
        newItem.textContent = unix_to_time(elapsedTime / 1000);
        list.appendChild(newItem);
    }

    localStorage.setItem("sessions", list)
}