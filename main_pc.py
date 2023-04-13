from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.support.ui import WebDriverWait


def get_options():
    options = webdriver.ChromeOptions()
    options.add_experimental_option('detach', True)  # 不自动关闭浏览器
    options.add_argument(
        "user-data-dir=C:\Program Files (x86)\scoped_dir14532_2004228020")

    options.add_argument("--remote-debugging-port=9104")
    return options


def communicate(driver):
    job_list = driver.find_element(
        By.XPATH, '//*[@id="container"]/div[1]/div/div[3]/div/ul').find_elements(By.CLASS_NAME, "job-card-wrapper")
    print('job_list', job_list)
    for job in job_list:
        url = job.find_element(
            By.CLASS_NAME, 'job-card-body').find_element(By.TAG_NAME, 'a').get_attribute('href')

        job_name = job.find_element(
            By.XPATH, '//*[@id="container"]/div[1]/div/div[3]/div/ul/li[1]/div[1]/a/div[1]/span[1]').get_attribute('innerText')
        if not ('前端' or 'web') in job_name:
            continue
        driver.execute_script('window.open("{}","_blank");'.format(url))
        win_handle = driver.window_handles
        driver.switch_to.window(win_handle[1])

        time.sleep(6)

        communicate_btn = driver.find_element(
            By.XPATH, '//*[@id="main"]/div[1]/div/div/div[1]/div[3]/div[1]/a[2]')

        if communicate_btn.get_attribute('innerText') == '立即沟通':
            print('xxxxxxxxxxxxxxx')
            communicate_btn.click()

            time.sleep(6)
            try:
                driver.find_element(
                    By.XPATH, '/html/body/div[11]/div[2]/div[2]/div/div[1]/div[2]/textarea').send_keys(
                    '您好，我对JS，HTML，CSS较为擅长。熟悉Vue+TS、了解Vite，Vitest，小程序开发，对Node，Python有过实践，积极参与开源项目，想应聘前端开发岗位，可以沟通一下吗？')
                time.sleep(1)
                driver.find_element(By.XPATH, '/html/body/div[11]/div[2]/div[2]/div/div[1]/div[2]/div').click()

            except:
                driver.find_element(
                    By.XPATH, '//*[@id="container"]/div/div/div[1]/div[2]/div[2]/div/ul/li[1]').click()
                time.sleep(4)
                driver.find_element(By.XPATH, '//*[@id="container"]/div/div/div[2]/div[3]/div/div[2]').send_keys(
                    '您好，我对JS，HTML，CSS较为擅长。熟悉Vue+TS、了解Vite，Vitest，小程序开发，对Node，Python有过实践，积极参与开源项目，想应聘前端开发岗位，可以沟通一下吗？')
                time.sleep(4)
                driver.find_element(
                    By.XPATH, '//*[@id="container"]/div/div/div[2]/div[3]/div/div[3]/button').click()

        time.sleep(4)
        driver.close()
        time.sleep(2)
        driver.switch_to.window(win_handle[0])

    driver.find_element(
        By.XPATH, '//*[@id="container"]/div[1]/div/div[3]/div/div/div/div/a[10]').click()
    time.sleep(6)
    communicate(driver)


def elementHasClass(element, active):
    class_str = element.get_attribute('class')
    return active in class_str


def create_driver():
    driver = webdriver.Chrome(chrome_options=get_options())
    driver.set_window_size(1000, 1100)
    driver.implicitly_wait(2)
    time.sleep(2)
    driver.get('https://www.zhipin.com/web/geek/recommend?sortType=2')
    time.sleep(15)
    communicate(driver=driver)
    return driver


if __name__ == '__main__':
    create_driver()
