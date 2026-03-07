//---main---
const modes = ["clock", "timer", "stopwatch"];
const btn_states = [0, 1, 2]; //0 = start, 1 = pause, 2 = continue
const main_page = modes[0];
const state = { 
    stopwatch:{interval: null, btn_state: btn_states[0]}, 
    timer: {interval: null, btn_state: btn_states[0]}
}
let elapsed_time;
let remaining_time;
let duration;
use_local_storage();
set_clock();

//---EventListeners---
for (let i = 0; i < modes.length; i++) {
    document.getElementById(modes[i]).addEventListener("click", function () { overlay_page(modes[i]) });
}

//---functions---
function use_local_storage() {
    let state = localStorage.getItem("menu");
    if (state != null) { overlay_page(state); }
    else { overlay_page(main_page); }
    document.getElementById("sessions").innerHTML = localStorage.getItem("sessions");
}

function overlay_page(state) {
    let index = [];
    let j = 0;
    for (let i = 0; i < modes.length; i++) {
        if (modes[i] != state) { index[j] = i; j++ }
    }
    document.getElementById(state + "_overlay").style.display = "block";
    for (let i = 0; i < index.length; i++) {
        document.getElementById(modes[index[i]] + "_overlay").style.display = "none";
    }
    localStorage.setItem("menu", state)
}

function restart() {
    localStorage.removeItem("menu");
    localStorage.removeItem("sessions");
    document.getElementById("sessions").innerHTML = " ";
    overlay_page(main_page);
}

function set_clock() {
    setInterval(function () {
        document.getElementById("time").innerHTML = unix_to_time((Date.now() / 1000).toFixed(0), "clock");
    }, 1000);
    setInterval(function () {
        document.getElementById("date").innerHTML = unix_to_date((Date.now() / 1000).toFixed(0));
    }, 1000);
}

function unix_to_date(timestamp) {
    const n = new Date(timestamp * 1000);
    return (String(n.getDate()).padStart(2, "0") + "." + String(n.getMonth() + 1).padStart(2, "0") + "." + String(n.getFullYear()));
}

function unix_to_time(timestamp, state) {
    if (state === "clock") {
        const n = new Date(timestamp * 1000);
        return (String(n.getHours()).padStart(2, "0") + ":" + String(n.getMinutes()).padStart(2, "0") + ":" + String(n.getSeconds()).padStart(2, "0"));
    }
    else {
        const total_seconds = Math.floor(timestamp);
        return (String(Math.floor(total_seconds / 3600)).padStart(2, "0") + ":" + String(Math.floor((total_seconds % 3600) / 60)).padStart(2, "0") + ":" + String(total_seconds % 60).padStart(2, "0"));
    }
}

function time_to_unix(hours, minutes, seconds) {
    return (hours * 3600000) + (minutes * 60000) + (seconds * 1000);
}

function start_pause_stopwatch() {
    if (state.stopwatch.btn_state == 0) {
        const start_time = Date.now();
        stopwatch_id = setInterval(function () {
            elapsed_time = (Date.now() - start_time);
            document.getElementById("clock_stopwatch").innerHTML = unix_to_time((elapsed_time / 1000).toFixed(0));
        }, 100);
        document.getElementById("start_pause_stopwatch").innerHTML = "Pause";
    }
    else if (state.stopwatch.btn_state == 1) {
        clearInterval(stopwatch_id);
        document.getElementById("start_pause_stopwatch").innerHTML = "Continue";
    }
    else if (state.stopwatch.btn_state == 2) {
        const start_time = Date.now() - elapsed_time;
        stopwatch_id = setInterval(function () {
            elapsed_time = (Date.now() - start_time);
            document.getElementById("clock_stopwatch").innerHTML = unix_to_time((elapsed_time / 1000).toFixed(0));
        }, 100);
        document.getElementById("start_pause_stopwatch").innerHTML = "Pause";
    }
}

function start_pause_timer() {
    if (((document.getElementById("hour_timer").value === "") && (document.getElementById("minute_timer").value === "") && (document.getElementById("second_timer").value === "")) || ((document.getElementById("hour_timer").value == "0") && (document.getElementById("minute_timer").value == "0") && (document.getElementById("second_timer").value == "0"))) { }
    else {
        const hours = parseInt(document.getElementById("hour_timer").value) || 0;
        const minutes = parseInt(document.getElementById("minute_timer").value) || 0;
        const seconds = parseInt(document.getElementById("second_timer").value) || 0;
        duration = time_to_unix(hours, minutes, seconds);
        if (state.timer.btn_state == 0) {
            document.getElementById("hour_timer").value = "";
            document.getElementById("minute_timer").value = "";
            document.getElementById("second_timer").value = "";
            const target_time = Date.now() + duration;
            timer_id = setInterval(function () {
                remaining_time = target_time - Date.now();
                document.getElementById("clock_timer").innerHTML = unix_to_time((remaining_time / 1000).toFixed(0));
            }, 100);
            document.getElementById("start_pause_timer").innerHTML = "Pause";
        }
        else if (state.timer.btn_state == 1) {
            clearInterval(timer_id);
            document.getElementById("start_pause_timer").innerHTML = "Continue";
        }
        else if (state.timer.btn_state == 2) {
            const target_time = remaining_time + Date.now();
            timer_id = setInterval(function () {
                remaining_time = target_time - Date.now();
                document.getElementById("clock_timer").innerHTML = unix_to_time((remaining_time / 1000).toFixed(0));
            }, 100);
            document.getElementById("start_pause_timer").innerHTML = "Pause";
        }
    }
}

function reset(state) {
    clearInterval(state[state]);
    document.getElementById("clock_" + state).innerHTML = "00:00:00";
    document.getElementById("start_pause_stopwatch").innerHTML = "Start";
    if (state === "stopwatch") {
    }
    else if (state === "timer") {
        clearInterval(timer_id);
        document.getElementById("clock_timer").innerHTML = "00:00:00";
        document.getElementById("start_pause_timer").innerHTML = "Start"
    }
}

function save(state) {
    const list = document.getElementById("sessions");
    const new_item = document.createElement("li");
    if (state === "timer") {
        new_item.textContent = unix_to_time((duration / 1000) || 0);
        list.appendChild(new_item);
    }
    else if (state === "stopwatch") {
        reset(state);
        new_item.textContent = unix_to_time(elapsed_time / 1000);
        list.appendChild(new_item);
    }
    localStorage.setItem("sessions", list.innerHTML)
}