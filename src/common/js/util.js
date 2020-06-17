// 节流函数 接收一个func函数和一个延迟时间delay，返回一个函数return function (...args){}
export const debounce = (func, delay) => {
  let timer
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => func.apply(this, args), delay)
  }
}

// 根据值删除数组某一项
export const removeByVal = (list, val) => {
  let index = list.findIndex(item => item === val)
  if (index !== -1) list.splice(index, 1)
}