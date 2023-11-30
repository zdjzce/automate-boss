import { Button, Card, Input } from 'ant-design-vue'
import { defineComponent, ref, onMounted } from 'vue'
// TODO
/**
 * 1. 提示语：需要 chrome16 且关闭 chrome 自动更新，详细请看 2. 需要完善在线简历否则会终止脚本
 * 2. 设置打招呼语
 * 3. 求职期望 Tab 索引
 * 4. 显示未读消息个数()
 * 5. 显示已投递次数
 * 6. 添加忽略职位关键字
 * 7. 设置薪资范围
 * 8. 添加定时任务
 */

const InfoForm = defineComponent({
  setup(props, { slots }) {
    const btnClick = async () => {
      await window.electron.ipcRenderer.invoke('createNewWindow')
    }
    return () => (
      <div>
        <Card
          bordered={false}
          style="display: inline-flex; flex-wrap: nowrap; width: 100%; margin-bottom: 20px;"
        >
          <Card style="height: 100%;">123</Card>
          <Card>123</Card>
        </Card>

        <Card bordered={false} style="display: flex; flex-wrap: wrap;">
          <Input style="width: 50%;"></Input>
          <Button type="primary" style="width: 100px;" onClick={btnClick}>
            启动
          </Button>
        </Card>
      </div>
    )
  }
})
export default InfoForm
