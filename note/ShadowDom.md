# Shadow Dom

> ### 什么是 Shadow Dom

​	Shadow Dom：影子 Dom，可以理解为潜藏在背后的 DOM 结构，也就是我们无法直接控制操做的 DOM 结构。

![Shadow Dom Open](./assets//shadow-root.png)

图中的 `#shadow-root` 中包含的内容其实就是 `Shadow-Dom`

`Shadow-Dom` 其实是浏览器的一种能力，它允许在浏览器渲染文档 `document` 的时候向其中的 `Dom` 结构中插入一棵 `DOM 元素子树`，但是特殊的是，这棵子树`Shadow-Dom 并不在主 DOM 树中`。

它相当于一个 **作用域** 的概念，使其不会被外部所影响。可以把它理解成一颗单独的dom树。这样就不会有 css 的命名冲突或者样式的意外泄漏。








[https://blog.csdn.net/qq_42872073/article/details/125607826]

[https://www.cnblogs.com/yf2196717/p/14732459.html]

[https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_shadow_DOM]