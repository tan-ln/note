---
title: JavaScript 语言精粹学习笔记
---

# 函数 (Functions)

## 函数对象

`JavaScript` 中的函数就是对象，函数可以保存在变量、对象和数组中，可以被当做参数传递给其他函数，函数也可以再返回函数，函数可以拥有方法

## 通过字面量创建函数
```javascript
    var func = function(a) {
        return a;
    }
```
## 函数调用

函数调用会暂停当前函数的执行，传递控制权和参数给新函数

除了声明时定义的形参，每个函数接收两个附加的参数 `this` 和 `arguments`

当实参和形参个数不匹配时，不会导致运行错误，实参过多则忽略超出的参数，实参不足则缺失的参数默认为 `undefined`，而且对参数不会进行类型检查。

**JavaScript 中有四种调用模式：**

 - ### 方法调用模式

当函数被保存为对象的一个属性时，称之为方法。
    如果调用表达式包含一个提取属性的动作：：` . `表达式或` [] `下标表达式，就是被当做方法调用。

```javascript
    var obj = {
        value: 0,
        show: function() {
            console.log(this.value);
        }
    }
        
    obj.show();
```

>通过 `this` 可以取得上下文方法称为公共方法
 - ### 函数调用模式

当一个函数并非一个对象属性时，就是被当做一个函数来调用的。

```javascript
    var myObject = {
        value: 0
    }
        
    myObject.double = function() {
        var that = this;
        
        var helper = function() {
            console.log(this.value)         // undefined
            console.log(that.value)         // 0
        }
        
        helper();		// 以函数的形式调用
    }
        
    myObject.double()	// 以方法的形式调用
```

以此模式调用函数时，`this` 将会绑定到全局对象，而内部函数的 `this` 无法绑定外部函数 的`this` 变量，所以不能共享访问权。

>解决办法：外部定义一个 `that` 变量保存 `this` 的值，内部函数通过 `that` 访问。

 - ### 构造器调用模式

如果一个类需要通过 `new` 关键字调用，那就是构造函数。

```javascript
    var Func = function(string) {
        this.status = string;
    }
    var myFunc = new Func('construct');
```

 - ### apply 调用模式

`apply` 方法需要构建一个参数数组传递给调用函数

```javascript
    var arr = [1, 2];
    var sum = add.apply(arr, [3, 4]);
```

## 返回 Return

一个函数总会返回一个值，如果没有指定返回值，则返回 `undefined`。
>`return;` 可用来使函数提前返回

## 异常 Exceptions

```javascript
    var add = function(a) {
        if (a != 'number') {
            throw {
                name: 'TypeError',
                message: 'a need to be number'
            }
        }
    }
      
    try {
        add('a')
    } catch (error) {
        console.log(error)	// {name: 'TypeError',message: 'a need to be number'}
        // console.log(error.name + error.message)
    }
```

## 扩充类型的功能

  通过给 `Object.prototype` 添加方法，可以让该方法对所有对象都可用。

```javascript
    Function.prototype.method = function(name, func) {
        this.prototype[name] = func;
        return this;
    }
      
    // 去除首位空格
    String.method('trim', function() {
        return this.replace(/^\s+|\s+$/g, '');
    })
      
    console.log("  neat  ".trim());		// neat
```

## 递归 

  函数自己调用自己，称为函数的递归调用

```javascript
    function fun()
    {
        // 自己调用自己，称为递归调用
        fun();
        console.log("a");
    }
    fun();
```

## 作用域 Scope

作用域控制着变量与参数的可以性及声明周期。

减少了名称冲突，并且提供了自动内存管理。

函数内部可以直接读取全局变量，函数外部无法读取函数内部的局部变量	

但实际上 `JavaScript` 语法并**不支持块级作用域**，函数中的参数和变量在外部不可见，在内部可见

```javascript
    var foo = function() {
        var a = 3, b = 5;
        
        var bar = function() {
            var a = 4, b = 6;
            console.log('a ' + a + ', b ' + b);		// a = 4, b = 6
        }()
        
        console.log('a ' + a + ', b ' + b);		// a = 3, b = 5
    }()
```


## 闭包 Closure 

闭包就是能够读取其他函数内部变量的函数

由于在 `Javascript` 语言中，只有函数内部的子函数才能读取局部变量，因此可以把闭包简单理解成 **"定义在一个函数内部的函数"**。

所以，在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。

  作用：
- **可以读取函数内部的变量**
- **让这些变量的值始终保持在内存中**

```javascript
    function f1() {
        var n = 999;

        nAdd = function () {
            n += 1
        }

        function f2() {
            alert(n);
        }

        return f2;
    }

    var result = f1();

    result(); // 999

    nAdd();

    result(); // 1000
```
  

**匿名函数本身就是闭包**

## 回调 Callback 

**回调函数原理**：“我现在出发，到了通知你”。
这是一个异步的流程，“我出发”这个过程中（函数执行），“你” 可以去做任何事，“到了”（函数执行完毕）“通知你”（回调）进行之后的流程。

```javascript
        function doSomething(callback) {
            callback(1,2);
        }

        function numberAdd(a,b) {
            document.write(a+b);
        }

        doSomething(numberAdd);//3
```

## 模块 Module

  模块是一个提供接口却隐藏状态与实现的函数或对象。
  