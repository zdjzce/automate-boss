import { BrowserWindow } from 'electron'
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
        <button onClick={btnClick}>点击启动</button>
      </div>
    )
  }
})
export default App
