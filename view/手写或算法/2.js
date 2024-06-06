/**
 * 数组组合最小值
    nums=[123,24,53,6,32,12]
    数组中任意三位组合出最小数字
 * 
 */

const num = [123, 24, 53, 6, 32, 12]


const sortedArr = num.sort((a, b) => a - b)
const result = sortedArr.slice(0, 3).reduce((total, a) => total += a)

console.log('🚀 ~ result:', result)





