# vue 插槽多级传递

> 需求：父组件定义多个插槽需要在孙组件生效

```js
// parent
<A>
  <B />
  <C />
</A>
// child
<B>
  <D />
</B>
// grandson
<D>
  <slot></slot>
</D>
```

```js
// page A
<A>
  <template slot="fdPlatformName" slot-scope="{$index, row}"></template>
  <template slot="fdPlatformName" slot-scope="{$index, row}"></template>
  <template slot="fdPlatformName" slot-scope="{$index, row}"></template>
</A>
// compnoent A
<div>
  // this.$scopedSlots 包含所有作用域插槽
  <template v-for="(index, name) in $scopedSlots" :slot="name" slot-scope="{$index, row}">
    <slot :name="name" :$index="$index" :row="row"></slot>
  </template>
</div>

// component D
<slot :name="name" :$index="$index" :row="row"></slot>
```


# 除 v-model 情况外 的 双向绑定
```js
<c-layout
  class="container"
  :loading="loading"
  :params.sync="params" // .sync 缩写
  :searchSettings="searchSettings"
  :tableSettings="tableSettings"
  @handleSearch="handleSearch"
  @resetHandle="resetHandle"
  @handleSearchRowSort="handleSearchRowSort"
  @updateColumnsByCache="updateColumnsByCache"
  @exportAll="exportAll"
  @enrollForBlogger="enrollForBlogger"
/>
```

通常是使用 `update:propName` 的形式 *抛出事件*
```js
this.$emit('update:params', params)
```

相当于
```js
<ChildComponent :title="pageTitle" @update:title="pageTitle = $event" />
// 使用 .sync 修饰符 简写
<ChildComponent :title.sync="pageTitle" />
```