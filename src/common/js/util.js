
// created() {
//   // 把query暴露出去 // this.$watch()=watch:{}  // debounce节流函数
//   this.$watch('query', debounce((newQuery) => {
//       this.$emit('query', newQuery)
//   }, 200))
// }


debounce(newQuery => {
  this.$emit('query', newQuery)
}, 200)

// 节流函数 接收一个func函数和一个延迟时间delay，返回一个函数return function (...args){}
export function debounce (func, delay) {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}