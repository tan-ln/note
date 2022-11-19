- 用法
```css
div {
  background-color: rgba(0, 0, 0, .5);
}

a {
  opacity: .5;
}
```

- 区别

1. opacity作用于元素，以及元素内的所有内容的透明度，设置的透明度会被子级元素继承 ；rgba()只作用于元素的颜色或其背景色。（设置rgba透明的元素的子元素不会继承透明效果！）

2. rgba 可以设置background-color , color , border-color , text-shadow , box-shadow

