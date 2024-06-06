// function staircase(n) {
//     let char = ''
//     for (let i = 0; i < n; i++) {
//         for (let j = 0; j < n; j++) {
//             if (j < n - i - 1) {
//                 char += 's'
//             } else {
//                 char += '#'
//             }
//         }
//         console.log(char)
//     }
// }

// staircase(6)

//------------- valueOf toString
// let a = {
//     value: 1,
//     valueOf: function () {
//         console.log('valueOf')
//         return this.value++
//     },
//     toString: function () {
//         console.log('toString')
//         return this.value++
//     }
// }

// if (a==1 && a==2 && a==3) {
//     console.log('hello word')
// }

//----------- 数组
// const arr = [1, 2, 5, 3, 8,7 ,7, 7]
// console.log(arr.slice(1, 3)) // [ 2, 5 ] 返回新

// console.log(arr.splice(2, 3))   // 截取 [ 5, 3, 8 ] 改变原数组

// console.log(arr.some(item => item > 3)) true

// console.log(...arr.keys())
// console.log(...arr.values())
// console.log(...arr.entries())

// 0 1 2 3 4 5 6 7
// 1 2 5 3 8 7 7 7
// [ 0, 1 ] [ 1, 2 ] [ 2, 5 ] [ 3, 3 ] [ 4, 8 ] [ 5, 7 ] [ 6, 7 ] [ 7, 7 ]

// console.log(arr.indexOf(8))

// ------------字符串
// let str = 'asdadadabas'
// console.log(str.charAt(6))

// var ary = Array(3);ary[0]= 2; var result = ary.map(function(elem) { return '1'; }); 
// console.log(...result)

// console.log('start')

// setTimeout(()=>{
//     console.log('执行setTimeout')
// },1000)

// setInterval(()=>{
//     console.log('执行setInterval')
// },1000)

// console.log('end')

// var A = function () {}

// A.prototype.n = 1

// var b = new A()

// A.prototype = {
//     n: 2,
//     m: 3
// }

// var c = new A()

// console.log(b.n, b.m, c.n, c.m) //1 undefined 2 3

// var x = 3
// var foo = {
//     x: 2,
//     baz: {
//         x: 1,
//         bar: function () {
//             return this.x
//         }
//     }
// }

// var go = foo.baz.bar

// console.log(go())       // 3
// console.log(foo.baz.bar())// 1


// const myMap = new Map()
//   .set(true, 7)
//   .set({foo: 3}, ['abc'])

// console.log(...myMap)


// for (var i = 0; i < 3; i++) {
//     setTimeout(function () {
//         console.log(i)     //  3 3 3
//     }, 0);
// }



// var a = 10
// var a = 20
// let b = 5
// let b = 50
// const c = 0.5
// c = 1
// console.log(a)
// console.log(b)
// console.log(c)

const getType = s => Object.prototype.toString.call(s)
const regType = 'object Regexp'
const dateType = 'object Date'
const specTypes = [regType, dateType]

const deepCopy = (source) => {
  if (!source || source === null) return source
  if (getType(source))
}