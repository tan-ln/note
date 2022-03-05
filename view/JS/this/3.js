const obj = {
  a: 10,
  foo: function () {
    return function () {
      console.log(this.a)
    }
  }
}

obj.foo()()         // undefined 指向 window
