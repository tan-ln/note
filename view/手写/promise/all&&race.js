const p1 = new Promise(resolve => {
  setTimeout(() => {
    console.log('exec p1')
    resolve(100)
  }, 1000);
})

const p2 = new Promise(resolve => {
  setTimeout(() => {
    console.log('exec p2')
    resolve([1, 2, 3])
  }, 2000);
})

const p3 = new Promise((resolve, reject) => {
  const func = () => {}
  setTimeout(() => {
    console.log('exec p3')
    reject(func)
  }, 2000);
})

Promise.myAll = (proms) => {
  // 迭代数量
  let count = 0
  // 结果输出
  const result = []
  const p = new Promise((resolve, reject) => {
    for (const prom of proms) {
      console.log(prom)
      Promise.resolve(prom)
        .then((res) => {
          result.push(res)
          count++
          if (count === proms.length) {
            resolve(result)
          }
        }).catch(err => {
          reject(err)
        })
    }
  })

  return p
}

// Promise.myAll([p1, p2, p3]).then(res => {
//   console.log('myAll res', res)
// }).catch(err => {
//   console.log('err', err)
// })



// ------------------------- my race -----------------------------

Promise.myRace = (proms) => {
  return new Promise((resolve, reject) => {
    for (const prom of proms) {
      Promise.resolve(prom).then(res => {
        resolve([res])
      }).catch(err => {
        reject(err)
      })
    }
  })
}

Promise.myRace([p1, p2, p3]).then(res => {
  console.log('myRace res', res)
}).catch(err => {
  console.log(err)
})