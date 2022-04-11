// ES6 class 继承
class Parent {
  constructor (name) {
    this.name = name
  }
  getName () {
    return this.name
  }
  static getNames () {
    return this.name
  }
}

class Child extends Parent {
  constructor (name, age) {
    super(name)                 // super 之后才能使用 this
    this.age = age
  }
}

const ch = new Child('Tan', 100)
console.log((ch.getName()));                 // Tan
console.log(ch instanceof Child);            // true
console.log(ch instanceof Parent);           // true

// 静态方法同时继承
console.log(Parent.getNames());              // Parent
console.log(Child.getNames());              // Child

// 获取 class 的父类
console.log(Object.getPrototypeOf(Child) === Parent)          // true
