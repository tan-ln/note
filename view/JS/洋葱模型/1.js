/**
 *  类似 KOA 通过 next() 控制任务流程
 */

class TaskPro {

  __taskList = []
  _isRunning = false
  _currentIdx = 0

  addTask (task) {
    this.__taskList.push(task)
  }
  run () {
    // 当前任务正在执行
    if (this._isRunning) {
      return
    }
    this._isRunning = true
    this._runTask()
  }

  async _runTask () {
    // 执行完成
    if (this._currentIdx >= this.__taskList.length) {
      this._isRunning = false
      this._currentIdx = 0
      this.__taskList = []
      return
    }

    const curTask = this.__taskList[this._currentIdx]
    let prevIdx = this._currentIdx
    await curTask(this._next.bind(this))
    let nextIdx = this._currentIdx

    // 没有调用 next 则自动调用
    if (prevIdx === nextIdx) {
      await this._next()
    }
  }

  async _next () {
    this._currentIdx++
    await this._runTask()
  }
}

const t = new TaskPro()
t.addTask(async (next) => {
  console.log(1, 'start')
  await next()
  console.log(1, 'end')
})

t.addTask(() => {
  console.log('task2')
})
t.addTask(() => {
  console.log('task3')
})
// 执行
t.run()