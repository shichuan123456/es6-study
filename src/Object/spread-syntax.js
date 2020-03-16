// ##  扩展运算符的解构赋值
/*  
  ### 对象的解构赋值用于从一个对象取值，相当于将目标对象自身的所有可遍历的（enumerable）、但尚未被读取的属性，分配到指定的对象上面。
      所有的键和它们的值，都会拷贝到新对象上面。 
*/
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
console.log(x, y, z);  // 1 2 { a: 3, b: 4 }

/* 
  ### 要求右边要是一个对象，如果是null或undefined会报错，因为它们无法转成对象。
  ### 结构赋值必须是最后一个参数，否则会报错
*/
// 运行时错误
let {...z} = null
let {...z} = undefined
// 句法错误
let {...x, y, z} = someObj; 
let {x, ...y, z} = someObj;


/* 
  ### 结构赋值copy是浅拷贝，如果是复合类型的值，那么拷贝的是引用而不是副本。
*/

let obj = { a: { b: 1 } };
let { ...x } = obj;
obj.a.b = 2;
x.a.b // 2

/* 
  ### 扩展运算符的解构赋值，不能复制继承自原型对象的属性。
*/

let o1 = { a: 1 };
let o2 = { b: 2 };
o2.__proto__ = o1;
let { ...o3 } = o2;
o3 // { b: 2 }
o3.a // undefined

const o = Object.create({ x: 1, y: 2 });
o.z = 3;

let { x, ...newObj } = o;
let { y, z } = newObj;
x // 1
y // undefined
z // 3
/* 
  ### 变量x是单纯的解构赋值，所以可以读取对象o继承的属性；
      变量y和z是扩展运算符的解构赋值，只能读取对象o自身的属性，
      所以变量z可以赋值成功，变量y取不到值
  ### ES6 规定，变量声明语句之中，如果使用解构赋值，扩展运算符后面必须是一个变量名，
      而不能是一个解构赋值表达式，
      所以上面代码引入了中间变量newObj，如果写成下面这样会报错
*/
const o = Object.create({ x: 1, y: 2 });
o.z = 3;

let { x, ...newObj } = o;
let { y, z } = newObj;
x // 1
y // undefined
z // 3

// let { x, ...{ y, z } } = o;
// SyntaxError: ... must be followed by an identifier in declaration contexts
/* 
  ### 解构赋值的一个用处，是扩展某个函数的参数，引入其他操作。
*/
function baseFunction({ a, b }) {
  // ...
}
function wrapperFunction({ x, y, ...restConfig }) {
  // 使用 x 和 y 参数进行操作
  // 其余参数传给原始函数
  return baseFunction(restConfig);
}

// ## 扩展运算符
let z = { a: 3, b: 4 };
let n = { ...z };
n // { a: 3, b: 4 }

let foo = {...['a', 'b', 'c']}
foo // {0: 'a', 1: 'b', 2: 'c'}

let fl = {...{}, a: 1}
f1 // { a: 1 }

/* 
  ### 如果扩展运算符后面不是对象，则会自动将其转为对象。
*/

// 等同于 {...Object(true)}
let tr = {...true} // {}

// 等同于 {...Object(undefined)}
let un = {...undefined} // {}

// 等同于 {...Object(null)}
let nu = {...null} // {}

// 等同于 {...Object(1)}
let n1 = {...1} // {}

let he = {...'hello'}
// {0: "h", 1: "e", 2: "l", 3: "l", 4: "o"}

let aClone = { ...a };
// 等同于
let aClone = Object.assign({}, a);

/* 
  ### 上面的例子只是拷贝了对象实例的属性，如果想完整克隆一个对象，
      还拷贝对象原型的属性，可以采用下面的写法。
*/
// 写法一
const clone1 = {
  __proto__: Object.getPrototypeOf(obj),
  ...obj
};

// 写法二
const clone2 = Object.assign(
  Object.create(Object.getPrototypeOf(obj)),
  obj
);

// 写法三 TODO?
const clone3 = Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
)

let ab = { ...a, ...b };
// 等同于
let ab = Object.assign({}, a, b);

let aWithOverrides = { ...a, x: 1, y: 2 };
// 等同于
let aWithOverrides = { ...a, ...{ x: 1, y: 2 } };
// 等同于
let x = 1, y = 2, aWithOverrides = { ...a, x, y };
// 等同于
let aWithOverrides = Object.assign({}, a, { x: 1, y: 2 });


let newVersion = {
  ...previousVersion,
  name: 'New Name' // Override the name property
};

let aWithDefaults = { x: 1, y: 2, ...a };
// 等同于
let aWithDefaults = Object.assign({}, { x: 1, y: 2 }, a);
// 等同于
let aWithDefaults = Object.assign({ x: 1, y: 2 }, a);
// 与数组的扩展运算符一样，对象的扩展运算符后面可以跟表达式
const obj = {
  ...(x > 1 ? {a: 1} : {}),
  b: 2,
};

// 扩展运算符的参数对象之中，如果有取值函数get，这个函数是会执行的。
// 并不会抛出错误，因为 x 属性只是被定义，但没执行
let aWithXGetter = {
  ...a,
  get x() {
    throw new Error('not throw yet');
  }
};

// 会抛出错误，因为 x 属性被执行了
let runtimeError = {
  ...a,
  ...{
    get x() {
      throw new Error('throw now');
    }
  }
};