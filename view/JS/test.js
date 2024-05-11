// console.log([...Array(5)].fill('a'));   // [ 'a', 'a', 'a', 'a', 'a' ]

'use strict'

var a = 100

function test () {  
  var a = 1
  console.log(this.a, 111)
}

test()