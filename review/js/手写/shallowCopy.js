// 牵拷贝
// 只拷贝第一层

function shallowCopy (target) {
  if (!target) {
    return target
  }
  if (typeof target !== 'object') {
    throw TypeError('object required')
  }

  const result = Array.isArray(target) ? [] : {}
  for (const key in target) {
    const element = target[key];
    result[key] = element
  }

  return result
}

const obj = {
  a: 1,
  b: {
    value: 114514
  },
  c: [
    {
      show: () => {}
    },
    null,
    [
      {
        deep: [
          {
            some: 'some'
          }
        ]
      }
    ]
  ]
}
const result = shallowCopy(obj)
console.log(result)
// console.log(Object.assign(obj))