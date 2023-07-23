# valueOf && toString

> valueOf 和 toString 是 Object.prototype 上的方法，基本上 js 所有的数据类型都有这两个方法（ null 除外 ）。
> 这两个方法很少直接调用，但是在值运算的过程中就会调用到这两个方法


## js 隐式类型转换

js 是弱类型语言（或动态类型语言），变量类型是不固定的，在数值运算时，运算符两边的变量类型可以为任意，比如 字符串和 数值相加。

原因则是 js 在运算之前会做隐式类型转化，但是缺少类型监测，就需要另外做类型判断，也无法在编译时就发现类型错误

```js
// 数值类型 与 布尔值相加
10 + true // 11
10 + false // 10

// 字符串类型 与 布尔值相加
'10' + true // 10true

// 字符串 与 数值类型相加
(1 + 2) + '3' // 33
1 + '2' + 3 // 123
```

### isNaN

NaN 是 Number 类型，但表示的是 Not A Number

javascript 中的数值类型有
- 整数
```js
const integer = 10
typeof integer // number
```
- 浮点数
```js
const float = 10.10
typeof float // number
```
- Infinity 比任何数字都大地数
```js
const infinity = Infinity
typeof infinity // number
```
- NaN


> 出现 NaN 的情况
1. 数值运算之前，js 会自动给表达式做 Number() 转化为 Number 类型，如果转换失败，则为 NaN
2. 使用 parseInt 、 parseFloat 或 Number 将一个非数字的值转换为数值类型时，转化失败则为 NaN

```js
// NaN
'abc' - 3
parseInt('abc')
```

> 检测 NaN
1. NaN 和 NaN 不相等，可以利用这一特性
```js
const a = NaN
if (a !== a) {
  console.log('is NaN')
} else {
  console.log('not NaN')
}
```

2. window.isNaN || Number.isNaN

>> **window.isNaN(简称 isNaN) 的问题**

isNaN 在调用之前存在一个隐式转化的过程，会把不是 NaN 的值转换为 NaN

```js
isNaN('abc') // true
isNaN
```

如果 isNaN 的参数不是 Number 类型，那么 isNaN 会先尝试把参数转化为 Number 类型，然后对转化后的结果判断
而 Number.isNaN 不会对参数进行类型转化，而是直接先判断 参数类型是否为 Number

**区别**
```js
isNaN('123bac') // true

/**
 *  Number('123abc') => NaN => true 
 */

Number.isNaN('123abc') // false

/**
 *  typeof '123abc' !== 'number' => false
 */
```

>> 简单的 polyfill 实现 Number.isNaN
```js
if (!Number.isNaN) {
  Number.prototype.isNaN = function (n) {
    return (
      typeof n === 'number' && window.isNaN(n)
    )
  }
}
```

## toString

> 返回一个表示该对象的字符串
> 当对象表示为文本值或以期望的字符串方式被引用时，toString方法被自动调用

```js
let a = {}
let b = [1, 2, 3]
let b1 = []
let c = '123'
let d = function(){ console.log('fn') }

console.log(a.toString()) // [object, object]
console.log(b.toString()) // 1, 2, 3
console.log(b1.toString()) // 输出为空
console.log(c.toString()) // 123
console.log(d.toString()) // function(){ console.log('fn') }
```

> Object.prototype.toString

返回一个形如 `[object xxxxx]` 的字符串，可用于类型精确判断

- 如果**对象**上的 `toString` 方法未被重写，则会返回 `[object xxxxx]` 的字符串
- 但是大部分对象上的 `toString` 方法是被重写了的，则可以通过 `call` 方法来调用

```js
const boo = {
  toString () {
    return 'X---'
  }
}
const foo = {}
console.log(foo.toString()) // [object, object]
console.log(boo.toString) // X---
console.log(Object.prototype.toString.call(boo)) // [object, object]
```

> `Object.prototype.toString.call()` 如果参数为 null 或 undefined，则直接返回结果
```js
Object.prototype.toString.call(null) // [object Null]
Object.prototype.toString.call(undefined) // [object Undefined]
```

> 如果参数不为 `null` 或 `undefined`，则将参数转为对象，再做判断


### toString 的自动调用

在使用操作符的时候，如果其中一边为对象，就会先调用 toString 方法，也就是隐式转化


```js
const a = 100
const arr = [1, 2]

console.log(a + arr) // 1001, 2
console.log(a > arr) // false
console.log(a < arr) // false
```


## valueOf

> 返回对象的原始值

```js
const a = 100
const arr = [1, 2]

console.log(a.valueOf()) // 100
console.log(arr.valueOf()) // [1, 2]
```


## 对比

- 共同点
输出对象时都会自动调用

- 不同点
默认返回值不同，且存在优先级关系


二者并存的情况下，在**数值运算**中，优先调用了`valueOf`，**字符串运算**中，优先调用了`toString`

```js
class C {
  valueOf () {
    return 2
  }
  toString () {
    return 'stringing'
  }
}

const cc = new C()

console.log(String(cc)) // stringing
console.log(Number(cc)) // 2

console.log(cc + 100) // 102
console.log(cc == 2) // true
console.log(cc === 2) // false （=== 不会触发隐式转化）
```

例子2
```js
function fn() {
	return 20
}
console.log(fn + 10) // function fn() {return 20}10
console.log(fn + 'hello') // function fn() {return 20}hello
fn.toString = function () {
	return 10
}
console.log(fn + 10) // 20
console.log(fn + 'hello') // 10hello

fn.valueOf = function () {
	return 5
}

console.log(fn + 10) // 15
console.log(fn + 'hello') // 5hello
```

> valueOf偏向于运算，toString偏向于显示

1. 在进行**对象转换**时，将优先调用`toString`方法，
  如若没有重写 `toString`，将调用 `valueOf` 方法；
  如果两个方法都没有重写，则按Object的toString输出(Object.prototype.toString)。
```js
class A {
  valueOf() {
    return 2
  }
}
let a = new A()
Object.prototype.toString = null
console.log(String(a))  // 2        => (valueOf)
```

2. 在进行**强转字符串类型(String())**时，将优先调用 toString 方法，**强转为数字(Number)**时优先调用 valueOf。
3. 使用**运算操作符**的情况下，`valueOf`的优先级高于`toString` 


[全面分析toString与valueOf](https://cloud.tencent.com/developer/article/1768047)
[valueOf和toString](https://juejin.cn/post/6844903967097356302)



基本类型之外的转换规则

valueOf:
```js
类型 ----------- valueOf 返回值
Array             数组本身
Boolean           布尔值
Date              时间戳
Function          函数本身
Number            数字值
Object            对象本身 { a: 10 }
String            字符串值
```

toString:
```js
类型 ----------- toString 返回值
Array             数组内容,分隔 (1, 2)
Boolean           "true" || "false"
Date              'Fri Jul 14 2023 11:45:20 GMT+0800 (中国标准时间)'
Function          函数声明的源代码字符串 'function a () { return null }'
Number            "100"
Object            '[object Object]'
String            'abc'
```


面试题：

```js
var a = {}
var b = {}
var c = {}

c[a] = 1
c[b] = 2

console.log(c)
console.log(c[a])
console.log(c[b])
```

将 a 和 b 作为对象 c 的 key
对象转字符串 结果为 '[object object]'
所以 c[a] 和 c[b] 执行的 key 为一个
结果为 
```js
console.log(c) // { '[object Object]': 2 }
console.log(c[a]) // 2
console.log(c[b]) // 2

```









