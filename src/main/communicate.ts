import { State } from '../renderer/src/state'
import puppeteer, { Page } from 'puppeteer-core'

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const communicate = async (page: Page, state: State) => {
  const ele = await getXEle(
    page,
    '//*[@id="main-container"]/section/main/section/article/div/div[1]/section[2]/section[2]/a/button'
  )
  await ele?.click()

  await getResponse(page, 'custom_shortcuts')
}

const getXEle = async (page: Page, xpath: string, timeOut?: number, handler?: () => void) => {
  const ele = await page.waitForXPath(xpath, { timeout: timeOut || 1000 })
  return ele
}

const getResponse = async (page, url) => {
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
