import { ipcMain } from 'electron'
import { State } from '../renderer/src/state'
import puppeteer, { Page } from 'puppeteer-core'

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const communicate = async (page: Page, state: State) => {
  const isLogin = await checkLogin(page)

  if (!isLogin) {
    throw new Error('请先登录，然后关闭窗口重新点击启动！')
  }


  await getResponse(page, 'custom_shortcuts')
}

const getXEle = async (page: Page, xpath: string, timeOut?: number, handler?: () => void) => {
  
  const ele = await page.waitForXPath(xpath, { timeout: timeOut || 1000 })
  return ele
}

const checkLogin = async (page: Page) => {
  // check __zp_stoken__
  const cookies = await page.cookies()
  if (!cookies.length || !cookies.find((item) => item.name === 'geek_zp_token')) return false

  return true
}

const getResponse = async (page: Page, url) => {
  page.on('response', async (response) => {
    if (response.url().includes(url)) {
      console.log(await response.text())
    }
  })
}

export async function elementHasClass(element, className) {
  const class_str = await element.getAttribute('class')
  return class_str.includes(className)
}
