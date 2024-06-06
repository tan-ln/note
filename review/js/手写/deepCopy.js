function deepCopy (target) {
  if (!target) {
    return target
  }
  if (typeof target !== 'object') {
    throw TypeError('object required')
  }

  const result = Array.isArray(target) ? [] : {}

  for (const key in target) {
    const element = target[key];
    result[key] = typeof element === 'object'
      ? deepCopy(element)
      : element
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
    null
  ]
}
const result = deepCopy(obj)
console.log(result)
