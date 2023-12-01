import { Button, Card, Input, Select } from 'ant-design-vue'
import { defineComponent, onMounted, watch } from 'vue'
import { state } from '../state'
import FormItemContainer from './common/FormItemContainer'
// *  设置打招呼语
// *  添加忽略职位关键字
// *  设置求职类型
// *  设置薪资范围
// *  设置工作经验
// *  设置学历要求
// *  设置公司规模
// *  添加定时任务(支持多范围时间段, 例如 9:00-10:00, 14:00-15:00, 加号新增)

const InfoForm = defineComponent({
  name: 'InfoForm',
  setup(props, { slots }) {
    const btnClick = async () => {
      await window.electron.ipcRenderer.invoke('updateState', JSON.stringify(state))
      await window.electron.ipcRenderer.invoke('createNewWindow')
    }

    return () => (
      <Card bordered={false} class="flex flex-wrap text-center w-[100%]">

        <FormItemContainer title="输入您的 Chrome 路径(如何查看：打开 Chrome，URL 输入 chrome://version，复制可执行文件路径后面的链接)">
          <Input class="w-[100%]" v-model:value={state.greeting} placeholder={'黏贴您的 Chrome 路径'} />
        </FormItemContainer>

        <FormItemContainer title="打招呼语">
          <Input class="w-[100%]" v-model:value={state.greeting} />
        </FormItemContainer>


        <div class="flex flex-wrap mb-[14px] items-center">
          <p class="mb-[6px]">忽略职位关键字:</p>
          <Input class="w-[100%]" v-model:value={state.ignoreJobKeyword} />
        </div>

        <div class="flex flex-wrap mb-[14px] items-center">
          <p class="mb-[6px]">求职类型:</p>
          <Select class="w-[100%]" />
        </div>

        <div class="flex flex-wrap mb-[14px] items-center">
          <p class="mb-[6px]">薪资范围:</p>
          <Select class="w-[100%]" />
        </div>

        <div class="flex flex-wrap mb-[14px] items-center">
          <p class="mb-[6px]">工作经验:</p>
          <Select class="w-[100%]" />
        </div>

        <div class="flex flex-wrap mb-[14px] items-center">
          <p class="mb-[6px]">学历要求:</p>
          <Select class="w-[100%]" />
        </div>

        <div class="flex flex-wrap mb-[14px] items-center">
          <p class="mb-[6px]">公司规模:</p>
          <Select class="w-[100%]" />
        </div>

        {/* <div class="flex flex-wrap mb-[14px] items-center">
          <p class="mb-[6px]">定时任务(多范围时间段, 例 9:00-10:00, 14:00-15:00, 加号新增):</p>
          <TimesRangePicker></TimesRangePicker>
        </div>
 */}
        <Button type="primary" class="w-[100px] text-[16px]" onClick={btnClick}>
          启动
        </Button>
      </Card>
    )
  }
})
export default InfoForm
