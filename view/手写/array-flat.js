// 数组拍平


// 递归 reduce
function arrayFlat (arrParam) {
  return arrParam.reduce((total, item) => {
    const target = Array.isArray(item) ? [...arrayFlat(item)] : [item]
    total.push(...target)
    return total
  }, [])
}

const arr = [1, 2, [3, 4, [5, 6]]]

console.log(arrayFlat(arr))

// toString
// arr.toString(): '1,2,3,4,5,6'
console.log(arr.toString().split(',').map(v => Number(v)))
