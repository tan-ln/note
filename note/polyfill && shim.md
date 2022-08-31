# Shim && Polyfill

## `Shim`

> Shim 垫片，可以理解为一种`透明`的库，能够*拦截对 API 的调用*，并且*改变它的参数传递*、*处理操作本身*或*重定向操作到其他位置*

透明：指的是某见事情的发生对这个系统的其他部分是感知不到的，或者称之为穿透

`shim` 可以在新环境支持老的 `API`，比如已废除的 API，而且仅靠旧环境中已有的手段实现

如：
1. `HTML5 shiv`
2. `Autoperfixer`
3. `es6-shim`
4. `Vue` 响应式原理 `Object.definePorperty` 是 `ES5` 无法 `Shim` 的特性，所以不支持 IE8 及以下

## `Polyfill`

> 我们在需要部署的环境*不支持新的 JavaScript 内置函数*（如 `Object.assign` 或 `Promise.any`），或 *旧版本浏览器* 不支持的一些 `Web API`（如 `Fetch` 或 Dom 中的 `document.querySelector`）时，可以通过 `polyfill` 来实现

**Web Polyfill 其实特指在老版本的 Web 环境上以某种方式去实现新的 Web API 标准的一种 Shim，其本质是抹平不同浏览器直接的 API 差异，而非实现新的 API**


## Case

### `es6-shim`
```js
// UMD
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.returnExports = factory();
  }
} (this, function () {
  'use strict';
  // 判断并获取全局对象
  var getGlobal = function () {
    if (typeof self !== 'undefined') { return self; }
    if (typeof window !== 'undefined') { return window; }
    if (typeof global !== 'undefined') { return global; }
    throw new Error('unable to locate global object');
  }
  // 得到环境下的全局对象
  var globals = getGlobal();
  // es6 Map
  globals.Map = ...
  // es6 Set
  globals.Set = ...
  // es6 Symbol
  globals.Symbol = ...
  
  // 将全局对象返回，当es6-shim库被引入时，会自动在全局对象挂载API，也就是重新造了一个新环境。
  return globals
}))
```

### `es6-promise`
```js
import Promise from './promise';

export default function polyfill() {
  let local;
  // 这里同样是用的UMD
  if (typeof global !== 'undefined') {
    local = global;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }

  let P = local.Promise;
    // 这里判断了全局对象下是否有Promise这个属性。   
  if (P) {
    var promiseToString = null;
    try {
      promiseToString = Object.prototype.toString.call(P.resolve());
    } catch(e) {
      ...
    }
    if (promiseToString === '[object Promise]' && !P.cast){
        // 如果已经有了Promise，就直接返回，不会再给全局对象增加Promise属性。
      return;
    }
  }
    // 代码执行到这里，给全局对象添加Promise的API
  local.Promise = Promise;
}
```


### `Object.is`

ES6 相等性判断：
```js
=== 严格相等
== 非严格相等
-0 !== +0 同值相等
NaN === NaN 同值相等
-0 === +0 零值相等
```

`Object.is()` 就是使用的 **同值相等** 来判断相等性的

> `MDN` 中对 `Object.is()` 的 `Polyfill` 写法
```js
if (!Object.is) {
  Object.defineProperty(Object, "is", {
    value: function (x, y) {
      // SameValue algorithm
      if (x === y) {
        // return true if x and y are not 0, OR
        // if x and y are both 0 of the same sign.
        // This checks for cases 1 and 2 above.
        return x !== 0 || 1 / x === 1 / y;
      } else {
        // return true if both x AND y evaluate to NaN.
        // The only possibility for a variable to not be strictly equal to itself
        // is when that variable evaluates to NaN (example: Number.NaN, 0/0, NaN).
        // This checks for case 3.
        return x !== x && y !== y;
      }
    }
  });
}
```

### `Promise.finally`

```js
function polyfill () {
  var local

  if (typeof global !== 'undefined') {
    local = global
  } else if (typeof self !== 'undefined') {
    local = self
  }
  local.Promise.prototype['finally'] = function (callback) {
    let P = this.constructor
    return this.then(
      value => P.resolve(callback()).then(() => value),
      reason => P.resolve(callback()).then(() => {
        throw reason
      })
    )
  }
}
polyfill()

```

