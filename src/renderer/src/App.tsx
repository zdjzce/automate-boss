import { defineComponent } from 'vue'
import InfoMain from './components/InfoMain'
import { ConfigProvider, StyleProvider } from 'ant-design-vue'

const App = defineComponent({
  name: 'App',
  setup(props, { slots }) {
    return () => (
      <StyleProvider hashPriority='high'>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#7F79F7'
            }
          }}
        >
          <InfoMain></InfoMain>
        </ConfigProvider>
      </StyleProvider>
    )
  }
})
export default App
