from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
import time


def getOptions():
    options = webdriver.ChromeOptions()
    options.add_experimental_option('detach', True)  # 不自动关闭浏览器
    options.add_experimental_option(
        'mobileEmulation', {'deviceName': 'iPhone XR'})
    options.add_argument('--start-maximized')  # 浏览器窗口最大化
    return options


def runWebdriver():
    driver = webdriver.Chrome(chrome_options=getOptions())
    driver.set_window_size(414, 896)
    driver.implicitly_wait(4)
    driver.get('https://www.zhipin.com/beijing/')
    # initLogin(driver=driver)

# TODO login的滑块验证开发成本太高
def initLogin(driver):
    driver.find_element(
        By.XPATH, '//*[@id="wrap"]/div[1]/div[2]/a/div').click()
    time.sleep(3)

    driver.find_element(By.XPATH, '//*[@id="regVerrifyCode"]/div').click()
    time.sleep(5)

    driver.find_element(
        By.XPATH, '//*[@id="wrap"]/div[2]/div[3]/div[2]/div[1]/form/div[3]/span[2]/input').send_keys('13522142948')
    time.sleep(2)

    driver.find_element(By.XPATH, '//*[@id="wrap"]/div[2]/div[3]/div[2]/div[1]/form/div[5]/span/button').click()

    driver.find_element(By.XPATH, '//*[@id="wrap"]/div[2]/div[3]/div[2]/div[1]/form/div[7]/input').click()


if __name__ == '__main__':
    runWebdriver()
