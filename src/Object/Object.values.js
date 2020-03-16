// Object.values()
/* 
  ## Object.values方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。
*/

const obj = { foo: 'bar', baz: 42 };
Object.values(obj)
// ["bar", 42]

const obj = { 100: 'a', 2: 'b', 7: 'c' };
Object.values(obj)
// ["b", "c", "a"]

const obj = Object.create({}, {p: {value: 42}});
Object.values(obj) // []

const obj = Object.create({}, {p:
  {
    value: 42,
    enumerable: true
  }
});
Object.values(obj) // [42]


Object.values({ [Symbol()]: 123, foo: 'abc' });
// ['abc']


Object.values('foo')
// ['f', 'o', 'o']

/* 
  如果参数不是对象，Object.values会先将其转为对象。
  由于数值和布尔值的包装对象，都不会为实例添加非继承的属性。
  所以，Object.values会返回空数组。
*/
Object.values(42) // []
Object.values(true) // []