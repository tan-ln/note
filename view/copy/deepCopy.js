/**
 * 深拷贝
 *      递归复制对象属性的所有层级
 *      对于引用类型则递归
 */

 const deepCopy = function (obj) {
  if (typeof obj !== 'object') return
  const newObj = obj instanceof Array ? [] : {}
  
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key]
    }
  }

  return newObj
}

const obj = {
  id: 1,
  data: {
    p_id: 001
  }
}
const newObj = deepCopy(obj)

obj.id = 'a string id 1'
obj.data.children = ['a child']

// { id: 'a string id 1', data: { p_id: 1, children: [ 'a child' ] } }
console.log(obj)
// { id: 1, data: { p_id: 1 } }
console.log(newObj)
