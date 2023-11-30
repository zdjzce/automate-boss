import { Button, Card, Form, FormItem, Input } from 'ant-design-vue'
import { defineComponent, ref, onMounted } from 'vue'
import InfoCount from './InfoCount'
import InfoError from './InfoError'
import InfoForm from './InfoForm'
// TODO
/**
 *  提示语：需要 chrome 116 及之前的版本, 且关闭 chrome 自动更新，详细请看
 *  显示投递次数图表与回复率图表 (优先级最低，略微麻烦)
 */

const InfoMain = defineComponent({
  setup(props, { slots }) {
    return () => (
      <div>
        <Card class="font-bold !mb-[12px]">
          注意: 需要 Chrome 116 及之前的版本, 且关闭 chrome 自动更新，详细点击
          <a href="" class="text-[#8B5CB7] border-b-[3px] border-indigo ml-[3px]">
            README
          </a>
        </Card>

        <InfoCount></InfoCount>
        <InfoForm></InfoForm>
        <InfoError></InfoError>
      </div>
    )
  }
})
export default InfoMain
