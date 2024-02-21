/**
 * 说明：简单实现一个事件订阅机制，具有监听on和触发emit方法
 * 示例：
 * on(event, func){ ... }
 * emit(event, ...args){ ... }
 * once(event, func){ ... }
 * off(event, func){ ... }
 * const event = new EventEmitter();
 * event.on('someEvent', (...args) => {
 *     console.log('some_event triggered', ...args);
 * });
 * event.emit('someEvent', 'abc', '123');
 * event.once('someEvent', (...args) => {
 *     console.log('some_event triggered', ...args);
 * });
 * event.off('someEvent', callbackPointer); // callbackPointer为回调指针，不能是匿名函数
 */

class EventEmitter {
  constructor() {
    this.listeners = [];
  }
  on(event, func) {
    const callback = () => (listener) => listener.name === event;
    const idx = this.listeners.findIndex(callback);
    if (idx === -1) {
      this.listeners.push({
        name: event,
        callbacks: [func],
      });
    } else {
      this.listeners[idx].callbacks.push(func);
    }
  }
  emit(event, ...args) {
    if (this.listeners.length === 0) return;
    const callback = () => (listener) => listener.name === event;
    const idx = this.listeners.findIndex(callback);
    this.listeners[idx].callbacks.forEach((cb) => {
      cb(...args);
    });
  }
  once(event, func) {
    const callback = () => (listener) => listener.name === event;
    let idx = this.listeners.findIndex(callback);
    if (idx === -1) {
      this.listeners.push({
        name: event,
        callbacks: [func],
      });
    }
  }
  off(event, func) {
    if (this.listeners.length === 0) return;
    const callback = () => (listener) => listener.name === event;
    let idx = this.listeners.findIndex(callback);
    if (idx !== -1) {
      let callbacks = this.listeners[idx].callbacks;
      for (let i = 0; i < callbacks.length; i++) {
        if (callbacks[i] === func) {
          callbacks.splice(i, 1);
          break;
        }
      }
    }
  }
}

// let event = new EventEmitter();
// let onceCallback = (...args) => {
//   console.log("once_event triggered", ...args);
// };
// let onceCallback1 = (...args) => {
//   console.log("once_event 1 triggered", ...args);
// };
// // once仅监听一次
// event.once("onceEvent", onceCallback);
// event.once("onceEvent", onceCallback1);
// event.emit("onceEvent", "abc", "123");

// // off销毁指定回调
// let onCallback = (...args) => {
//   console.log("on_event triggered", ...args);
// };
// let onCallback1 = (...args) => {
//   console.log("on_event 1 triggered", ...args);
// };
// event.on("onEvent", onCallback);
// event.on("onEvent", onCallback1);
// event.emit("onEvent", "abc", "123");

// event.off("onEvent", onCallback);
// event.emit("onEvent", "abc", "123");