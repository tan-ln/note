/**
 * js 中的 + 逻辑
 *              有字符串则全部转为字符串   进行拼接
 *  均为原始类型
 * （Null、Undefined、Number、String、Boolean、Symbol、BigInt）
 *              没有字符串则都转为数字     进行加法运算（其他+NaN=NaN）
 * 
 *              
 *  含有对象类型  调用 valueof （将有原始类型的值转为原始类型处理、没有则返回它本身）
 *                  能转为原始类型，则根据原始类型处理
 *                  不能转则调用 toString 转为字符串，再作为原始类型处理
 * 
 *              还有一种是报错的情况
 * 
 */

/**
 *  valueOf() 方法会将原始值返回，非原始类型则返回他本身
 * 
 *  toString() 方法将会 转为字符串，有可能失败报错
 *      - 数组类型：返回,拼接的字符串   '1,2,3'
 *      - 对象类型：返回 '[object Object]'
 *      - 函数类型：返回函数本身字符串 'function () {}'
 */

console.log(null + undefined) // 专为数字=（0+NaN）=NaN
console.log(100 + NaN) // NaN
console.log('100' + NaN) // '100NaN' 有字符串则拼接
console.log(1 + true) // 2 true 转为数字=1


// [2].valueof()
// 尝试转为原始类型，不行，则 toString [13].toString() = '13'
console.log([13] + 12) // 1312

// 对象类型，valueOf() 得到他本身，再 toString() 的到 [object Object] 字符串形式
const a = {
  value: 123
}
console.log(a + 1) // '[object Object]1'

const obj = {
  valueOf: function () {
    return this
  },
  toString: function () {
    return this
  }
}
// console.log(obj + 1)
// 报错 Cannot convert object to primitive value 不能把对象转为原始值

// 对象和数组调用 valueOf 返回他本身
// [1, 2].toString() ==>        '1,2'
// ({ a: 11 }).toString() ====> '[object Object]'
console.log([1, 2] + { a: 11 }) // '1,2[object Object]'

const fn = function () {}
console.log(fn + [12]) // 'function () {}12'
