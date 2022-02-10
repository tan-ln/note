// 定义一个函数，求任意个数字的和。

// const add = (...args) => {
//     let some = 0
//     args.forEach(item => {
//         if (typeof item !== 'number') return
//         some += item
//     })
//     return some
// }

const add = function () {
    const _args = [...arguments]
    return _args.reduce((a, b) => a + b)
}

let total = add(1, 1, 2, 4, 5)
console.log(total)      // 13

// function currying () {
//     var _args = [...arguments]
//     var adds = function () {
//         _args.push(...arguments)
//         return adds
//     }
//     adds.toString = function () {
//         return _args.reduce((a, b) => a + b )
//     }
//     return adds
// }
// console.log(currying(1, 2, 3)(4))
