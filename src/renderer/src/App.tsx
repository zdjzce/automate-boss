import { defineComponent, ref, onMounted } from 'vue'
import { contextBridge, ipcRenderer } from 'electron'

const App = defineComponent({
  name: 'App',
  setup(props, { slots }) {
    const btnClick = async () => {
      const response = await window.electron.ipcRenderer.invoke('getUserDirName')
      console.log('response:', response)
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
