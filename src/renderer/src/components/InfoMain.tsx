import { Button, Card, Form, FormItem, Input } from 'ant-design-vue'
import { defineComponent, ref, onMounted, Ref } from 'vue'
import InfoCount from './InfoCount'
import InfoError from './InfoError'
import InfoForm from './InfoForm'
import { state, stateForMain } from '../state'
import { keysHash, optionsData } from '@renderer/state/optionsData'
import { setCount } from '@renderer/state/local'
// TODO
/**
 *  显示投递次数图表与回复率图表 (优先级最低，略微麻烦)
 */

// TODO fix 投递上限时停止投递
const InfoMain = defineComponent({
  setup(props, { slots }) {
    const ipc = window.electron.ipcRenderer
    const onStart = async () => {
      console.log('state:', state)
      window.localStorage.setItem('state', JSON.stringify(state))
      stateMainReplace()
      await ipc.invoke('updateState', JSON.stringify(stateForMain))
      await ipc.invoke('createNewWindow')
    }

    const stateMainReplace = () => {
      Object.keys(stateForMain).forEach((key) => (stateForMain[key] = state[key]))

      const keys = Object.keys(keysHash)
      for (const key of keys) {
        if (stateForMain[key] instanceof Array) {
          stateForMain[key] = stateForMain[key]
            .map((item) => optionsData[key].indexOf(item))
            .filter((item) => item !== -1)
        } else {
          stateForMain[key] = [optionsData[key].indexOf(stateForMain[key])].filter(
            (item) => item !== -1
          )
        }
      }
    }

    onMounted(() => {
      onError()
      onCount()
      initState()
    })

    const hasInit = ref(false)
    const initState = () => {
      const stateStr = window.localStorage.getItem('state')
      count.value = window.localStorage.getItem('count') || 0
      if (stateStr) {
        const stateObj = JSON.parse(stateStr)
        Object.keys(stateObj).forEach((key) => {
          state[key] = stateObj[key]
        })
      }
      hasInit.value = true
    }

    const errorData = ref('')
    const onError = () => {
      ipc.on('Error', (event, ...args) => {
        errorData.value = args[0].message
      })
    }

    const count = ref(0) as Ref<number | string>
    const messageCount = ref(0) as Ref<number | string>
    const onCount = () => {
      ipc.on('Count', (event, ...args) => {
        const val = setCount()
        console.log('val:', val)
        count.value = val
      })

      ipc.on('MessageCount', (event, ...args) => {
        console.log('args:', args)
        messageCount.value = args[0] || 0
      })
    }

    return () => (
      <div>
        <Card class="font-bold !mb-[12px]">
          <div>注意: </div>
          <div>
            1. 必填 Chrome 程序路径
            <span
              class="text-[#8B5CB7] border-b-[3px] border-indigo ml-[3px] cursor-pointer"
              style="word-break: break-all;"
            >
              打开 Chrome，URL 输入 chrome://version，复制可执行文件路径后面的链接。
            </span>
          </div>
          <div>
            2. 首次启动需要登录账号，关闭后再启动即可(如果 mac 错误提示信息为Failed to launch the browser
            process!{' '}
            <span class="text-[#8B5CB7]  ml-[3px]" style="word-break: break-all;">
              那么需要完全关闭浏览器进程，或重启软件
            </span>
            )
          </div>
          <div>
            3. 不建议筛选太多选项
            <span class="text-[#8B5CB7]  ml-[3px]" style="word-break: break-all;">
              否则容易总是返回一样的岗位列表
            </span>
          </div>
        </Card>

        <InfoCount count={count.value} messageCount={messageCount.value}></InfoCount>
        {hasInit.value ? <InfoForm onStart={onStart}></InfoForm> : null}
        <InfoError errorData={errorData.value}></InfoError>
      </div>
    )
  }
})
export default InfoMain
