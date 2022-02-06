// Object 类型支持键值对 key:value，但key 只能是 string 类型
// Map 支持把各种类型的值作为 键，值:值 对应

const map = new Map([
    ['a', 1],
    ['b', 10]
])

map.set('c', 'ccc')

const oKey = {
    name: 'name'
}
const oValue = {
    name: 'Trump'
}

map.set(oKey, oValue)

console.log(map)

// Map(4) {
//     'a' => 1,
//     'b' => 10,
//     'c' => 'ccc',
//     {
//         name: 'name'
//     } => {
//         name: 'Trump'
//     }
// }

console.log(map.get('b')) // 10

map.delete('c')

console.log(map.has('c')) // false

map.clear()

console.log(map) // Map(0) {}