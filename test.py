from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager

def run_webdriver():
    options = webdriver.ChromeOptions()
    options.add_experimental_option('detach', True)  #不自动关闭浏览器
    options.add_argument('--start-maximized') #浏览器窗口最大化
    driver = webdriver.Chrome(options=options)
    driver.get('https://www.baidu.com')

if __name__ == '__main__':
    run_webdriver()