from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.support.ui import WebDriverWait


def get_options():
    options = webdriver.ChromeOptions()
    options.add_experimental_option('detach', True)  # 不自动关闭浏览器
    options.add_experimental_option(
        'mobileEmulation', {'deviceName': 'iPhone XR'})
    # 设置 user-data-dir chrome会加载此配置 里面包含了用户的 cookie
    # 如果自定义的user-data-dir文件夹 登录获取验证会失败 暂时使用第一次启动的文件夹 通过 chrome://version 查看目录 保持登录状态
    options.add_argument(
        "user-data-dir=/private/var/folders/jz/hpmf14910h5d7sxh_3v42rxm0000gn/T/.com.google.Chrome.NPxjC5")
    # 获取本地提前启动好的chrome调试服务，之后打开同一个实例，否则每次打开都是新的
    options.add_argument("--remote-debugging-port=9111")
    return options


# TODO login的滑块验证开发成本太高

def communicate(driver):

    read_more = driver.find_element(
        By.XPATH, '//*[@id="main"]/div[3]/div[2]/div')
    while not elementHasClass(read_more, 'disabled'):
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight)")
        time.sleep(4)

    time.sleep(4)
    jd_list = driver.find_element(
        By.XPATH, '//*[@id="main"]/div[3]/div[2]/ul')
    jd_list_items = jd_list.find_elements(By.TAG_NAME, "li")
    for item in jd_list_items:
        titleText = item.find_element(
            By.CLASS_NAME, "title-text").get_attribute('innerText')
        
        workSpace = item.find_element(By.CLASS_NAME, "workplace").get_attribute('innerText')

        salary = item.find_element(By.CLASS_NAME, "salary").get_attribute('innerText')
        salarySlice = salary[0:2]

        notBeijing = not '北京' in workSpace
        noWeb = not 'web' in titleText
        noFront = not '前端' in titleText
        hasReact = 'react' in titleText
        hasReact2 = 'React' in titleText
        matchSalary = salarySlice[-1] == '-' or int(salarySlice) <= 10 or int(salarySlice) >= 20
        if (noWeb and noFront) or hasReact or hasReact2 or notBeijing or matchSalary:
        # if (noWeb and noFront) or notBeijing or matchSalary:
            print('matchSalary not--', item)
            continue

        link_href = item.find_element(By.TAG_NAME, "a").get_attribute('href')

        driver.execute_script('window.open("{}","_blank");'.format(link_href))

        # 聚焦当前 tab 否则找不到元素
        win_handle = driver.window_handles
        driver.switch_to.window(win_handle[1])

        # TODO 优化为dom加载完成
        """ wait_communicate = WebDriverWait(driver, 10).until(
            ec.visibility_of_element_located((By.XPATH, '//*[@id="main"]/div[3]/div[2]/a'))) """

        time.sleep(10)
        try:
            driver.find_element(
                By.XPATH, '//*[@id="main"]/div[3]/div[2]/a').click()
        except:
            time.sleep(8)
            driver.find_element(
                By.XPATH, '//*[@id="main"]/div[3]/div[2]/a').click()

        driver.find_element(By.XPATH, '/html/body/div[1]/div[4]/input').send_keys(
            '您好，我对JS，HTML，CSS较为擅长。熟悉Vue+TS、了解Vite，Vitest，小程序开发，对Node，Python有过实践，积极参与开源项目，想应聘前端开发岗位，可以沟通一下吗？')
        time.sleep(5)
        driver.find_element(
            By.XPATH, '/html/body/div[1]/div[4]/button').click()
        time.sleep(4)
        driver.close()
        time.sleep(1)
        driver.switch_to.window(win_handle[0])


def elementHasClass(element, active):
    class_str = element.get_attribute('class')
    return active in class_str


def create_driver():
    driver = webdriver.Chrome(chrome_options=get_options())
    driver.set_window_size(215, 1000)
    driver.implicitly_wait(2)
    time.sleep(2)
    driver.get('https://www.zhipin.com/beijing/')
    communicate(driver=driver)
    return driver


if __name__ == '__main__':
    create_driver()
