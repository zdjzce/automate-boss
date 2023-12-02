import { Select } from 'ant-design-vue'
import { DefaultOptionType } from 'ant-design-vue/es/select'
import { defineComponent, ref, onMounted, Ref } from 'vue'
const SelectComp = defineComponent({
  name: 'SelectComp',
  props: {
    items: {
      type: Array
    },
    isSingle: {
      type: Boolean,
      default: () => true
    },
    onChangeItem: {
      type: Function
    }
  },
  setup(props, { slots }) {
    const selectedItems = ref([])
    const options = ref(
      props.items?.map((item) => ({
        value: item,
        label: item
      })) as DefaultOptionType[]
    )

    return () => (
      <Select
        mode={props.isSingle ? 'single' : 'multiple'}
        options={options.value}
        v-model:value={selectedItems.value}
        class="w-[100%]"
        showArrow={true}
        onSelect={() => props.onChangeItem?.(selectedItems.value)}
      />
    )
  }
})
export default SelectComp
