const { app, BrowserWindow, ipcMain, Menu } = require("electron");
require("electron-reload")(__dirname);
const path = require("path");

const { getPaths, deletePath, addPath } = require("./utils/path");
const { getImage, nextImage, prevImage, setImages } = require("./utils/viewer");

Menu.setApplicationMenu(null)

const createWindow = () => {
	const win = new BrowserWindow({
		width: 600,
		height: 600,
		minHeight: 600,
		minWidth: 400,
		icon: path.join(__dirname, "src/assets/r-2.ico"),
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
			nodeIntegration: true,
		},
	});

	win.loadFile("src/index.html");
};

app.whenReady().then(() => {
	createWindow();

	ipcMain.handle("get-paths", getPaths);
	ipcMain.handle("get-image", getImage)
	ipcMain.handle("next-image", nextImage)
	ipcMain.handle("prev-image", prevImage);

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

ipcMain.on("delete-path", deletePath);
ipcMain.on("add-path", addPath);
ipcMain.on("set-images", setImages)
