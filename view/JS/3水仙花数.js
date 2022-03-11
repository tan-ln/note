// 水仙花数： 1个三位数的每一个位数的立方和 等于它自己 这样的数字叫做水仙花数

for (let i = 100; i<= 999; i++) {
    let a = parseInt(i / 100)
    let b = parseInt(i % 100 / 10)
    let c = i % 10

    let sum = a*a*a + b*b*b + c*c*c
    if (sum === i) {
        console.log(i)
    }
}