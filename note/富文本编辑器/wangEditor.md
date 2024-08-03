
# wangEditor

基于 slate.js 和 snabbdom （vdom 渲染）

自定义菜单配置，比如图片上传，自定义上传方法
```js
// 修改 uploadImage 菜单配置
editorConfig.MENU_CONF['uploadImage'] = {
  server: '/api/upload-image',
  fieldName: 'custom-field-name'
  // 继续写其他配置...
  
  //【注意】不需要修改的不用写，wangEditor 会去 merge 当前其他配置
}
```
高级用法，自定义扩展功能
生成邮件 投放数据统计，表格，签名
定义菜单类 实现菜单按钮和触发下拉，注册菜单到 wangEditor，插入到工具栏
四步：
1. 实现一个 自定义菜单class，注册菜单到 wangEditor
2. 让编辑器认识它，否则调用 插入的方法无效 注册一个渲染元素（vnode）到 编辑器
3. 把新元素转为 html （getHtml 有效了）
4. 解析新元素html到编辑器 （setHtml 还没有）

还可以注册插件，劫持编辑器的事件，重写一些方法
