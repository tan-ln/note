/**
 * super
 *     当 子类在 构造函数 中使用 super()，父类 构造函数中 的 this 则 指向 子类
 */

class Parent {
  constructor () {
    this.name = 'parent name'
    console.log(this);              // Child { name: 'parent name' }
  }
  print () {
    console.log(this.name);
  }
}

class Child extends Parent {
  constructor () {
    super()
    this.name = 'child name'
  }
  childPrint () {
    super.print()
  }
}

const c = new Child()
c.childPrint()          // child
