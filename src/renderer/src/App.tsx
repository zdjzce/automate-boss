import { defineComponent } from 'vue'
import InfoForm from './components/Form'
import { ConfigProvider } from 'ant-design-vue'

const App = defineComponent({
  name: 'App',
  setup(props, { slots }) {
    return () => (
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#7F79F7'
          }
        }}
      >
        <InfoForm></InfoForm>
      </ConfigProvider>
    )
  }
})
export default App
