# H5 API Drag 拖拽

> 若要拖放某个元素，则必须将其的 `draggable` 属性设置为 `true`    
> `img` 和 `a` 元素默认为 `true`

## 拖放事件

> 拖放的过程中被拖放的对象被称为*源对象*，过拖放过程中间经过的其他对象被称为*过程对象*，最终到达的对象称作*目标对象*。

- 源对象: 
  * `dragstart`: 源对象开始拖放，开始移动时事件触发
  * `drag`: 源对象拖放过程中，移动被拖拽对象时触发
  * `dragend`: 源对象拖放结束，整个拖放操作结束时触发
- 过程对象: 
  * `dragenter`: 源对象进入过程对象范围内，被拖拽对象进入过程对象时被触发
  * `dragover`: 源对象在过程对象范围内移动，被拖拽对象在过程对象内移动时触发
  * `dragleave`: 源对象离开过程对象的范围，被拖拽对象离开目标对象时触发
- 目标对象: 
  * `drop`: 源对象拖放到目标对象中，目标对象完全接受被拖拽对象时触发，可理解为在目标对象内松手时触发

## dataTransfer 对象
> 在所有的拖放事件中都提供了一个数据传输对象 `dataTransfer` ，主要是用于在*源对象*和*目标对象*之间*传递数据*

- `setData(format, data)`
  * `format` 表示要存入的数据类型，共有4种：
    ```
    text/plain
    text/html
    text/xml
    text/uri-list
    ```
  * `data` 为要存入的数据

    例如：`event.dataTransfer.setData('text/plain', 'hello world')`

  > 注：如果给定类型的数据不存在，则将其添加到拖动数据存储的末尾，使得 `dataTransfer.types` 列表中的最后一个项目将是新类型。

- `getData(format)`

  该方法从 `dataTransfer` 对象中读取数据，参数为在 `setData方` 法中指定的数据类型，例如：`event.dataTransfer.getData('text/plain')`

- `clearData()`

  该方法清空 `dataTransfer` 对象中存储的数据，参数可选，为数据类型。若为空，则清空所有数据。

- `setDragImage(element,x,y)` 该方法通过 img 元素来设置拖放图标

  * `element` 表示拖拽时鼠标下面的图片（通常是 `image` 元素，也可以说 `canvas` 元素）
  * `x、y` 分别指示相对于图片的横向和纵向偏移量，相对应鼠标指针。
  
- `files` 属性

  返回被拖拽的文件列表，是一个 `FileList` 对象，有 `length` 属性，可通过下标访问

## 例子
```html
<body>
  <h3>金币 拖入 钱袋 的时候消失</h3>
	<img id="coin1" class="coin" src="https://img2.baidu.com/it/u=1887149691,564116742&fm=253&fmt=auto&app=138&f=JPEG?w=330&h=325" alt="coin">
	<img id="coin2" class="coin" src="https://img2.baidu.com/it/u=1887149691,564116742&fm=253&fmt=auto&app=138&f=JPEG?w=330&h=325" alt="coin">
	<img id="coin3" class="coin" src="https://img2.baidu.com/it/u=1887149691,564116742&fm=253&fmt=auto&app=138&f=JPEG?w=330&h=325" alt="coin">
	<br>
	<img class="bag" id="bag" src="https://img1.baidu.com/it/u=1595129334,3379693149&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
	alt="">
</body>
<script>
  const coins = document.getElementsByClassName('coin')
  for (let i = 0; i < coins.length; i++) {
    coins[i].ondragstart = function (e) {
      e.dataTransfer.setData('coin_id', this.id)
      console.log('drag start : ' + this.id)
    }
  }
  bag.ondragenter = function (e) {
    console.log('drag enter bag')
    bag.style.opacity = 1
  }
  bag.ondragleave = function (e) {
    console.log('drag leave bag')
    bag.style.opacity = .2
  }
  bag.ondragover = function (e) {
    e.preventDefault()
  }
  // ondragover preventDefault 时才会触发
  bag.ondrop = function (e) {
    bag.style.opacity = .2
    const coin_id = e.dataTransfer.getData('coin_id')
    const coin = document.getElementById(coin_id)
    document.body.removeChild(coin)
    console.log(coin_id + ' : drop into the bag')
  }
</script>
```
