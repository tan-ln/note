const obj = {
  val: 10,
  foo: function () {
    console.log(this.val)
  }
}

const obj2 = {
  val: 20
}

obj2.foo = obj.foo

obj2.foo()            // 20
obj.foo()             // 10