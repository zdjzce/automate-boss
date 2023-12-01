import { app } from 'electron'
import { communicate } from './communicate'
import { State } from '../renderer/src/state'
import puppeteer from 'puppeteer-core';
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

export const createNewWindow = async () => {
  const exPath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  const browser = await puppeteer.launch({
    executablePath: exPath,
    userDataDir: userData,
    headless: false
  })

  const page = await browser.newPage();
  page.setViewport({
    width: 1280,
    height: 720,
    deviceScaleFactor: 0.5,
  })
  await page.goto('http://test.mihuashi.com/dashboard/projects')
  await setTimeout(() => { }, 1000)


  await page.waitForXPath('//*[@id="main-container"]/section/main/section/article/div/div[1]/section[2]/section[2]/a/button', { timeout: 1000 });

  const element = await page.waitForXPath('//*[@id="main-container"]/section/main/section/article/div/div[1]/section[2]/section[2]/a/button')
  element?.click()
  // await element[0].click()

  // communicate(1, state)

  page.on("response", async (response) => {

    if (response.url().includes("custom_shortcuts")) {
        console.log(await response.text());
    }

  })

}

export const ipcEventHandle = {
  getUserDirName,
  createNewWindow,
  updateState
}
