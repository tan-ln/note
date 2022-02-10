# vue3 响应式 和 vue2 区别

vue2 核心：`Object.definePorperty()`，利用这个 api 对**属性**的读取和赋值进行监听和拦截。

vue3 核心：`Proxy` ，代理**整个对象**，给对象架设一层拦截器，但凡要访问或者修改这个对象上的值或者属性，都必须先经过这层拦截器

1. proxy 使用方便于 definePorperty
2. proxy 代理整个对象，definePorperty 监听对象的某个属性
3. proxy 调用时递归，只会响应式处理 get 的那个层级，不会深度遍历；definePorperty 一开始全部递归，性能 proxy 更优
    proxy **不能**监听**深层次**的对象变化，选择在 `getter` 中递归响应式，这样只有在**真正访问**到内部对象才会变成响应式，而不是无脑递归

4. 数组问题：vue2 只实现（重写）了几种 array 方法的监听，对于**下标改变数组等情况视图不会更新**，proxy 则无碍
5. 兼容性：definePorperty < IE8，proxy 则更高（IE 11）


- vue2 - defineProperty
```js
const data = {
  username: "tom",
  profile: {
    city: "beijing",
    a: {
      b: 12,
      c: {
        d: 23,
      },
    },
  },
};
function observe(data) {
  console.log(1);
  if (typeof data !== "object" || data == null) {
    return data;
  }
  for (const key in data) {
    defineReactive(data, key, data[key]);
  }
}

function defineReactive(target, key, val) {
  observe(val);
  Object.defineProperty(target, key, {
    get() {
      console.log(`get ${key}`);
      return val;
    },
    set(newValue) {
      console.log(`set ${key}`);
      if (newValue !== val) {
        observe(newValue);
        val = newValue;
      }
    },
  });
}
observe(data);
console.log(data);
```
- vue3 - proxy
```js
function observe(data) {
  console.log(1);
  if (typeof data !== "object" || data == null) {
    return data;
  }
  const p = new Proxy(data, {
    get(target, key, receiver) {
      console.log(`get ${key}`);
      const result = Reflect.get(data, key, receiver);
      // 当获取值的是时候 再设置响应式
      return observe(result);
    },
    set(target, key, val, receiver) {
      console.log(`set ${key}`);
      const result = Reflect.set(target, key, val, receiver);
      return result;
    },
  });
  return p;
}

const data = {
  username: "tom",
  profile: {
    city: "beijing",
    a: {
      b: 12,
      c: {
        d: 23,
      },
    },
  },
};

const p1 = observe(data);
console.log(p1);
```