## `Polyfill` 与 `Babel`

`babel` 源代码到源代码的编译器，通常 `babel` 做的事情是转换 `transform，比如将` `ES6+` 的代码转换为向后兼容的语法

- 语法转换
- 通过 Polyfill 方式在目标环境中添加缺失的特性 (通过 @babel/polyfill 模块)
- more

`babel` 的作用更像是一个平台，能够让更多的 `plugins` 在平台上发挥作用

`babel polyfill` 有三种

* babel-polyfill
* babel-runtime
* babel-plugin-transform-runtime

### `babel-polyfill`

```js
// index.js
import "@bable/polyfill";
const fn = () => {
  console.log("babel");
};
const p = new Promise((resolve, reject) => {
  resolve("babel");
});
const list = [1, 2, 3, 4].map(item => item * 2);
```

编译结果：
```js
// compiled.js
"use strict";

require("@bable/polyfill");

var fn = function fn() {
  console.log("babel");
};

var p = new Promise(function (resolve, reject) {
  resolve("babel");
});
var list = [1, 2, 3, 4].map(function (item) {
  return item * 2;
});
```

`babel-polyfill` 通过向全局对象和内置对象的 `prototype` 上添加方法来实现的。一次性全部引入会造成全局空间污染。

相当于引入：
```js
import "core-js/stable"; 
import "regenerator-runtime/runtime";
```

按需引入：
1. `useBuiltIns`
```js
// webpack.config.js
module.exports = {
  presets: [
    [
      "@babel/env",
      {
        useBuiltIns: "usage", // 实现按需加载
        corejs: { 
          version: 3, 
          proposals: true 
        }
      }
    ]
  ],
  plugins: []
};
```
同样是上面的代码，编译结果：
```js
// compiled.js
"use strict";

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

var fn = function fn() {
  console.log("babel");
};

var p = new Promise(function (resolve, reject) {
  resolve("babel");
});
var list = [1, 2, 3, 4].map(function (item) {
  return item * 2;
});
```

2. `babel-runtime`

为解决全量引入造成的*文件体积增加*及*全局 API 的污染*问题，引入 `runtime` 的概念，而 `runtime` 的核心思想就是 **以引入替换的方式积极兼容性的问题**

按需加载，比如在哪里需要使用 `Pormise` 就在改文件引入

```js
import Promise from 'babel-runtime/core-js/promise'
```

这种方法的弊端在于:
- 如果多个文件需要使用到 `Pormise`，总不能每个文件引入一下
- 对于一些辅助函数的重复打包

使用 `babel-plugin-transform-runtime` 就可以解决手动 `import` 问题

3. `babel-plugin-transform-runtime`
```js
// webpack.config.js
module.exports = {
  presets: ["@babel/env"],
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        corejs: { version: 3 }
      }
    ]
  ]
};

```

`babel-plugin-transform-runtime` 可以在我们使用新 API 时 自动 `import babel-runtime` 里面的 `polyfill`

`babel-plugin-transform-runtime` 优点
- 不会污染全局变量
- 多次使用只会打包一次
- 依赖统一按需引入,无重复引入,无多余引入
- 避免 babel 编译的工具函数在每个模块里重复出现，减小库和工具包的体积


## `Shim` && `Polyfill` 区别

1. `Shim` 是一个库，而一个 `polyfill` 是一段代码（或者插件）

2. `shim` 针对的是环境，`polyfill` 针对的是 `API`

3. `shim` 不在意、旧环境是否存在某 API，而是直接改变全局对象，为旧环境提供新功能，从而创建一个新的环境；      
    `Polyfill` 则会判断旧环境是否存在 API ，不存在时才会添加

Polyfill 可以理解为在 Web 环境下的 Shim 真子集?



## 哪些可以被 `Polyfill`
1. 浏览器已经暴露的 API，由于不够好用，而在新版本做了改动，这类是比较好 Polyfill 的
2. CSSOM / CSS Houdini
3. ...


## 不能被 `Polyfill`
1. Symbol
2. Proxy
3. Typed Array 定型数组
4. ...

