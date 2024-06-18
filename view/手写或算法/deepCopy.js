const deepCopy = function (source) {
  if (typeof source !== 'object' || source === null) return source

  if (source instanceof Date) {
    return new Date(source)
  }

  if (source instanceof RegExp) {
    return new RegExp(source)
  }

  const result = Array.isArray(source) ? [] : {}
  for (let key in source) {
    const value = source[key]
    result[key] = typeof value === 'object'
      ? deepCopy(value)
      : value
  }
  return result

  // 非原始值
  // if (Array.isArray(source)) {
  //   const clone = []
  //   for (const item of source) {
  //     clone[item] = deepCopy(item)
  //   }
  //   return clone
  // }

  // if (typeof source === 'object' && source !== null) {
  //   if (source instanceof Date) {
  //     return new Date(source)
  //   }
  
  //   if (source instanceof RegExp) {
  //     return new RegExp(source)
  //   }

  //   const clone = {}
  //   for (const key in source) {
  //     const element = source[key];
  //     clone[key] = deepCopy(element)
  //   }

  //   return clone
  // }
  // return source
}

const obj = {
  a: 1,
  b: [1, 2, {
    c: function () {}
  }],
  c: new Date(),
  d: new RegExp(/\.i+s+S/g),
  e: '123',
  f: Number.MAX_SAFE_INTEGER
}

console.log(obj.c)

const res = deepCopy(obj)

console.log('🚀 ~ res:', res)

