/**
 * super
 *    1. 作为 函数 使用：代表父类的构造函数 constructor
 *        在使用 extends 继承父类的子类构造函数中，必须调用一次 super()，之后才能使用 this
 * 
 *    2. 作为 对象 使用，访问属性或者方法
 *        在 普通方法中 super 指向父类的原型对象；在静态方法中，指向父类
 */

class Parent {
  constructor () {
    this.type = 'parent'
  }
  getName () {
    return this.type
  }
}
Parent.getType = function () {
  return 'parent'
}

class Child extends Parent {
  constructor () {
    super()
    console.log('constructor: ' + super.getName())          // constructor: parent
  }
  getParentName () {
    // 普通方法中 supre 指向 父类原型对象
    console.log('getParentName: ' + super.getName())         // getParentName: parent
  }
  getParentType () {
    console.log('getParentName: ' + super.getType())         // error 
  }

  // static
  static __getParentType () {
    // 静态方法 指向 父类
    console.log('getParentName: ' + super.getType())         //  getParentName: parent
  }
}

const c = new Child()
c.getParentName()
// c.getParentType()     // error super 指向父类的原型对象 而不是 父类本身

Child.__getParentType()       // getParentName: parent
