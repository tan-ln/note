/**
 * 
  最长连续子序列 
  nums=[1,2,3,4,2] 
  sum=6
  返回最长连续子集和为sum的 长度  没有就返回-1
  如：1+2+3 = sum = 6  =>  [1,2,3]  => [1,2,3].length = > 3
  return 3
 */

const num = [1, 2, 3, 4, 2, 3, 3]
const sum = 6

const len = num.length
let index = 0
let result = 0

while (index <= sum) {
  let total = 0
  num.slice(index, num.length)
    .some((item, itemIdx) => {
      total += item
      total === sum && result < itemIdx && (
        result = itemIdx + 1
      )
      return total >= sum
    })

  index++
}

console.log(result)
