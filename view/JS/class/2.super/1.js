// ES5 继承
function Food () {
  this.type = 'food'
}

Food.prototype.getType = function () {
  return this.type
}

function Fruit (name) {
  this.name = name
}
Fruit.prototype = new Food()

const apple = new Fruit('apple')
console.log(apple.getType());         // food
console.log(apple instanceof Fruit);  // true
console.log(apple instanceof Food);  // true
