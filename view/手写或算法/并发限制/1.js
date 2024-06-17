const sleep = (timeout, taskName) => {
  return new Promise((resolve) => {
    console.log(`${taskName}：开始`)
    setTimeout(() => {
      console.log(`${taskName}：结束`)
      resolve()
    }, timeout);
  })
}

const taskList = [
  () => {
    console.log('同步任务开始')
    console.log('同步任务结束')
  },
  () => sleep(1000, '吃饭'),
  () => sleep(2000, '睡觉'),
  () => sleep(3000, '打豆豆'),
  () => sleep(5000, '写bug'),
  () => sleep(7000, '冲浪'),
]

const work = async (tasks, limit = 2) => {
  const taskPool = new Set()
  for (const task of tasks) {
    const prom = Promise.resolve(task())
    taskPool.add(prom)
    // 完成一个后 在微任务中删除它
    prom.then(() => taskPool.delete(prom))

    if (taskPool.size >= limit) {
      // 如果达到最大限制则 等待其中的某个任务完成
      await Promise.race(taskPool)
    }
  }

  return Promise.allSettled(taskPool)
}

work(taskList).then(() => {
  console.log('----全部完成----')
})

// 图片并发限制
const getTask = (ulr) => {
  const tasks = []
  url.forEach(item => {
    tasks.push(() => {
      new Promise((resolve) => {
        const img = new Image()
        img.onload = () => {
          resolve()
        }
        img.src = url
      })
    })
  });

  return tasks
}

// work(getTask([])).then(() => {

// })
