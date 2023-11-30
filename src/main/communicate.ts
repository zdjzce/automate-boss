import { State } from '../renderer/src/state'
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export async function communicate(driver, state: State) {
}

export async function elementHasClass(element, className) {
  const class_str = await element.getAttribute('class')
  return class_str.includes(className)
}
