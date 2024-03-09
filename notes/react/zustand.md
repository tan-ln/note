# Zustand

```ts
export const useStore = create<TtsState>()((set) => ({
  speakerMap: [],
  settingSpec: undefined,
  getSource: async () => {
    const { data: res } = await getSpeakerSource();
    const { speakerMap, settingSpec } = res.data;
    set((state) => ({
      ...state,
      speakerMap,
      settingSpec,
    }));
  },
  getConfig: getTtsConfig,
  saveConfig: saveTtsConfig,
  getTestAudio,
}));
```

## immer 中间件
```ts
export const useStore = create<TtsState>()((set) => ({
  speakerMap: [],
  settingSpec: undefined,
  getSource: async () => {
    const { data: res } = await getSpeakerSource();
    const { speakerMap, settingSpec } = res.data;
    // 可直接修改 state
    set((state) => {
      state.speakerMap = []
      state.settingSpec = undefined
    });
  },
  getConfig: getTtsConfig,
  saveConfig: saveTtsConfig,
  getTestAudio,
}));
```


## useShallow

```ts
const speakerMap = useStore(state => state.speakerMap)

// 解构时，其他state 的变化也会导致订阅者更新，即使没有使用
const { speakerMap } = useStore()
// 或
const { speakerMap } = useStore(state => ({
  speakerMap: state.speakerMap
}))

// 使用 useShallow 可避免
const { speakerMap } = useStore(useShallow(state => ({
  speakerMap: state.speakerMap
})))
```

## persist
持久化存储

partialize：可选择存储哪些数据
store: createJSONStore(() => sessionStorage) 默认 localStorage 可选sessionStorage



## subscribe
场景：
AB两组件共用状态 count，A组件改变 count 值，B 组件判断当 count 大于 10执行一段逻辑
为避免每次count 改变都导致B重新渲染

```js
useEffect(() => {
  const cancelSubscribe = useStore.subscribe((state, prevState) => {
  })
  return cancelSubscribe
}, [])
```

## subscribeWithSelector
subscribe 默认监听state中所有的属性，subscribeWithSelector 中间件

## setState

```ts
useStore.setState(state => ({
  ...state,
}))
```