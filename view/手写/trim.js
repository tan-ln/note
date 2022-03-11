// 正则实现 trim

const toTrim = function (str) {
  const RegExp = /^(\s*)|(\s*)$/g
  const newStr = str.replace(RegExp, '')
  return JSON.stringify(newStr)
}

const str = ' 123ar asd  asdasd  '
const res = toTrim(str)
console.log(res)          // "123ar asd  asdasd"

