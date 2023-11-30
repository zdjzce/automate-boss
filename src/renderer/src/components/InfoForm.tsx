import { Button, Card, Input } from 'ant-design-vue'
import { defineComponent, computed } from 'vue'

// *  设置打招呼语
// *  添加忽略职位关键字
// *  设置薪资范围
// *  添加定时任务(支持多范围时间段, 例如 9:00-10:00, 14:00-15:00, 加号新增)

const InfoForm = defineComponent({
  name: 'InfoForm',
  setup(props, { slots }) {
    const btnClick = async () => {
      await window.electron.ipcRenderer.invoke('createNewWindow')
    }
    return () => (
      <Card bordered={false} class="flex flex-wrap text-center w-[100%]">
        <div class="flex flex-wrap mb-[12px] items-center">
          <p class="mb-[3px]">打招呼语:</p>
          <Input class="w-[100%]" />
        </div>

        <div class="flex flex-wrap mb-[12px] items-center">
          <p class="mb-[3px]">忽略职位关键字:</p>
          <Input class="w-[100%]" />
        </div>

        <div class="flex flex-wrap mb-[12px] items-center">
          <p class="mb-[3px]">薪资范围:</p>
          <Input class="w-[100%]" />
        </div>

        <div class="flex flex-wrap mb-[12px] items-center">
          <p class="mb-[3px]">定时任务(多范围时间段, 例 9:00-10:00, 14:00-15:00, 加号新增):</p>
          <Input class="w-[100%]" />
        </div>

        <Button type="primary" class="w-[100px]" onClick={btnClick}>
          启动
        </Button>
      </Card>
    )
  }
})
export default InfoForm
