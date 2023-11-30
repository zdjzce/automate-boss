import { Card } from 'ant-design-vue'
import { defineComponent, computed } from 'vue'

// *  显示未读消息个数()
// *  显示今日已投递次数

const InfoCount = defineComponent({
  name: 'InfoCount',
  setup(props, { slots }) {
    return () => (
      <div class="flex flex-nowrap mb-[16px] h-[100px]">
        <Card class="!mr-[16px]">
          <div class="text-[#202020]">未读消息总数</div>
          <div class="font-bold text-[20px] text-[#8B5CB7]">123</div>
        </Card>

        <Card>
          <div>今日已投递次数</div>
          <div class="font-bold text-[20px] text-[#5D4BA9]">123</div>
        </Card>
      </div>
    )
  }
})
export default InfoCount
