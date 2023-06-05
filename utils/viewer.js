const fs = require("fs");
const nodePath = require("path");

let images = [];
let i = 0;

function readDir(path) {
	const files = fs.readdirSync(path);
	const paths = [];
	files.forEach((file) => {
		const joinedPath = nodePath.join(path, file);
		if (includes(joinedPath, [".jpg", ".png", ".jpeg", ".gif", ".webp"])) {
			paths.push(joinedPath);
		} else if (fs.statSync(joinedPath).isDirectory()) {
			paths.push(...readDir(joinedPath));
		}
	});
	return paths;
}

function includes(str, arr) {
	let status = false;
	arr.forEach((elem) => {
		if (str.includes(elem)) {
			status = true;
		}
	});
	return status;
}

function setImages(_, path) {
	images = readDir(path).sort(() => Math.random() - 0.5);
}

function getImage() {
	return images[i];
}

function nextImage() {
	if (i === images.length - 1) i = 0;
	else i += 1;
  return getImage()
}

function prevImage() {
	if (i === 0) i = images.length - 1;
	else i -= 1;
  return getImage()
}

module.exports = { setImages, getImage, nextImage, prevImage };
