// ES5 set、get

var info = {
  _age: 18,
  set age (val) {
    if (val > 18) {
      console.log('older');
    } else {
      console.log('too young too simple');
    }
  },
  get age () {
    console.log('my age ?');
    return this._age
  }
}

console.log(info.age);      // 18
info.age = 0                // too young too simple
