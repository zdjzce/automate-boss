import { defineComponent, ref, onMounted, onBeforeMount } from 'vue'

const App = defineComponent({
  name: 'App',
  setup(props, { slots }) {
    const btnClick = async () => {
      const response = await window.electron.ipcRenderer.invoke('getUserDirName')
      const response2 = await window.electron.ipcRenderer.invoke('createNewWindow')
    }

    return () => (
      <div>
        设置打招呼语
        <input type="text" />
        {/* TODO 添加注意事项 1. 需要 chrome16 且关闭 chrome 自动更新，详细请看 2. 需要完善在线简历否则会终止脚本 */}
        {/* TODO 添加职位偏好(设置后将自动检索岗位，但可能会重复投递，建议留空不填) */}
        {/* TODO 添加忽略职位关键字 */}
        {/* TODO 设置薪资范围 */}
        {/* TODO 添加定时任务 */}
        <button onClick={btnClick}>点击启动</button>
      </div>
    )
  }
})
export default App
