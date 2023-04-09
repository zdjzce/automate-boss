## 使用介绍
1. 克隆项目，安装依赖。
   需要的依赖：
   1. Python3：如果没有 Python3 请移步官网进行下载。版本为^3.11。https://www.python.org/downloads/
   2. Chrome 浏览器最新版：https://www.google.com/chrome/
   3. 装好 Python3 以及 Chrome 后在项目中运行如下命令：
   ```
    pip install poetry
    poetry install
   ```
2. 在 main.py 中把第15行代码进行注释，这是必要的，方法中使用的文件夹为登录状态后的文件夹。
   ```
   # options.add_argument(
   #  "user-data-dir=C:\\Program Files (x86)\\scoped_dir15408_969916617")
   ```
   在 main.py 中把第29行代码进行注释，否则会一直滑动到底部，登录不上账号。
   ```
   # time.sleep(2)
   ```
3. 运行 main.py
   ```
   poetry run python main.py
   ```
  在打开的BOSS直聘页面中进行登录。登录完毕以后请勿关闭浏览器窗口。 

4. 在浏览器中新建一个标签页，输入 chrome://version，打开页面后复制个人资料路径。  
   ![image text](https://raw.githubusercontent.com/zdjzce923/automate-boss/main/img-folder/info-dir.jpg)  

   将复制的路径黏贴到代码第十五行中的路径。把数字后面的路径都删除掉。  

   如图：![image text](https://raw.githubusercontent.com/zdjzce923/automate-boss/main/img-folder/delete.jpg)
   同时把注释关掉
   ```
   options.add_argument("user-data-dir=把复制的路径放在这里") 
   ```
   把 29 行 time.sleep 中注释也关掉。
5. 重新运行 poetry run python main.py。发现已经登录且页面开始自动滚动，即成功。
6. 运行后如果发现没有成功登录，请从第二步开始重新执行。