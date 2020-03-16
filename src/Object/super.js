/*  
  super指向当前对象的原型对象
  Object.getPrototypeOf(obj)
  Object.setPrototypeOf(obj, proto)
*/ 
const proto = {
  hello: 'hello'
}

// const obj = {
//   find(){
//     return super.hello
//   }
// }

// Object.setPrototypeOf(obj, proto);
// console.log(obj.find()) // "hello"

/*
  super关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错
  目前，只有对象方法的简写法可以让 JavaScript 引擎确认，定义的是对象的方法。 
*/
// 报错
const obj = {
  foo: super.foo
}

// 报错
const obj = {
  foo: () => super.foo
}

// 报错
const obj = {
  foo: function () {
    return super.foo
  }
}

/* 
  JavaScript 引擎内部，super.foo等同于Object.getPrototypeOf(this).foo（属性）
  或Object.getPrototypeOf(this).foo.call(this)（方法）。
*/
const proto = {
  x: 'hello',
  foo() {
    console.log(this.x);
  },
};

const obj = {
  x: 'world',
  foo() {
    super.foo();
    // Object.getPrototypeOf(this).foo.call(this)
  }
}

Object.setPrototypeOf(obj, proto);

obj.foo() // "world"
