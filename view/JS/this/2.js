const obj = {
  a: 10,
  foo: function () {
    console.log(this.a)
  }
}

const temp = obj.foo
obj.foo()                 // 10
temp()                    // undefined      指向 window 相当于 temp: function () {  console.log(this.a) }
