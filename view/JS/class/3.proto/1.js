/**
 *  原生构造函数: Boolean | Number | String | Array | Date| Function | RegExp | Error | Object
 * 
 *  ES5 中无法继承 原生构造函数
 *  ES6 可以继承
 * 
 */

// 原生构造函数: Array 接受一个或多个参数
//            Array(100) 则创建 长度为 100 个空元素 的数组
//            Array(1, 2, 3)      则创建 [1, 2, 3]
class CustomArray extends Array {
  constructor (...args) {
    super(...args)
  }
}

const arr = new CustomArray(3)
const arr2 = new CustomArray(1, 2, 3)
console.log(arr);             // CustomArray(3) [ <3 empty items> ]
console.log(arr2);            // CustomArray(3) [ 1, 2, 3 ]


