/**
 * 生成随机颜色
 *
 * @returns 返回一个6位的16进制颜色字符串，以'#'开头
 */
function randomColor () {
  // return '#' + Math.floor(Math.random() * 0xffffff).toString(16)
  return '#' + Math.random().toString(16).substring(2, 8).padEnd(6, '0')
}

console.log(randomColor())

/**
 * 生成随机字符串
 *
 * @param len 字符串长度，默认为6
 * @returns 返回一个长度为len的随机字符串，字符由0-9和a-z组成
 */
function randomString (len = 6) {
  if (len <= 11) {
    return Math.random().toString(36).substring(2, 2 + len).padEnd(len, '0')
  } else {
    return randomString(11) + randomString(len - 11)
  }
}

console.log(randomString(123))