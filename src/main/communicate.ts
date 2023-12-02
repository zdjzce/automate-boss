import { ipcMain } from 'electron'
import { State } from '../renderer/src/state'
import { keysHash } from '../renderer/src/state/optionsData'
import puppeteer, { Page } from 'puppeteer-core'
import { setTimeout } from 'node:timers/promises'

export const communicate = async (page: Page, state: State) => {
  const isLogin = await checkLogin(page)

  if (!isLogin) {
    throw new Error('请先登录，然后关闭窗口重新点击启动！')
  }
  console.log('keysHash:', keysHash)

  await scrollJobList(page)
  await filterOptions(page, state)
  await startChat(page)
}

const scrollJobList = async (page: Page) => {
  const ele = await getXEle(page, '//*[@id="wrap"]/div[2]')

  await getResponse(page, '/recommend/job/list', async (res) => {
    const hasMore = JSON.parse(res).zpData.hasMore
    console.log('hasMore:', hasMore)
    if (hasMore) {
      await page.evaluate((scrollEle) => {
        // @ts-ignore
        scrollEle.scrollTop = scrollEle.scrollHeight
      }, ele)
    }
  })
}

// 筛选填入的选项
const filterOptions = async (page: Page, state: State) => {
  const ele = await page.$$('.condition-filter-select')

  for (const item of ele) {
    const subElement = await item.$('.current-select > .placeholder-text')
    const textValue = await page.evaluate((el) => el?.textContent, subElement)

    // 找到与选项标签相同的 item
    const findKeyForOptions = Object.keys(keysHash).filter((key) => keysHash[key] === textValue)[0]
    const itemFilterOptions = state[findKeyForOptions]

    if (!itemFilterOptions.length) continue
    console.log('itemFilterOptions:', itemFilterOptions)

    await subElement?.click()

    await setTimeout(1500)

    const optionsEle = await item?.$$('.filter-select-dropdown > ul > li')
    console.log('optionsEle:', optionsEle)

    for (let i = 0; i < optionsEle!.length; i++) {
      if (itemFilterOptions.includes(i)) {
        console.log('optionsEle[i]:', optionsEle![i])
        await optionsEle![i].click()
        await setTimeout(500)
      }
    }
  }
}

// 开始聊天
const startChat = async (page: Page) => {
  await setTimeout(3000)
  const li = await page.$$('.job-card-box')

  for (const item of li) {
    console.log('item:', item)
    await page.evaluate((liItem) => {
      liItem.click()
    }, item)

    const readMore = await getXEle(
      page,
      '//*[@id="wrap"]/div[2]/div[2]/div/div/div[2]/div/div[2]/a',
      3000
    )
    await page.evaluate((readEle) => {
      console.log('readEle:', readEle)
      readEle?.click()
    }, readMore)

    const newPagePromise = () =>
      new Promise<Page>((resolve) =>
        page.browser().once('targetcreated', (target) => resolve(target.page()))
      )
    const newPage = await newPagePromise()

    await newPageHandler(newPage)
    await page.bringToFront()
  }
}

// 岗位详情页逻辑
const newPageHandler = async (newPage: Page) => {
  const immediately = await getXEle(
    newPage,
    '//*[@id="main"]/div[1]/div/div/div[1]/div[3]/div[1]/a[2]',
    10000
  )
  await newPage.evaluate((ele) => {
    ele.click()
  }, immediately)

  const continueEle = await getXEle(newPage, '/html/body/div[11]/div[2]/div[3]/div/span[1]')
  if (continueEle) {
    await newPage.evaluate((ele) => {
      ele.click()
    }, continueEle)
  }

  await setTimeout(2000)
  await newPage.close()
}

const checkLogin = async (page: Page) => {
  // check __zp_stoken__
  const cookies = await page.cookies()
  if (!cookies.length || !cookies.find((item) => item.name === 'geek_zp_token')) return false

  return true
}

const getResponse = async (page: Page, url, cb: (data: any) => void) => {
  page.on('response', async (response) => {
    if (response.url().includes(url)) {
      const data = await response.text()
      cb(data)
    }
  })
}

export async function elementHasClass(element, className) {
  const class_str = await element.getAttribute('class')
  return class_str.includes(className)
}

const getXEle = async (page: Page, xpath: string, timeOut?: number, handler?: () => void) => {
  const ele = await page.waitForXPath(xpath, { timeout: timeOut || 1000 })
  return ele
}
