async function asy1 () {
  console.log(1)
  await asy2()
  console.log(2)
}

async function asy2 () {
  await setTimeout((_) => {
    Promise.resolve().then((_) => {
      console.log(3)
    })
    console.log(4)
  }, 0)
}

async function asy3 () {
  Promise.resolve().then((_) => {
    console.log(6)
  })
}

asy1()
console.log(7)
asy3()


/**
 * 不看函数声明，直接看函数调用
 * 执行 asy1 同步代码
 * 打印 1
 * 
 * 
 * 
 */

