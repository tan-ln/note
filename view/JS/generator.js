function *main(x) {
    let y = 0.5 * (yield (x + 6))
    let z = yield (y * 3)
    
    console.log('x=' + x + ', y=' + y + ', z=' + z)
    return x + y + z
}

let it = main(2)
let res = it.next()          
console.log(res.value)     // 8
res = it.next(20)            
console.log(res.value)     // 30
res = it.next(50)           
console.log(res.value)     // 62