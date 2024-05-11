# aHooks

> ahook的输出函数规范中： ahooks 所有的输出函数，**地址都是不会变化的**。

## useUpdate

useUpdate 会返回一个函数，调用该函数会强制组件重新渲染。
```js
const update = useUpdate();
```

原理：
```js
const [, setState] = useState({})

// 使用 useCallback 缓存返回的函数，避免每次渲染都生存新的函数
return useCallback(() => {
  setState({})
}, [])
```

> 但是 useCallback 会有额外的 deps 判断，可以改用 useReducer 实现

```js
const updateReducer = (num) => (num + 1)

const [, update] = useReducer(updateReducer, 0)

return update
```


## useMemorizedFn

`useCallback(() => {}, [deps])` 可以缓存一个函数，但是 deps 变化后会生成一个新的函数

使用 useMemoizedFn，可以省略第二个参数 deps，同时保证函数地址永远不会变化

```js
const [state, setState] = useState(0)
const func = useMemorizedFn(() => {
  console.log(state)
})
```

原理：

设计两个变量
- 一个用于接受新的函数
- 一个只在初始化使用，并且不改变，始终返回不变的函数地址

```js
function useMemorizedFn (fn) {
  const fnRef = useRef(fn)
  fnRef.current = useMemo(() => fn, [fn])

  const memorizedFn = useRef()
  if (!memorizedFn.current) {
    return function (this, ...args) {
      return fnRef.current.apply(this, [args])
    }
  }

  return memorizedFn.current
}
```




















