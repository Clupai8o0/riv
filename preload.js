const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("ctx", {
	getPaths: () => ipcRenderer.invoke("get-paths"),
	deletePath: (id) => ipcRenderer.send("delete-path", id),
	addPath: (path) => ipcRenderer.send("add-path", path),

	// Gotta set the images state and then get, next, prev
	setImages: (path) => ipcRenderer.send("set-images", path),
	getImage: () => ipcRenderer.invoke("get-image"),
	nextImage: () => ipcRenderer.invoke("next-image"),
	prevImage: () => ipcRenderer.invoke("prev-image"),
});
