// 两数之和
let nums = [2, 3, 7, 11, 15]
let target = 9

// const foo = function (nums, target) {
//   let add = 0
//   let temp = []
//   for (let i = 0; i < nums.length; i++) {
//     for (let j = 0; j < nums.length; j++) {
//       add++
//       if (nums[i] + nums[j] === target) {
//         temp = [i, j]
//       }
//     }
//   }
//   console.log(add)
//   return temp
// }


const foo = function (nums, target) {
  let arr = nums.sort((a, b) => a - b)
  let temp = []
  let c = Math.floor(arr.length / 2)
  if (target < arr[c]) {
    arr.slice(0, c).map(item => {

    })
  } else {
    // arr.slice(c)
  }
  return temp
}

console.log(foo(nums, target))
