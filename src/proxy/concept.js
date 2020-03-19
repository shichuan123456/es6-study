/* 
   Proxy用来修改某些操作的默认行为，等同于在语言层面做出修改，属于一种元编程，即对编程语言进行编程。
   Proxy:代理，在目标对象之前拦截，可进行修改处理。
*/

/* var proxy = new Proxy({a:23}, {
  get: function(target, propKey) {
    console.log("target:" + JSON.stringify(target), "propKey:" + propKey);
    return 35;
  }
})

console.log(proxy.time);
console.log(proxy.name); */

/* var handler = {
  get: function(target, name) {
    if (name === 'prototype') {
      return Object.prototype;
    }
    return 'Hello, ' + name;
  },

  apply: function(target, thisBinding, args) {
    return args[0];
  },

  construct: function(target, args) {
    return {value: args[1]};
  }
};

var fproxy = new Proxy(function(x, y) {
  return x + y;
}, handler);

fproxy(1, 2) // 1
new fproxy(1, 2) // {value: 2}
fproxy.prototype === Object.prototype // true
fproxy.foo === "Hello, foo" // true
 */














