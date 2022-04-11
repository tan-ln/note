// setTimout 实现 setInterval
const foo = function (fn, timeout) {
  let _this = this
  setTimeout(() => {
    fn.call(_this)
    foo(fn, timeout)
  }, timeout)
}

foo(() => {
  console.log(1);
}, 1000)