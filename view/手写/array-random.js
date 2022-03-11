// 数组随机排序

const arr = [1, 5, 6, 4, 8, -4, 25, -100]
const arr2 = ['as', 'zxcerf', 'vcg', '12asd', '川普', '普京']


const randomSort = function (arr) {
  return arr.sort((a, b) => Math.random() * 10 - 1)
}

// console.log(randomSort(arr))
console.log(randomSort(arr2))