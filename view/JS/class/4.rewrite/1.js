class Person {
  constructor (name, age) {
    this.name = name
    this.age = age
  }
  getName () {
    console.log(this.name)
  }
  // static
  static getClassName () {
    console.log(this.name)
  }
}
// const p1 = new Person('tan', 100)
// console.log(p1);                                // Person { name: 'tan', age: 100 }

/*******************************************/
function ClassPerson (name, age) {
  'use strict';
  var name = arguments.length && arguments[0] !== undefined
    ? arguments[0]
    : name
  var age = arguments.length && arguments[1] !== undefined
    ? arguments[1]
    : age
  
  // 是否通过 new 创建
  classCheck(this, ClassPerson)
  this.name = name
  this.age = age
}
// 检测 是否 new 实例
function classCheck (instance, constructor) {
  if (!(instance instanceof constructor)) throw new Error('should exec with new keyword')
}
// 方法
var handleProps = (function () {
  function defineProps (target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || false
      descriptor.configurable = descriptor.configurable || true
      Object.defineProperty(target, descriptor.key, descriptor)
    }
  }

  return function (constructor, protoProps, staticProps) {
    if (protoProps) defineProps(constructor.prototype, protoProps)
    if (staticProps) defineProps(constructor, staticProps)
  }
})()
// 普通方法 和 static 方法
handleProps(ClassPerson, [
  {
    key: 'getName',
    value: function () {
      console.log(this.name);
    }
  }
], [
  {
    key: 'getClassName',
    value: function () {
      console.log(this.name);
    }
  }
])

const p2 = new ClassPerson('ln', 200)
console.log(p2)                             // ClassPerson { name: 'ln', age: 200 }
p2.getName()                                // ln
ClassPerson.getClassName()                  // ClassPerson

console.log(Reflect.ownKeys(p2))            // [ 'name', 'age' ]

// ClassPerson('ln', 200)                      // throw new Error('should exec with new keyword')