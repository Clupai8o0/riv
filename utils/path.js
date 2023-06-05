const fs = require("fs");
const path = require("path");
const { v4 } = require("uuid");

const dataPath = path.join(__dirname, "../data.json");
fs.open(dataPath, "r", function (fileExists) {
	if (fileExists) {
		fs.writeFile(
			dataPath,
			JSON.stringify({
				paths: [],
				favorites: [],
			}),
			(err) => {
				if (err) console.error(err);
			}
		);
	}
});

function getPaths() {
	const buffer = fs.readFileSync(dataPath);
	const data = JSON.parse(buffer.toString());
	return data.paths;
}

function deletePath(_, id) {
	const buffer = fs.readFileSync(dataPath);
	const data = JSON.parse(buffer.toString());
	return fs.writeFileSync(
		dataPath,
		JSON.stringify({ ...data, paths: data.paths.filter((p) => p.id !== id) })
	);
}

function addPath(_, path) {
	let status = true;
	try {
		fs.readdirSync(path);
	} catch (_) {
		status = false;
	}

	const buffer = fs.readFileSync(dataPath);
	const data = JSON.parse(buffer.toString());
	console.log(data);
	return fs.writeFileSync(
		dataPath,
		JSON.stringify({
			...data,
			paths: [
				...data.paths,
				{
					id: v4(),
					path,
					status,
				},
			],
		})
	);
}

function getFavorites() {
	const buffer = fs.readFileSync(dataPath);
	const data = JSON.parse(buffer.toString());
	return data.favorites;
}

function deleteFavorite(_, id) {
	const buffer = fs.readFileSync(dataPath);
	const data = JSON.parse(buffer.toString());
	return fs.writeFileSync(
		dataPath,
		JSON.stringify({
			...data,
			favorites: data.favorites.filter((p) => p.id !== id),
		})
	);
}

function addFavorite(_, path) {
	let status = true;
	try {
		fs.readFileSync(path);
	} catch (_) {
		status = false;
	}

	const buffer = fs.readFileSync(dataPath);
	const data = JSON.parse(buffer.toString());
	console.log(data);
	return fs.writeFileSync(
		dataPath,
		JSON.stringify({
			...data,
			favorites: [
				...data.favorites,
				{
					id: v4(),
					path,
					status,
				},
			],
		})
	);
}

module.exports = {
	getPaths,
	deletePath,
	addPath,
	getFavorites,
	deleteFavorite,
	addFavorite,
};
