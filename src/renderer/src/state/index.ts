import { reactive, watch } from 'vue'

export type State = Partial<{
  executablePath: string
  ignoreJobKeyword: string
  jobType: string[]
  salaryRange: string[]
  workExperience: string[]
  educationRequirement: string[]
  companySize: string[]
}>

export const state: State = reactive({
  executablePath: '',
  ignoreJobKeyword: '',
  recruitType: [],
  salaryRange: [],
  experience: [],
  educationalBg: [],
  companySize: []
})

export const stateForMain = reactive({
  executablePath: '',
  ignoreJobKeyword: '',
  recruitType: [],
  salaryRange: [],
  experience: [],
  educationalBg: [],
  companySize: []
})

export const watchHandler = (data: unknown, handler: (...args: unknown[]) => void) => {
  const debouncedHandler = debounce(handler, 1000)

  return watch(
    () => data,
    (newData, oldData) => {
      debouncedHandler(newData, oldData)
    },
    { immediate: true, deep: true }
  )
}

function debounce(fn, delay) {
  let timeout
  return function (...args: unknown[]) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
