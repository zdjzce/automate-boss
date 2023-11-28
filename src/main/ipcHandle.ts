import require from 'requirejs'
import { app } from 'electron'

const path = require('path')
const webdriver = require('selenium-webdriver')
const { Builder } = require('selenium-webdriver')
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

  const serviceBuilder = new chrome.ServiceBuilder(
    path.join(
      process.resourcesPath,
      // app.getAppPath(),
      'app.asar.unpacked',
      'node_modules',
      'electron-chromedriver',
      'bin',
      'chromedriver'
    )
  )
  console.log('serviceBuilder:', serviceBuilder)
  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(chromeOptions)
    .setChromeService(serviceBuilder)
    .build()

  driver.get('https://www.zhipin.com/beijing/')
  driver.manage().window().setRect({ width: 445, height: 1000 })

  communicate(driver)
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function communicate(driver) {
  const read_more = await driver.findElement(By.xpath('//*[@id="main"]/div[3]/div[2]/div'))
  while (!(await elementHasClass(read_more, 'disabled'))) {
    await driver.executeScript('window.scrollTo(0, document.body.scrollHeight)')
    await sleep(4000)
  }

  await sleep(4000)
  const jd_list = await driver.findElement(By.xpath('//*[@id="main"]/div[3]/div[2]/ul'))
  const jd_list_items = await jd_list.findElements(By.tagName('li'))
  for (const item of jd_list_items) {
    const titleText = await item.findElement(By.className('title-text')).getAttribute('innerText')
    const workSpace = await item.findElement(By.className('workplace')).getAttribute('innerText')
    const salary = await item.findElement(By.className('salary')).getAttribute('innerText')
    const salarySlice = salary.slice(0, 2)

    const notBeijing = !workSpace.includes('北京')
    const noWeb = !titleText.includes('web')
    const noFront = !titleText.includes('前端')
    const hasReact = titleText.includes('react')
    const hasReact2 = titleText.includes('React')
    const matchSalary =
      salarySlice.endsWith('-') || parseInt(salarySlice) <= 10 || parseInt(salarySlice) >= 20
    if ((noWeb && noFront) || hasReact || hasReact2 || notBeijing || matchSalary) {
      console.log('matchSalary not--', item)
      continue
    }

    const link_href = await item.findElement(By.tagName('a')).getAttribute('href')
    await driver.executeScript(`window.open("${link_href}","_blank");`)

    const win_handle = await driver.getAllWindowHandles()
    await driver.switchTo().window(win_handle[1])

    await sleep(10000)
    try {
      await driver.findElement(By.xpath('//*[@id="main"]/div[3]/div[2]/a')).click()
    } catch (error) {
      await sleep(8000)
      await driver.findElement(By.xpath('//*[@id="main"]/div[3]/div[2]/a')).click()
    }

    await driver
      .findElement(By.xpath('/html/body/div[1]/div[4]/input'))
      .sendKeys(
        '您好，我对JS，HTML，CSS较为擅长。熟悉Vue+TS、了解Vite，Vitest，小程序开发，对Node，Python有过实践，积极参与开源项目，想应聘前端开发岗位，可以沟通一下吗？'
      )
    await sleep(5000)
    await driver.findElement(By.xpath('/html/body/div[1]/div[4]/button')).click()
    await sleep(4000)
    await driver.close()
    await sleep(1000)
    await driver.switchTo().window(win_handle[0])
  }
}

async function elementHasClass(element, className) {
  const class_str = await element.getAttribute('class')
  return class_str.includes(className)
}

export const ipcEventHandle = {
  getUserDirName,
  createNewWindow
}
