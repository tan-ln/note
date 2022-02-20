setTimeout(() => {
  console.log(1)
}, 0)

new Promise((resolve, reject) => {
  console.log(2)
  resolve(3)
}).then(num => {
  console.log(num)
})

process.nextTick(() => console.log(4))

console.log(5)      // 2 5 4 3 1
