import { Card } from 'ant-design-vue'
import { defineComponent, computed } from 'vue'

// *  脚本处理错误提示信息

const InfoError = defineComponent({
  name: 'InfoError',
  setup(props, { slots }) {
    return () => (
      <Card class='!mt-[20px]'>
        <p class='text-[#c54034f0]'>this is info Error</p>
      </Card>
    )
  }
})
export default InfoError
