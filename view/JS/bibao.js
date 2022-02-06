const func = (function () {
    var a = 0

    for (let i = 0; i < 5; i++) {
        a = i
    }

    return function () {
        return a
    }
})()

console.log(func())

// 闭包内部得到外部函数的变量的最后一次值