import { BrowserWindow, ipcMain } from 'electron'
import { communicate } from './communicate'
import { State } from '../renderer/src/state'
import puppeteer from 'puppeteer-core'
import path from 'path'
/* 切换为 puppeteer。
1. selenium 配合 node.js 没有简单的抓取网络请求的手段。 
2. chrome-driver 体积有点大。 
3. puppeteer 文档健全。
4. puppeteer 为 Google 官方出品，而 selenium 的 chromedriver 更新不及时，导致较新版本不可用。
*/
let userData = ''
export const getUserDirName = async (app) => {
  const appDataPath = app.getPath('appData')
  userData = path.join(appDataPath, 'Google/Chrome/Default')
  return path.join(appDataPath, 'Google/Chrome/Default')
}

let state: State
export const updateState = async (event, ...args) => {
  state = JSON.parse(args[args.length - 1])
}

export const createNewWindow = async (app: Electron.App, mainWindow: BrowserWindow) => {
  console.log('state:', state)
  const { executablePath } = state

  ;(async () => {
    try {
      const browser = await puppeteer.launch({
        executablePath: executablePath,
        userDataDir: userData,
        headless: false
      })

      const page = await browser.newPage()
      page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1
      })

      await page.goto('https://www.zhipin.com/web/geek/job-recommend?ka=header-job-recommend')
      await communicate(page, state, mainWindow)
    } catch (error) {
      mainWindow.webContents.send('Error', error)
      console.log('error', error)
    }
  })()
}

export const ipcEventHandle = {
  getUserDirName,
  createNewWindow,
  updateState
}
