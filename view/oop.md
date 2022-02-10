# 面向对象
将 事务 抽象成 对象

    面向对象：模型化    性能较低、开销大    复用、维护、扩展、低耦合
    面向过程：流程化    性能高              不易。。。

- pop：
```c
    input: 1
    input: 1
    output: 1 + 1 = 2
```
- oop
```js
const add = function (a, b) {
    return a + b
}
add(1, 1)   // 2
add(1, 2)   // 3
```

## 封装、继承、多态
1. 封装
隐藏对象细节，对外提供共有访问方式

2. 继承
抽取子类共有的属性，集成父类，子类对父类的代码进行复用

3. 多态

## js 的"面向对象"
### 继承
1. `Child.prototype = new Parent()`

    子类的原型 作为 父类的实例，这种方法无法使 子类通过父类创建私有属性

2. 调用父类的构造函数
    ```js
    function Chlid () {
        Parent.apply(this, arguments)
    }
    ```
    没有继承父类 prototype 上的属性 和方法，无法使用父类原型的方法
3. 组合继承
4. `Child.prototype = Object.create(Parent.prototype)`

    组合继承中改为 **将父类的原型复制给了子类原型**
    - 构造函数中继承父类属性／方法，并初始化父类。
    - 子类原型和父类原型建立联系。

解决 Parent 和 Child 实例的 constructor 指向都是 Parent。
将子类的构造函数指回 子类
    `Child.prototype.constructor = Chlid`

5. es6 继承
