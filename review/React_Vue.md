# React 和 Vue 的区别

## 语法层面

Vue：
- template
- 指令语法
- 组件实例就是 options 对象的配置
- 双向绑定双向数据流

React：
- jsx （Vue也可以）
- API 少
- 单项数据流自顶向下，props 传递，手动 setState 触发更新
- Hooks 链表


## 深入

### 响应式

Vue：
- （Vue2）收集依赖，对象的属性进行数据劫持，自动派发更新
- defineProperty
- （Vue3）defineProxy 直接对对象代理
- 无需自己（少量）优化

React：
- 基于状态，单向数据流，手动 setState 触发更新
- 以某个组件为起点，重新渲染整棵树
- 需要自己手动优化（React.memo、shouldComponentUpdate）


### Diff

Vue：
- 同层对比，深度优先递归，从两头向中间对比
- 有新的没老的就增加，有老的没新的就删除，
- 新老位置都有则判断是否是一个节点，是则子节点patch，不是同一个节点就删除老的，增加新的

React：
- 同层对比，打标记（新增，删除，更新），所有节点协调完成再统一交给 renderer


## 设计和理念

Vue：
- 响应式 + 渐进式 + 降低门槛
- 精准更新

React：
- UI开发
- 数据不可变
- 函数式编程
- 组件化简单


















