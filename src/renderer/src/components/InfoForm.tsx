import { Button, Card, Input, Select } from 'ant-design-vue'
import { defineComponent, onMounted, ref, watch } from 'vue'
import { state } from '../state'
import FormItemContainer from './common/FormItemContainer'
import { optionsData, optionsKeyValue } from '../state/optionsData'
import SelectComp from './common/SelectComp'
// *  设置 chrome 路径
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
  props: {
    onStart: {
      type: Function,
      required: true
    }
  },
  setup(props, { slots }) {
    const showHint = ref(false)
    const btnClick = async () => {
      if (!state.executablePath) {
        showHint.value = true
        return
      }
      showHint.value = false

      props.onStart()
    }

    const changeSelect = (key, value) => {
      if (typeof value === 'string') {
        state[key] = [optionsData[key].indexOf(value)]
      } else {
        state[key] = value.map((item) => optionsData[key].indexOf(item))
      }
    }

    return () => (
      <Card bordered={false} class="flex flex-wrap text-center w-[100%]">
        <FormItemContainer title="* Chrome 程序路径" classNames="text-[#FE574A]">
          <Input
            class="w-[100%]"
            v-model:value={state.executablePath}
            placeholder={'Chrome 路径 使用 chrome://version 获取，或查看 README 说明进行操作'}
          />
          {showHint.value ? <div class="text-[#FE574A]">程序路径必须输入！请看 README</div> : ''}
        </FormItemContainer>

        <FormItemContainer title="打招呼语">
          <Input class="w-[100%]" v-model:value={state.greeting} />
        </FormItemContainer>

        <FormItemContainer title="忽略职位关键字">
          <Input class="w-[100%]" v-model:value={state.ignoreJobKeyword} />
        </FormItemContainer>

        {Object.keys(optionsKeyValue).map((key) => {
          const item = optionsKeyValue[key]
          return (
            <FormItemContainer title={item.title}>
              <SelectComp
                items={optionsData[key]}
                isSingle={item.single}
                onChangeItem={(val) => changeSelect(key, val)}
              ></SelectComp>
            </FormItemContainer>
          )
        })}

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
