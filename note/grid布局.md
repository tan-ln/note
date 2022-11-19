https://www.php.cn/blog/detail/25595.html

https://www.cnblogs.com/evil-shark/p/16457938.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title></title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    li {
      list-style: none;
    }

    a {
      color: #444;
      text-decoration: none;
    }

    header {
      height: 60px;
      background-color: gray;
      margin-bottom: 30px;
    }

    header>ul.hnav {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      grid-template-rows: 60px;
      place-items: center;
    }

    footer {
      height: 160px;
      color: #EEE;
      background-color: #444;
    }

    .main-top {
      width: 1200px;
      height: 510px;
      display: grid;
      grid-template-columns: 216px 1fr;
      grid-template-rows: 60px 1fr 120px;
      margin: auto;
    }

    .main-top>nav.menus {
      background-color: lightgreen;
      grid-area: span 3;
      border-radius: 10px 0 0 10px;
    }

    .main-top>ul.nav {
      background-color: lightcyan;
      display: grid;
      grid-template-columns: repeat(8, 83px) 1fr;
      place-items: center;
    }

    .main-top>ul.nav>li:last-of-type {
      place-self: center start;
      padding-left: 30px;
    }

    .main-top>ul.course {
      background-color: wheat;
      display: grid;
      padding: 10px;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
    }

    .main-top>ul.course>* {
      background-color: violet;
      cursor: pointer;
    }

    /* 横图 */
    .row-image {
      height: 80px;
      margin-top: 20px;
      background-color: lightslategray;
      margin: auto;
    }

    .row-image h1 {
      text-align: center;
      line-height: 80px;
      color: white;
    }

    /* ------------------------------------------------------------------------------------------ */
    .recommend {
      width: 1200px;
      height: 446px;
      background-color: yellowgreen;
      margin-top: 20px;
      display: grid;
      grid-template-columns: 300px 1fr 260px;
      padding: 15px;
      gap: 10px;
      margin: auto;
    }

    .recommend .article {
      background-color: lightcyan;
      display: grid;
      grid-template-rows: 36px 1fr;
      padding: 15px;
    }

    .recommend .article h4 {
      margin-left: 10px;
    }

    .recommend .article>ul.artul {
      display: grid;
      grid-template-rows: repeat(12, 1fr);
    }

    /* ----------------------------------- */
    .recommend .course {
      background-color: lightcyan;
      display: grid;
      grid-template-rows: 36px 1fr;
      padding: 15px;
    }

    .recommend .course h4 {
      margin-left: 10px;
    }

    .recommend .course>ul.cou-list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, 1fr);
      gap: 20px;
    }

    .recommend .course>ul.cou-list>* {
      background-color: lightgreen;
      border-radius: 10px;
    }

    /* ------------------------------------ */
    .recommend .manual {
      background-color: lightcyan;
      display: grid;
      grid-template-rows: 36px 1fr;
      padding: 15px;
    }

    .recommend .manual>div:first-of-type {
      margin-left: 10px;
      display: flex;
      justify-content: space-between;
    }

    .recommend .manual>ul.man-list {
      display: grid;
      grid-template-rows: repeat(6, 1fr);
    }

    .recommend .manual>ul.man-list>li {
      display: grid;
      grid-template-columns: 50px 1fr;
      gap: 10px;
      margin-bottom: 10px;
    }

    .recommend .manual>ul.man-list>li>img {
      background-color: lightsalmon;
    }

    .recommend .manual>ul.man-list>li>a {
      place-self: center start;
    }

    /* ---------------------------------------------------------------------- */
    .main-courses {
      width: 1200px;
      height: 646px;
      padding: 15px;
      background-color: lightskyblue;
      margin: 30px auto;
      display: grid;
      grid-template-rows: 50px 1fr;
      gap: 20px;
    }

    .main-courses h3 {
      color: #444;
      text-align: center;
      margin-bottom: 30px;
    }

    .main-courses .course-list {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: repeat(3, 1fr);
      gap: 20px;
    }

    .main-courses .course-list>* {
      background-color: lightcyan;
      border-radius: 10px;
    }

    .main-courses .course-list>li:first-of-type {
      grid-area: span 2;
    }
  </style>
</head>

<body>
  <div class="main-top">
    <nav class="menus">菜单组</nav>
    <!-- 顶部菜单 -->
    <ul class="nav">
      <li><a href="">item1</a></li>
      <li><a href="">item2</a></li>
      <li><a href="">item3</a></li>
      <li><a href="">item4</a></li>
      <li><a href="">item5</a></li>
      <li><a href="">item6</a></li>
      <li><a href="">item7</a></li>
      <li><a href="">item8</a></li>
      <li><input type="text" placeholder="输入关键字"></li>
    </ul>
    <div class="slider">
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
      </ul>
    </div>
    <!-- 底部课程推荐 -->
    <ul class="course">
      <li><a href=""><img src="" alt=""></a></li>
      <li><a href=""><img src="" alt=""></a></li>
      <li><a href=""><img src="" alt=""></a></li>
      <li><a href=""><img src="" alt=""></a></li>
    </ul>
  </div>
</body>

</html>
```

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"> 
<title>菜鸟教程(runoob.com)</title>
<style>
.grid-container {
  display: grid;
  grid-template-columns: auto auto;
  background-color: #2196F3;
  grid-gap: 10px 12px;
}
.grid-item {
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.8);
  font-size: 30px;
  text-align: center;
}
.a {
  height: 100px;
}
.b {
  display: grid;
  place-content: space-between;
}
.c {
  height: 40px;
  background-color: rgb(206, 138, 138);
}
.d {
  height: 40px;
  background-color: rgb(51, 173, 92);
}
.e {
  grid-row: 2/4;
  background-color: rgb(203, 194, 74);
  place-self: top center;
}
</style>
</head>
<body>

<h1>网格元素</h1>

<p>网格布局父元素的 <em>display</em> 属性需要设置 <em>grid</em> 或 <em>inline-grid</em>。</p>

<p>网格容器内的直系子元素自动布局为网格元素。</p>

<div class="grid-container">
  <div class="grid-item a">1</div>
  <div class="grid-item b">
    <div class="c">2-1</div>
    <div class="d">2-2</div>
  </div>
  <div class="grid-item e">3</div>
  <div class="grid-item">5</div>
  <!-- <div class="grid-item">6</div> -->
</div>

</body>
</html>
```