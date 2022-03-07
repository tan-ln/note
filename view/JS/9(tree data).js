// JavaScript将具有父子关系的原始数据格式化成树形结构数据(id,pid)

const data = [
  { id: 1, name: '1' },
  { id: 2, name: '1-1', p_id: 1 },
  { id: 3, name: '1-1-1', p_id: 2 },
  { id: 4, name: '1-2', p_id: 1 },
  { id: 5, name: '1-2-2', p_id: 4 },
  { id: 6, name: '1-1-1-1', p_id: 3 },
  { id: 7, name: '2'}
]

// 输出格式
const finallData = [{
  id: 1,
  name: '1',
  children: [{
    id: 2, name: '1-1', p_id: 1,
    children: [{
      id: 3, name: '1-1-1', p_id: 2,
      children: [{
        id: 6, name: '1-1-1-1', p_id: 3
      }]
    }]
  }, {
    id: 4, name: '1-2', p_id: 1,
    children: [{
      id: 5, name: '1-2-2', p_id: 4
    }]
  }]
}, {
  id: 7,
  name: '2'
}]

const toTreeData = function (arr) {
  const parents = []
  const children = []
  arr.forEach(item => item.p_id ? children.push(item) : parents.push(item))

  const treeEffect = function (parents, children) {
    parents.forEach(parent => {
      children.forEach((child, idx) => {
        if (parent.id === child.p_id) {
          // 复制 子节点数组
          const temp = JSON.parse(JSON.stringify(children))
          // 删除当前子节点
          temp.splice(idx, 1)
          // 把当前子节点作为父节点数组，递归 是否有其它节点是 当前子节点的 孙子节点
          treeEffect([child], temp)
          // 把子节点放到对应的父节点 children 属性当中
          parent.children ? parent.children.push(child) : (parent.children = [child])
        }
      })
    })
  }

  treeEffect(parents, children)
  return parents
}

const res = toTreeData(data)
console.log(res)