/**
 * 冒泡排序
 * 每个成员与相邻比较，然后交换
 * 
 */

// 1. 
const bubbleSort = function (arr) {
  let num = 0
  let l = arr.length
  for (let i = 0; i < l; i++) {
    for (let j = i + 1; j < l; j++) {
      if (arr[i] > arr[j]) {
        num++
        let temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
      }
    }
  }
  console.log(num)
  return arr
}

// 2. 
const bubbleSort2 = function (arr) {
  let num = 0
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] > arr[j + 1]) {
        num++
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }           
    }
  }
  console.log(num)
  return arr
}

// 3.
const bubbleSort3 = function (arr) {
  let num = 0
  const l = arr.length
  for (let i = l; i >= 2; i--) {
    for (let j = 0; j < i-1; j++) {
      if (arr[j + 1] < arr[j]) {
        num++
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  console.log(num)
  return arr
}

const arr = [1, 5, 7, 8, 4, 5, 3, 1, 0, 9]
// const res = bubbleSort(arr)             // num: 20
// const res = bubbleSort2(arr)            // num: 24
// const res = bubbleSort3(arr)            // num: 24
console.log(res)                           // [ 0, 1, 1, 3, 4, 5, 5, 7, 8, 9 ]
