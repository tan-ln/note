/**
 *  防抖：
 *      频繁触发事件，设定一个时间间隔，当 相邻两次事件 的触发时间间隔 小于设定的时间，则重新设定，大于则触发
 * 
 *  节流
 *      频繁触发事件，每隔一段时间触发一次
 */

// const debounce = function (fn, wait = 1000) {
//   let timer = null
//   return function () {
//     if (timer) clearTimeout(timer)
//     const _this = this
//     const _args = [...arguments]
//     timer = setTimeout(() => {
//       fn.apply(_this, _args)
//     }, wait);
//   }
// }

const throttle = function (fn, wait) {
  let timer = null
  return function (...args) {
    if (timer) return
    timer = setTimeout(() => {
      fn.apply(this, args)
      clearTimeout(timer)
      timer = null
    }, wait);
  }
}
