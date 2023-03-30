let viewPath = "";

const home = document.getElementById("home");
const viewer = document.getElementById("iv");

function openViewer(path) {
	home.classList.add("hidden");
	viewer.classList.remove("hidden");
	viewer.classList.add("flex");
	viewPath = path;
	setImages(path);
	getImage();
}

function closeViewer() {
	home.classList.remove("hidden");
	viewer.classList.remove("flex");
	viewer.classList.add("hidden");
	viewPath = "";
}
