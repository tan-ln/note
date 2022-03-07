// 判断一个字符串中出现次数最多的字符，统计这个次数
// 1. string.match()
const str = 'asdfssaaasasasasaa'

const checkStrNum = function (str) {
  const arr = str.split('')
  let temp = {}
  arr.forEach(item => {
    // eval 将字符串转为可执行代码
    // match() 返回找到的匹配结果数组
    // 如 [ 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a' ]
    const length = str.match(eval(`/${item}/g`)).length
    if (!temp.length || temp.length < length) {
      temp = { item, length }
    }
  })
  return temp
}

// const { item, length } = checkStrNum(str)
// console.log(`出现最多的是: ${item}, 出现了 ${length} 次`)

// 2. reduce
const str2arr = str.split('')
const res = str2arr.reduce((obj, curVal) => {
  if (curVal in obj) {
    obj[curVal]++
  } else {
    obj[curVal] = 1
  }
  return obj
}, {})

console.log(res)      // { a: 9, s: 7, d: 1, f: 1 }

/**
 * 数组的重复次数
 * 1. reduce
 * 初始值: 若使用 curVal in total 则必须初始值设置为 {}
 *  total[curVal]: num
 *  key = curVal 数组成员
 *  value = num 出现次数
 */

// const arrRep = ["b", "c","b", "c","a", "b", "c"]

// const res = arrRep.reduce((total, curVal) => {
//   if (curVal in total) {
//     total[curVal]++
//   } else {
//     total[curVal] = 1
//   }
//   return total
// }, {})
// console.log(res)      // { b: 3, c: 3, a: 1 }


/**
 * 对象排序
 */

// const arr = [
//   { id: 1, sorts: 5 },
//   { id: 4, sorts: 3 },
//   { id: 5, sorts: 6 },
//   { id: 3, sorts: 1 },
//   { id: 3, sorts: 3 },
//   { id: 2, sorts: 2 },
// ]

// const sortFun = function (a, b) {
  // 按 sorts 从小到大 排序
  // return a.id - b.id == 0 ? a.id - b.id : a.sorts - b.sorts

  // 按 id 从大到小 排序
  // return a.sorts - b.sorts == 0 ? a.sorts - b.sorts : b.id - a.id
// }

// const res = arr.sort(sortFun)
// const res = arr.sort((a, b) => a.id - b.id)
// console.log(res)