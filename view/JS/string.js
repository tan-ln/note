const str = 'qwe123qwe123qwe'

const res = str.split('e', 2)
const res2 = str.slice(2, 8)
const res3 = str.substr(2, 8)
const res4 = str.substring(2, 8)
const res5 = str.substring(8, 2)

// console.log('str: ' + str)
// console.log(res)      // [ 'qw', '123qw' ]
// console.log(res2)     // e123qw
// console.log(res3)     // e123qwe1
// console.log(res4)     // e123qw
// console.log(res5)     // e123qw