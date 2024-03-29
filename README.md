## 项目介绍
Boss 直聘快速打招呼，可筛选条件。此脚本已迁移至 Electron + Puppeteer 客户端，目前经简单的测试，**windows 与 mac 皆可用**
![image text](https://raw.githubusercontent.com/zdjzce923/automate-boss/main/img-folder/automate.gif)
### 功能：
1. **支持未读消息数、今日已投递数量统计。**
2. **支持忽略职位关键字、筛选求职类型、薪资待遇、工作经验、学历、公司规模**
3. 点击启动将打开 chrome ，登录后重新启动软件再次运行即可进行自动投递

### 注意：
1. 从 Releases 中根据系统下载安装包，目前有 Windows 与 Mac
3.  一定要输入 Chrome 程序路径。方法：打开你的 Chrome，然后在地址栏输入 **chrome://version**，然后复制红框中的路径填入文本框即可。
   ![image text](https://raw.githubusercontent.com/zdjzce923/automate-boss/main/img-folder/path.jpg)

4. 不建议筛选太多选项, 否则容易返回一样的岗位列表（不过会对已经沟通过的岗位进行过滤）

5. 忽略的岗位多个需要用英文逗号分隔。

6. 薪资待遇选项填入后，在 boss 中会直接进行薪资待遇的筛选，投递的岗位完全是按照岗位列表中的 item 进行投递，所以返回的 item 如果有超出预期或低于预期薪资的情况也会投递。


### 如果遇到了停止的状况
1. mac：如果是登录后再次启动，发现没有进行操作，建议关闭 chrome 的浏览器测试进程（调度中心可能开启了多个 chrome 关掉后面那个）
2. 登录完毕后再次启动如果发现有安全提醒的弹框，需要设置完安全问题，再次启动。


### TODO
1. 设置多时间段间隔投递
2. 岗位投递上限后停止投递
3. 看板增加近七日、近三十日沟通次数
4. 筛选增加指定岗位投递（目前是按照推荐岗位进行投递）