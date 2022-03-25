/**
 *  每隔一秒输出
 *      1 - 5
 */

// 1. 闭包 立即执行函数
const foo = function () {
  for (var i = 0; i < 5; i++) {
    !(function (i) {
      setTimeout(() => {
        console.log(i + 1)
      }, i * 1000)
    })(i)
  }
}

// foo()

// 2. ES6 let
const foo2 = function () {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      console.log(i + 1)
    }, i * 1000)
  }
}

// foo2()

// 3. bind
const foo3 = function () {
  for (var i = 1; i <= 5; i++) {
    setTimeout(console.log.bind(console, i), i * 1000);
  }
}

foo3()
