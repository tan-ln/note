const obj = {
  a: 10,
  foo: function () {
    function show () {
      console.log(this.a)
    }
    show()
  }
}

obj.foo()     // undefined 指向 window
