// 被观察者
class Subject {
  constructor () {
    this.state = 'initial'
    this.observers = []
  }

  add (ins) {
    this.observers.push(ins)
  }

  setState (newState) {
    this.state = newState
    this.notify()
  }

  getState () {
    return this.state
  }

  notify () {
    this.observers.map(v => {
      v.update(this)
    })
  }
}

// 观察者
class Observer {
  constructor (name) {
    this.name = name
  }

  update (ins) {
    console.log(`通知 ${this.name} 更新了状态： ${ins.getState()}`)
  }
}

const sub = new Subject()
const ob1 = new Observer('管理员')
const ob2 = new Observer('测试')

sub.add(ob1)
sub.add(ob2)

sub.setState('哈哈哈')

