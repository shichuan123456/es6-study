// apply方法拦截函数的调用，call和apply操作

// apply方法接受三个参数，分别是目标对象、目标对象的上下文对象（this），目标对象的参数数组。

/* var handler = {
  apply (target, ctx, args) {
    return Reflect.apply(...arguments);
  }
}; */

/* var target = function () { return 'I am the target'; };
var handler = {
  apply: function () {
    return 'I am the proxy';
  }
};

var p = new Proxy(target, handler);

p()
// "I am the proxy" */

// var twice = {
//   apply (target, ctx, args) {
//     console.log(args, arguments);
//     return Reflect.apply(target, ctx, args) * 2
//   }
// };
// function sum (left, right) {
//   return left + right;
// };
// var proxy = new Proxy(sum, twice);
// console.log(proxy(1, 2));   // 6
// console.log(proxy.call(null, 5, 6)); // 22
// console.log(proxy.apply(null, [7, 8])); // 30

// Reflect.apply(proxy, null, [9, 10]) // 38


