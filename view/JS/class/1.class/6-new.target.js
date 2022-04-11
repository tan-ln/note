/**
 *  new.target
 *  用于检测方法或构造函数是否是通过 new 被调用的
 *  通过 new 初始化的 函数 或 构造函数中
 *  new.target 返回一个指向构造方法或函数的引用
 *  普通函数 则 返回 undefined
 */

class Point {
  constructor () {
    console.log(new.target);    // [class Point]
  }
}
// const p = new Point()
// console
// class Point {
//   constructor () {
//     console.log(new.target);
//   }
// }


class Parent {
  constructor () {
    // console.log(new.target);    // [class Child extends Parent]
    if (new.target === Parent) {
      throw new Error('不能实例化')
    }
  }
}

class Child extends Parent {
  constructor () {
    // 继承 构造函数 必须 super
    super()
  }
}

// const c = new Child()
// console
// class Child extends Parent {
//   constructor () {
//     super()
//   }
// }

// const p = new Parent()        // Error: 不能实例化
const c = new Child()         // 只能通过 子类创建实例
