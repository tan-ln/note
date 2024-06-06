var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = function () {
    console.log(i);
  };
}

data[0]();
data[1]();
data[2]();

/**
 * 必包：
    变量在创建时就确定了作用域上下文
    data 中保存的匿名函数的引用
    执行时 i 找的是全局作用域的 i，此时执行完for 循环，i已经变成了3
 */


var scope="global";
const constant = 'CONST'
let blockVar = 'blockVar'
function scopeTest () {
  console.log(scope, constant, blockVar);
  var scope="local"  
}
scopeTest(); //undefined CONST blockVar

/**
 *  打印 scope 为 undefined 是因为：变量提升
 * 
 *    编译时，变量提升将把变量的声明提前（在其作用域内），赋值在后
 *  
 * 
 *  function scopeTest () {
 *    var scope;
      console.log(scope); // undefined
      scope="local"  
    }
 * 
 */

// 如果 函数内不重新声明，打印的将是 
function scopeTest () {
  console.log(scope, constant, blockVar); // global CONST blockVar
  // var scope="local"  
}

 