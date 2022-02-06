// 报7游戏的安全数
const no7 = function () {
    for (let i = 0; i <= 50; i++) {
        if (i % 7 === 0 || i % 10 === 7) {
            console.log(i)
        }
    }
}

no7()