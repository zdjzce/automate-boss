from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager


def get_options():
    options = webdriver.ChromeOptions()
    options.add_experimental_option('detach', True)  # 不自动关闭浏览器
    options.add_experimental_option(
        'mobileEmulation', {'deviceName': 'iPhone XR'})
    options.add_argument('--start-maximized')  # 浏览器窗口最大化
    return options


def run_webdriver():
    driver = webdriver.Chrome(chrome_options=get_options())
    driver.set_window_size(414, 896)
    driver.get('https://www.baidu.com')


if __name__ == '__main__':
    run_webdriver()
