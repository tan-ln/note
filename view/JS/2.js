// 定义一个函数，求任意个数字的和。

const add = (...args) => {
    let some = 0
    args.forEach(item => {
        if (typeof item !== 'number') return
        some += item
    })
    return some
}

let total = add(1, 1, 2, 4, 5)
console.log(total)
