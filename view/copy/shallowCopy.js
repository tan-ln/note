/**
 * 浅拷贝
 *    只复制对象属性的一个层级
 *    对于引用类型，则复制的是他们的引用
 */

const shallowCopy = function (obj) {
  if (typeof obj !== 'object') return
  const newObj = obj instanceof Array ? [] : {}
  
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key]
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
const newObj = shallowCopy(obj)

obj.id = 'a string id 1'
obj.data.children = ['a child']

// { id: 'a string id 1', data: { p_id: 1, children: [ 'a child' ] } }
console.log(obj)
// { id: 1, data: { p_id: 1, children: [ 'a child' ] } }
console.log(newObj)
