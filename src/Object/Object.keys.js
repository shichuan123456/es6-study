// Object.keys()
/* 
  ES5 引入了Object.keys方法，返回一个数组，
  成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。
*/

var obj = { foo: 'bar', baz: 42 };
Object.keys(obj)
// ["foo", "baz"]


let {keys, values, entries} = Object;
let obj = { a: 1, b: 2, c: 3 };

for (let key of keys(obj)) {
  console.log(key); // 'a', 'b', 'c'
}

for (let value of values(obj)) {
  console.log(value); // 1, 2, 3
}

for (let [key, value] of entries(obj)) {
  console.log([key, value]);        // ['a', 1], ['b', 2], ['c', 3]