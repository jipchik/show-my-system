const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronApi', {
    setTitle: (title) => ipcRenderer.send('set-title', title)
  // we can also expose variables, not just functions
})
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.versions[dependency])
    }

    const helloWorld = document.getElementById("hello");
    helloWorld.innerText = ping();
})