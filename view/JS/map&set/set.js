// Set 类似于数组，是值的集合，其成员是唯一的

const set = new Set([1, 2, 3, 4, 4])

console.log(set.size)

console.log(Array.from(set))        // 1 2 3 4

set.add(5)
console.log(Array.from(set))        // 1 2 3 4 5

set.add('5')
set.add({
    name: 'name'
})

console.log(Array.from(set))        // 1 2 3 4 5 '5'
