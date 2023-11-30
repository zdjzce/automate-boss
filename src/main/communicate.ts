import { State } from '../renderer/src/state'
const webdriver = require('selenium-webdriver')
const puppeteer = require('puppeteer')
const request_client = require('request-promise-native')

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const By = webdriver.By
export async function communicate(driver, state: State) {
  const reconmmandJobs = await driver
    .findElement(By.xpath('/html/body/div[1]/div[1]/div[1]/div[3]/ul/li[2]/a'))
    .click()

  await sleep(1500)

  const excepetJob = await driver
    .findElement(By.xpath('//*[@id="wrap"]/div[2]/div[1]/div/div[1]/a[3]/span'))
    .click()

  // await scrollUlToEnd(driver, '//*[@id="wrap"]/div[2]/div[2]/div/div/div[1]/ul')
  await getResponse()
}

export async function scrollUlToEnd(driver, xpath: string) {
  let couldScroll = true
  while (couldScroll) {
    const element = await driver.findElement(By.xpath(xpath))
    await driver.executeScript('arguments[0].scrollIntoView(true);', element)
    await sleep(1500)

    const response = await getResponse()
    // for (const request of requests) {
    //   if (request.method === 'GET') {
    //     couldScroll = true
    //   }
    // }

    // if () {
    //   couldScroll = false
    // }
  }
}

const getResponse = async () => {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  const result: any[] = []

  await page.setRequestInterception(true)

  page.on('request', (request) => {
    request_client({
      uri: request.url(),
      resolveWithFullResponse: true
    })
      .then((response) => {
        const request_url = request.url()
        const request_headers = request.headers()
        const request_post_data = request.postData()
        const response_headers = response.headers
        const response_size = response_headers['content-length']
        const response_body = response.body

        result.push({
          request_url,
          request_headers,
          request_post_data,
          response_headers,
          response_size,
          response_body
        })

        console.log(result)
        request.continue()
      })
      .catch((error) => {
        console.error(error)
        request.abort()
      })
  })

  await browser.close()
}

export async function elementHasClass(element, className) {
  const class_str = await element.getAttribute('class')
  return class_str.includes(className)
}
