import { BrowserWindow } from 'electron'
import path from 'path'
import webdriver from 'selenium-webdriver'
import { Builder } from 'selenium-webdriver'
import Chrome from 'selenium-webdriver/chrome'

export const getUserDirName = async (app) => {
  const appDataPath = app.getPath('appData')

  return path.join(appDataPath, 'Google/Chrome/Default')
}

export const createNewWindow = async () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadURL('https://www.zhipin.com/')

  // 设置手机模式
  const driver = await new Builder().forBrowser('chrome').build()

  // options.setUserAgent(
  //   'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1'
  // )

  // const driver = new Builder().forBrowser('chrome').setChromeOptions(options).build()
  await driver.get(win.webContents.getURL())
}

export const ipcEventHandle = {
  getUserDirName,
  createNewWindow
}
