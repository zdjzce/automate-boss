import require from 'requirejs'
import { app } from 'electron'
import { communicate } from './communicate'
import { State } from '../renderer/src/state'

const path = require('path')
const webdriver = require('selenium-webdriver')
const { Builder } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')

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

export const createNewWindow = async () => {
  console.log('state:', state)
  const chromeOptions = new chrome.Options()
  chromeOptions.addArguments([
    'detach',
    '--remote-debugging-port=9111',
    `user-data-dir=${userData}`
  ])

  const serviceBuilder = new chrome.ServiceBuilder(
    path.join(
      // process.resourcesPath,
      app.getAppPath(),
      // 'app.asar.unpacked',
      'node_modules',
      'electron-chromedriver',
      'bin',
      'chromedriver'
    )
  )
  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(chromeOptions)
    .setChromeService(serviceBuilder)
    .build()

  driver.get('https://www.zhipin.com/')
  driver.manage().window().setRect({ width: 1280, height: 720 })

  communicate(driver, state)
}

export const ipcEventHandle = {
  getUserDirName,
  createNewWindow,
  updateState
}
