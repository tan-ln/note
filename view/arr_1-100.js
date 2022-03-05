const arr = []
arr.length = 10
// console.log(arr)
// console.log([...Array(101).keys()])		// 0 - 99
// console.log([...Array(101).keys()].slice(1, 101))		// 1 - 100
// console.log(Object.keys(Array.from({ length:100 })))		// '0' - '99'
console.log(Object.keys(Array.from(Array(100))))