import { State } from '../renderer/src/state'
import puppeteer from 'puppeteer-core'

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export async function communicate(puppeteer, state: State) {

}

const getResponse = async (page) => {
  const result: any[] = []

  await page.setRequestInterception(true)

  page.on('request', (request) => {

  })

}

export async function elementHasClass(element, className) {
  const class_str = await element.getAttribute('class')
  return class_str.includes(className)
}
