import { Button, Card, Input, Select, TimeRangePicker } from 'ant-design-vue'
import { defineComponent, computed, ref, reactive } from 'vue'
import { CloseCircleOutlined, PlusCircleOutlined } from '@ant-design/icons-vue'
import dayjs from 'dayjs'

// *  设置打招呼语
// *  添加忽略职位关键字
// *  设置薪资范围
// *  添加定时任务(支持多范围时间段, 例如 9:00-10:00, 14:00-15:00, 加号新增)

const InfoForm = defineComponent({
  name: 'InfoForm',
  setup(props, { slots }) {
    const timesRanges = ref([['', '']])
    const removeTimeRange = (index: number) => {
      debugger
      timesRanges.value.splice(index, 1)
    }
    const addTimeRange = () => timesRanges.value.push([])
    const formatTimeRange = (timeRange: string[] | null, index: number) => {
      timesRanges.value[index] = timeRange?.map((item) => dayjs(item).format('HH:mm')) || []
    }

    const btnClick = async () => {
      await window.electron.ipcRenderer.invoke('createNewWindow')
    }

    return () => (
      <Card bordered={false} class="flex flex-wrap text-center w-[100%]">
        <div class="flex flex-wrap mb-[14px] items-center">
          <p class="mb-[6px]">打招呼语:</p>
          <Input class="w-[100%]" />
        </div>

        <div class="flex flex-wrap mb-[14px] items-center">
          <p class="mb-[6px]">忽略职位关键字:</p>
          <Input class="w-[100%]" />
        </div>

        <div class="flex flex-wrap mb-[14px] items-center">
          <p class="mb-[6px]">薪资范围:</p>
          <Select class="w-[100%]" />
        </div>

        <div class="flex flex-wrap mb-[14px] items-center">
          <p class="mb-[6px]">定时任务(多范围时间段, 例 9:00-10:00, 14:00-15:00, 加号新增):</p>

          <div class="flex flex-wrap w-[100%]">
            {timesRanges.value.map((item, index) => {
              return (
                <div class="relative w-[45%] mr-[14px] mb-[10px]">
                  <TimeRangePicker v-model={item} format="HH:mm" onOk={(val) => formatTimeRange((val as string[]), index)} />
                  <CloseCircleOutlined
                    class="text-[16px] absolute top-[-5px] right-[-6px]"
                    onClick={() => removeTimeRange(index)}
                  />
                </div>
              )
            })}

            <PlusCircleOutlined
              two-tone-color="#5D4BA9"
              class="text-[16px] text-[#5B49A4] mb-[10px]"
              onClick={addTimeRange}
            />
          </div>
        </div>

        <Button type="primary" class="w-[100px] text-[16px]" onClick={btnClick}>
          启动
        </Button>
      </Card>
    )
  }
})
export default InfoForm
