import { Card } from 'ant-design-vue'
import { defineComponent, computed } from 'vue'

// *  显示未读消息个数()
// *  显示今日已投递次数

const InfoCount = defineComponent({
  name: 'InfoCount',
  props: {
    count: {
      type: Number || String,
      required: true
    },
    messageCount: {
      type: Number || String,
      required: true
    }
  },
  setup(props, { slots }) {
    return () => (
      <div class="flex flex-nowrap mb-[16px] h-[100px]">
        <Card class="!mr-[16px]">
          <div class="text-[#202020]">未读消息总数:</div>
          <div class="font-bold text-[20px] text-[#8B5CB7]">{props.messageCount}</div>
        </Card>

        <Card>
          <div>今日使用软件投递次数:</div>
          <div class="font-bold text-[20px] text-[#5D4BA9]">{props.count}</div>
        </Card>
      </div>
    )
  }
})
export default InfoCount
