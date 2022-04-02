# Vertical-align

> `vertical-align` 是用来设置*行内元素*对齐方式的。或者说 `display` 属性值为 `inline、inline-block、inline-table` 另加一个 `table-cell` 的元素

## 基线

基线的位置并不是固定的：

- 在文本之类内联元素中，基线是字符的下边缘位置
- 在像 `img` 元素中基线就是下边缘。
- 在 `inline-block` 元素中，也分两种情况

  * `inline-block` 元素盒子里，没有内容(流内内容)，是一个空的盒子时，`baseline` 位置就是该盒子 `margin-bottom` 的边界（没有 `margin-bottom` 值，就是盒子的边界值）。
  * `inline-block` 元素盒子里，有内容元素，并且 `overflow` 属性值为 `visible` 时(默认值)，那么该盒子的 `baseline` 位置就是里面最后一个内容元素的`baseline`。
  * `inline-block` 元素盒子里，有内容元素，并且 `overflow` 属性值为非 `visible` 时 (比如 `overflow: hidden;` )，那么该盒子的`baseline`位置就是该盒子margin-bottom 的边界。

## 属性取值

1. baseline: 默认值，就是基线对齐
```html
<div style="background: blue">
  x
  <img src="./box.png">
  <span style="display: inline-block;">vertical</span>
  <span style="display: inline-block; overflow: hidden;height: 80px;">123</span>
</div>
```

> 最下面将会出现空隙，被默认行高撑开的

2. middle: 让子元素盒子垂直中点与行盒子的 `baseline` 加 字母 *X* 高度的一半对齐

3. text-top: 子元素盒子的顶部和行盒子里内容区域的顶部对齐

4. text-bottom: 子元素盒子的底部和行盒子里内容区域的底部对齐

5. sub: 降低子元素盒子的基线到父元素盒子下标的位置

6. super: 升高子元素盒子的基线到父元素盒子上标的位置

7. top: 子元素盒子的顶部相对行盒子的顶部对齐

8. bottom: 子元素盒子的底部和行盒子的底部对齐

## 图片默认间隙问题
```html
<style>
  #root {
    text-align: center;
    width: 600px;
    background-color: rgb(255, 174, 82);
  }
</style>
<body>
  <div id="root">
    <img src="https://img-blog.csdnimg.cn/20201014180756922.png?x-oss-process=image/resize,m_fixed,h_64,w_64" alt="">
  </div>
</body>
```

原因：图片为行内元素，默认垂直对齐方式 `vertical-align: baseline` ，所以底边留有空隙

解决办法：
1. 图片的元素类型进行转换
```css
img {
  display: block;
}
```
2. 改变对齐方式
```css
img {
  vertical-align: middle;
}
```
3. 设置 `font-size`
> 没有默认空文本内容在旁干扰
```css
#root {
  font-size: 0;
}
```