## 实现
1. `npm init -y`
2. 安装 `yarn add @babel/core @babel/cli @babel/preset-env -D`
3. 创建 `babel.config.json`
```json
{
  "presets": [
    "@babel/preset-env"
  ]
}
```
4. 运行查看

两种方式

- 命令行 通过 `@bable/cli`
```bash
npx babel index.js --watch -o output.js
# 或
./node_modules/.bin/babel src --out-dir lib
```

- 官方提供的 babel 语法编译器
[https://babeljs.io/repl](https://babeljs.io/repl)


### `@babel/preset-env`
`@babel/preset-env` 可以理解为一堆 `plugin` 集合的包，这种 `plugin` 的集合也可以叫做 预设

配置：
```json
{
  "presets": [
    "@babel/preset-env"
  ]
}
```

编译前：
```js
const fn = () => {
  console.log("babel-----------");
};

const p = new Promise((resolve, reject) => {
  resolve("*********babel");
});

p.finally(() => {
  console.log('promsie finally')
})

const list = [1, 2, 3, 4].map(item => item * 2);
```

编译后：
```js
"use strict";

// index.js
var fn = function fn() {
  console.log("babel-----------");
};

var p = new Promise(function (resolve, reject) {
  resolve("*********babel");
});
p["finally"](function () {
  console.log('promsie finally');
});
var list = [1, 2, 3, 4].map(function (item) {
  return item * 2;
});
```

### `@babel/plugin-transform-runtime`

`yarn add @babel/plugin-transform-runtime -D`

解决的问题
1. polyfill
2. 避免重复打包的使用的辅助函数
3. API 的全局污染

配置：
```json
{
  "presets": [
    "@babel/preset-env"
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3
      }
    ]
  ]
}
```
编译前：
```js
class A {}
class B {}
```
编译后：
```js
"use strict";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var A = /*#__PURE__*/_createClass(function A() {
  _classCallCheck(this, A);
});

var B = /*#__PURE__*/_createClass(function B() {
  _classCallCheck(this, B);
});
```
```js
// 配置 @babel/plugin-transform-runtime
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var A = /*#__PURE__*/(0, _createClass2["default"])(function A() {
  (0, _classCallCheck2["default"])(this, A);
});
var B = /*#__PURE__*/(0, _createClass2["default"])(function B() {
  (0, _classCallCheck2["default"])(this, B);
});
```

使用 `@babel/plugin-transform-runtime` 后 辅助函数已变成引用的形式，而非每个文件再声明一遍，导致重复打包体积增加


### `polyfill`

`@babel/preset-env` 默认配置只能为我们转换ES新语法，而不能 shim API

配置/引入：
1. 全局引入
```js
// 代码入口
import 'core-js/stable'
import 'regenerator-runtime/runtime'

// 旧版本的引入方式，不推荐
import '@babel/polyfill'
```
```json
// babelrc / babel.config.json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
        },
        "useBuiltIns": "entry",
        "corejs": "3.6.5"
      }
    ]
  ]
}
```
```js
// webpack.config.js
module.exports = {
  entry: ["@babel/polyfill", "./app/js"],
};
```

2. 按需引入

编译前：
```js
const fn = () => {
  console.log("babel-----------");
};

const p = new Promise((resolve, reject) => {
  resolve("*********babel");
});

p.finally(() => {
  console.log('promsie finally')
})

const list = [1, 2, 3, 4].map(item => item * 2);
```

编译后：
```js
"use strict";

require("core-js/modules/es.promise.js");

require("core-js/modules/es.promise.finally.js");

const fn = () => {
  console.log("babel-----------");
};

const p = new Promise((resolve, reject) => {
  resolve("*********babel");
});
p.finally(() => {
  console.log('promsie finally');
});
const list = [1, 2, 3, 4].map(item => item * 2);
```


参考：
1. [https://juejin.cn/post/6844904050882772999](https://juejin.cn/post/6844904050882772999)
2. [https://www.bilibili.com/video/BV12q4y1E7Gg](https://www.bilibili.com/video/BV12q4y1E7Gg)
3. [https://juejin.cn/post/6845166891015602190](https://juejin.cn/post/6845166891015602190)
4. [https://juejin.cn/post/6844904063402770439](https://juejin.cn/post/6844904063402770439)
