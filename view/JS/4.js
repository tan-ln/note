// 编写一个函数，计算三个数字的大小，按从小到大顺序输出。
const order = function (...args) {
    let res = args.sort((a, b) => a - b)
    console.log(res)
    return res
}

order(44, 51, 03)