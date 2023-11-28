import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}

ipcRenderer.invoke('getUserDirName').then((appDataPath) => {
  console.log('appDataPath:', appDataPath)
})

// ipcRenderer
//   .invoke('getUserDirName')
//   .then((appDataPath) => {
//     const options = new Chrome.Options()
//     console.log('options:', options)
//     return new Builder().usingServer('http://localhost:9515').forBrowser('chrome').build()
//   })
//   .then((drivers) => {
//     window.pollutingDriver = drivers
//   })
