import { Button, Card, Form, FormItem, Input } from 'ant-design-vue'
import { defineComponent, ref, onMounted } from 'vue'
import InfoCount from './InfoCount'
import InfoError from './InfoError'
import InfoForm from './InfoForm'
import { state } from '../state'
// TODO
/**
 *  提示语：需要 chrome 116 及之前的版本, 且关闭 chrome 自动更新，详细请看
 *  显示投递次数图表与回复率图表 (优先级最低，略微麻烦)
 */

const InfoMain = defineComponent({
  setup(props, { slots }) {
    const ipc = window.electron.ipcRenderer
    const onStart = async () => {
      await ipc.invoke('updateState', JSON.stringify(state))
      await ipc.invoke('createNewWindow')
    }

    onMounted(() => {
      onError()
    })

    const errorData = ref('')
    const onError = () => {
      ipc.on('Error', (event, ...args) => {
        console.log('args====:', args)
        errorData.value = args[0].message
      })
    }

    return () => (
      <div>
        <Card class="font-bold !mb-[12px]">
          注意: 必填 Chrome 程序路径
          <a href="" class="text-[#8B5CB7] border-b-[3px] border-indigo ml-[3px]" style="word-break: break-all;">
            打开 Chrome，URL 输入 chrome://version，复制可执行文件路径后面的链接。
          </a>
          首次启动需要登录账号，关闭后再启动即可
        </Card>

        <InfoCount></InfoCount>
        <InfoForm onStart={onStart}></InfoForm>
        <InfoError errorData={errorData.value}></InfoError>
      </div>
    )
  }
})
export default InfoMain
