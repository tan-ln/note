/**
 * 快速排序 
 *    选择一个数作为基准（通常是第一个或者最后一个），每次和基准数比较，小的放左边，大的放右边
 *    每次分割后，基准数就会 插到中间
 *    利用递归把左右数组重复这一过程
 * 
 *    本排序采用 二分法(折半查找) 取中间值作为基准
 * 
 */

const quickSort = function (arr) {
  if (!arr.length) return []
  const centerIdx = Math.floor(arr.length / 2)
  const center = arr.splice(centerIdx, 1)[0]
  const left = []
  const right = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < center) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat([center], quickSort(right))
}

const arr = [1, 5, 7, 8, 4, 5, 3, 1, 0, 9, -4]
// const res = quickSort(arr)
// console.log(res)                           // [-4, 0, 1, 1, 3, 4, 5, 5, 7, 8, 9 ]


/**
 * 二分法查找(折半查找)
 *    找中间值，与其比较，小则查找左边，大则查找右边
 *    递归
 * 
 * 必须是有序数组
 */
const binarySearch = function (key, arr) {
  let left = 0, right = arr.length - 1
  while (left <= right) {
    let mid = parseInt((right - left) / 2) + left
    if (arr[mid] == key) {
      return mid
    } else if (key > arr[mid]) {
      left = mid + 1
    } else if (key < arr[mid]) {
      right = mid - 1
    }
  }
  return -1
}

// 必须是有序数组 [-4, 0, 1, 1, 3, 4, 5, 5, 7, 8, 9 ]
const findRes = binarySearch(3, quickSort(arr))        // 4 下标
// const findRes = binarySearch(10, quickSort(arr))        // -1 不存在
console.log(findRes)