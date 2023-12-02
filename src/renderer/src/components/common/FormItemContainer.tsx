import { defineComponent } from 'vue'

const FormItemContainer = defineComponent({
  name: 'FormItemContainer',
  props: {
    title: {
      type: String,
      default: ''
    },
    classNames: {
      type: String
    }
  },

  setup(props, { slots }) {
    return () => (
      <div class="flex flex-wrap mb-[14px] items-center">
        <p class={'mb-[6px] text-left ' + (props.classNames || '')}>{props.title}:</p>
        {slots.default?.()}
      </div>
    )
  }
})
export default FormItemContainer
