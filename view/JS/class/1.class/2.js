// ES6 class 定义 类
class Point {
  z = 0        // 可以直接声明构造函数属性

  // 构造函数 不写为空 constructor() {}
  constructor (x, y, z) {
    this.x = x
    this.y = y
    this.z = z             // 也可以不初始化值，构造函数当中再赋值

    // 当自定义返回值，则 对象 p1 不再是 构造函数的实例
    // return { a: 'a' }
  }
  getPosition () {
    return `(${this.x}, ${this.y})`
  }
  // 静态方法
  static getClassName () {
    return Point.name                 // 每一个 class 都有一个 name 属性，如同 每个函数都有 name
  }
  static attr = 'staticAttr'
}

const p1 = new Point(1, 2, 3)
console.log(p1)         // Point { z: 3, x: 1, y: 2 }
console.log(p1.getPosition())         // (1, 2)

// console.log(p1 instanceof Point)         // false

console.log(p1.hasOwnProperty('x'))                             // true 构造函数上
console.log(p1.hasOwnProperty('getPosition'))                   // false
console.log(p1.__proto__.hasOwnProperty('getPosition'))         // true 实际 在 原型上

// console.log(p1.getClassName())         // p1.getClassName is not a function 实例无法访问静态属性
console.log(Point.getClassName())         // Point class 本身才可以访问

console.log(p1.attr)         // undefined
