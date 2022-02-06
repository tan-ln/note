function Parent () {}
Parent.prototype.show = function () {
    console.log('parent')
}

function Child () {}

// 子类原型作为父类的实例
Child.prototype = new Parent()
const c = new Child()

c.show()