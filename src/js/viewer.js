const img = document.getElementById("img");

function setImages(path) {
	window.ctx.setImages(path);
}

async function getImage() {
	const path = await window.ctx.getImage();
	img.setAttribute("src", path);
}

async function nextImage() {
	const path = await window.ctx.nextImage();
	img.setAttribute("src", path);
}

async function prevImage() {
	const path = await window.ctx.prevImage();
	img.setAttribute("src", path);
}
