import { BrowserWindow } from 'electron'
import path from 'path'
import webdriver from 'selenium-webdriver'
import { Builder } from 'selenium-webdriver'
import require from 'requirejs'

const chrome = require('selenium-webdriver/chrome')
const By = webdriver.By

let userData = ''
export const getUserDirName = async (app) => {
  const appDataPath = app.getPath('appData')
  userData = path.join(appDataPath, 'Google/Chrome/Default')
  return path.join(appDataPath, 'Google/Chrome/Default')
}

export const createNewWindow = async () => {
  const chromeOptions = new chrome.Options()
  chromeOptions.addArguments([
    '--blink-settings=imagesEnabled=false',
    'detach',
    '--remote-debugging-port=9111',
    '--user-agent=Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
    `user-data-dir=${userData}`
  ])
  chromeOptions.setMobileEmulation({ deviceName: 'iPhone XR' })
  // chromeOptions.addArguments(
  //   'user-data-dir=/private/var/folders/jz/hpmf14910h5d7sxh_3v42rxm0000gn/T/.com.google.Chrome.NPxjC5'
  // )
  const driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build()

  driver.get('https://www.zhipin.com/beijing/')
  driver.manage().window().setRect({ width: 445, height: 1000 })

  const read_more = driver.findElement(By.xpath('//*[@id="main"]/div[3]/div[2]/div'))
  console.log('read_more:', read_more)
}

export const ipcEventHandle = {
  getUserDirName,
  createNewWindow
}
