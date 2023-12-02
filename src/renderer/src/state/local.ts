export const setCount = () => {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()

  const storedDate = localStorage.getItem('date')
  let count = localStorage.getItem('count')

  // 如果没有存储的日期，或者存储的日期小于今天的日期（即已经过了凌晨十二点）
  if (!storedDate || Number(storedDate) < today) {
    count = 0
    localStorage.setItem('date', String(today))
  }

  count = Number(count) + 1

  localStorage.setItem('count', String(count))

  return count || 0
}
