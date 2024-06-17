const flatArr = [
  {
    id: 'a',
    parentId: null 
  },
  {
    id: 'a-1',
    parentId: 'a'
  },
  {
    id: 'b',
    parentId: null,
  },
  {
    id: 'b-1',
    parentId: 'b'
  },
  {
    id: 'b-2',
    parentId: 'b'
  },
  {
    id: 'c-1',
    parentId: 'c'
  }
]

const tree = (target) => {
  const result = {}
  const extra = []

  function loop (obj, source) {
    for (let i = 0; i < source.length; i++) {
      const item = source[i]

      if (obj.parentId && item.id && item.id === obj.parentId) {
        item.children
          ? item.children.push(obj)
          : (item['children'] = [obj])

        const delIdx = extra.findIndex(v => v.id === obj.id)
        delIdx !== -1 && extra.splice(delIdx, 1)
      } else if (item.children && item.children.length) {
        loop(obj, item.children)
      } else {
        console.log('extra', obj)
        !extra.find(v => v.id === obj.id) && extra.push(obj)
      }
    }
  }

  // 先找出根节点
  const roots = target.filter(v => !v.parentId)
  if (roots.length) {
    if (roots.length === 1) {
      result = {
        children: [],
        ...roots[0]
      }
    } else {
      result['id'] = 'root'
      result['children'] = roots
    }
  }

  target.map(item => {
    if (item.parentId) {
      loop(item, result.children)
    }
  })

  console.log(extra)

  return result
}

const result = tree(flatArr)

console.log('🚀 ~ result:', result.children[0].children)

