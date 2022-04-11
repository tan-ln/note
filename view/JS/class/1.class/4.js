// ES6 set | get

class Info {
  constructor (age) {
    this._age = age
  }
  set age (newAge) {
    console.log('new age is : ' + newAge);
    this._age = newAge
  }
  get age () {
    return this._age
  }
}

const info = new Info(18)
console.log(info);              // Info { _age: 18 }
info.age = 0                    // new age is :0
