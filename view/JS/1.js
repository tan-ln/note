var shanchu = "sa"
var yuan = "This is an apple"
let arr = yuan.split(' ')
arr.forEach((item, idx) => {
    arr[idx] = item.replace(/['s', 'a']/, '')
})

console.log(arr.join(' '))