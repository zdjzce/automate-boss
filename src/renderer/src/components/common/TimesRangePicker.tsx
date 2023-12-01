import { defineComponent, ref, watch } from 'vue'
import { TimeRangePicker } from 'ant-design-vue'
import dayjs from 'dayjs'
import { MinusCircleFilled, PlusCircleOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  name: 'TimeRangePickerComponent',
  props: {},
  setup(props, { emit }) {
    const timesRanges = ref([['', '']])
    const removeTimeRange = (index: number) => {
      timesRanges.value.splice(index, 1)
    }
    const addTimeRange = () => timesRanges.value.push([])
    const formatTimeRange = (timeRange: string[] | null, index: number) => {
      timesRanges.value[index] = timeRange?.map((item) => dayjs(item).format('HH:mm')) || []
    }

    return () => (
      <div class="flex flex-wrap w-[100%]">
        {timesRanges.value.map((item, index) => {
          return (
            <div class="relative w-[45%] mr-[14px] mb-[10px]">
              <TimeRangePicker
                v-model={item}
                format="HH:mm"
                onOk={(val) => formatTimeRange(val as string[], index)}
              />
              <MinusCircleFilled
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
    )
  }
})
