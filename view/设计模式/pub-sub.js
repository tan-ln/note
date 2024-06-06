/**
 * 发布订阅模式（观察订阅）
 */

class Subject {
  observers = []
  addObserver (ob) {
    this.observers.push(ob)
  }

  removeObserver (ob) {
    let idx = this.observers.indexOf(ob)
    if (idx > -1) {
      this.observers.splice(idx, 1)
    }
  }

  notify () {
    this.observers.forEach(ob => {
      ob.update()
    })
  }
}

class Observer {
  event = {}

  subscribe(type, fn) {
    sub.addObserver(this)
  }
}


let sub = new Subject()
let ob = new Observer()

ob.update = function () {
  console.log('observer update')
}

ob.subscribe(sub)                 // 订阅动作
sub.notify()