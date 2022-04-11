// ES5 构造函数创建
function Point (x, y) {
  this.x = x
  this.y = y
}

Point.prototype.getPosition = function () {
  return '(' + this.x + ', ' + this.y + ')'
}

var p1 = new Point(10, 20)
console.log(p1)                       // Point { x: 10, y: 20 }
console.log(p1.getPosition())         // (10, 20)
