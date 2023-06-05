const img = document.getElementById("img");

const timer = document.getElementById("timer");
const radios = document.getElementsByClassName("radio");
const timerBtn = document.getElementById("timer-btn");
const timerDropdown = document.getElementById("timer-dropdown");

// timer controls
const controlBtn = document.getElementById("control-btn");
const controlImg = document.getElementById("control-img");
const resetBtn = document.getElementById("reset-btn");

function setImages(path) {
	window.ctx.setImages(path);
}

async function getImage() {
	const path = await window.ctx.getImage();
	img.setAttribute("src", path);
}

async function nextImage() {
	resetTimer();
	const path = await window.ctx.nextImage();
	img.setAttribute("src", path);
}

async function prevImage() {
	resetTimer();
	const path = await window.ctx.prevImage();
	img.setAttribute("src", path);
}

let time = 30,
	pause = true,
	start = 30,
	interval;

function setTime() {
	var date = new Date(0);
	date.setSeconds(time);
	timer.innerText = date.toISOString().substr(14, 5);
}

function startTimer() {
	controlImg.setAttribute("src", "assets/pause.svg");
	pause = false;
	interval = setInterval(() => {
		time -= 1;
		setTime();
		if (time <= 0) {
			clearInterval(interval);
			nextImage();
			resetTimer();
			startTimer();
		}
	}, 1000);
}
function pauseTimer() {
	controlImg.setAttribute("src", "assets/play.svg");
	pause = true;
	clearInterval(interval);
	setTime();
}

function resetTimer() {
	pauseTimer();
	time = start;
	setTime();
}

function toggleTimerDropdown() {
	if (timerDropdown.hidden) timerDropdown.hidden = false;
	else timerDropdown.hidden = true;
}
timerBtn.addEventListener("click", toggleTimerDropdown);

// Adding event listeners
// Radio time selectors
for (let i = 0; i < radios.length; i++) {
	radios[i].addEventListener("click", () => {
		time = radios[i].value;
		start = radios[i].value;
		pauseTimer();
		resetTimer();
		toggleTimerDropdown();
	});
}
// Pause and unpause
controlBtn.addEventListener("click", () => {
	// if it is paused, then resume it
	if (pause) {
		startTimer();
	} else {
		pauseTimer();
	}
});
// Reset
resetBtn.addEventListener("click", () => {
	pauseTimer();
	resetTimer();
});
