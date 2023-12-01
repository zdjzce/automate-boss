import { Card } from 'ant-design-vue'
import { defineComponent, computed } from 'vue'

// *  脚本处理错误提示信息

const InfoError = defineComponent({
  name: 'InfoError',
  props: {
    errorData: {
      type: String,
      default: () => 'this is info Error'
    }
  },
  setup(props, { slots }) {
    return () => (
      <Card class='!mt-[20px]'>
        <p class='text-[#c54034f0]'>错误信息:</p>
        <p class='text-[#c54034f0]'>{props.errorData}</p>
      </Card>
    )
  }
})
export default InfoError
