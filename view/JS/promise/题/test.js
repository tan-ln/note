// const getData = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve([])
//     }, 2000);
//   })
// }

// async function doSearch () {
//   console.log('do search')
//   const data = await getData()
//   console.log(data)
// }

// console.log('script start')
// doSearch()
// console.log('script end')


/**
 *  script start
    do search
    script end
    []
 * 
 */


async function async1 () {
  console.log('async1 start')
  await async2() // 相当于 promise executor 是同步执行的
  // 下面转为异步
  console.log('async1 end 1')
  await async3()
  console.log('async1 end 2')
}

async function async2 () {
  console.log('async2--')
}


async function async3 () {
  console.log('async3--')
}

console.log('script start')
async1()
console.log('script end')

/**
 *  script start
    async1 start
    async2--
    script end
    async1 end 1
    async3--
    async1 end 2
 */
