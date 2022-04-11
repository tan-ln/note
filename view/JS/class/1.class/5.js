// 私有方法，移出模块

const _fun2 = () => {
  console.log('123');
}
class Point {
  fun1 () {
    _fun2.call(this)
  }
}

const p = new Point()

// p._fun2()                     // p._fun2 is not a function

 // 直接调用
_fun2()    // 如果是封装了模块则无法直接调用

