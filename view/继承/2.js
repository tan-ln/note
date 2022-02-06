function Parent (name, age) {
    this.name = name
    this.age = age
}
Parent.prototype.show = function () {
    console.log(this.name + this.age)
}

function Child () {
    // 借用父类构造函数
    Parent.call(this, ...arguments)
}

// 子类原型作为父类实例
Child.prototype = new Parent()

const ccc = new Child('par', '12')

ccc.show()