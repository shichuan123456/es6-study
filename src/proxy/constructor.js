// constructor方法用于拦截new命令
/* 
  ---target：目标对象
  ---args：构造函数的参数对象
  ---newTarget：创造实例对象时，new命令作用的构造函数（下面例子的p）
*/

/* var handle = {
  constructor(target, args, newTarget) {
    return new target(...args)
  }
} */


var p = new Proxy(function () {}, {
  construct: function(target, args) {
    console.log('called: ' + args.join(', '));
    return { value: args[0] * 10 };
  }
});

console.log((new p(1, 2)).value)

// constructor方法必须返回一个对象，否则会报错
var p = new Proxy(function() {}, {
  construct: function(target, argumentsList) {
    return 1;
  }
});

new p() // 报错
// Uncaught TypeError: 'construct' on proxy: trap returned non-object ('1')
 

