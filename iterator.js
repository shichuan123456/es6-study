/* 
  es6之前标识数据集合的数据结构有两种：数组和对象。
  es6添加了两种数据结构：Map和Set;
  通过Iterator统一处理这四种不同的表示集合的数据结构。
  需要统一提供一个接口或者机制为这四种集合数据结构提供统一的访问机制。
  任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。
  Iterator作用：
    1、任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。
    2、数据结构的成员能够按某种次序排列。
    3、es6 创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费
*/

/* 模拟next返回 */
// var it = makeIterator(['a', 'b']);

// it.next() // { value: "a", done: false }
// it.next() // { value: "b", done: false }
// it.next() // { value: undefined, done: true }

// function makeIterator(array) {
//   var nextIndex = 0;
//   return {
//     next: function () {
//       return this.nextIndex < array.length ? {
//         value: array[nextIndex++],
//         done: false
//       } : {
//         value: undefined,
//         done: true
//       }
//     }
//   }
// }


/* 
  1、Iterator接口的目的：为所有的数据结构提供一种统一的访问机制，即for...of循环。该循环会自动去寻找Iterator接口。
  2、一种数据结构只要部署了Iterator接口，我们就称这种数据结构是可遍历的。
  3、es6规定默认的Iterator接口部署在数据结构的Symbol.iterator属性，也就是说一个数据结构只要具有Symbol。
    iterator属性，我们就认为其是可遍历的。
  4、Symbol.iterator属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。
    执行这个函数，就会返回一个遍历器。至于属性名Symbol.iterator，它是一个表达式，
    返回Symbol对象的iterator属性，这是一个预定义好的、类型为 Symbol 的特殊值，所以要放在方括号内
  5、Array
     Map
     Set
     String
     TypedArray
     函数的 arguments 对象
     NodeList 对象
  6、for...of本质上封装了next调用的循环。
*/


/* const obj = {
  [Symbol.iterator]: function () {
    return {
      next: function () {
        return {
          value: 1,
          done: true
        };
      }
    };
  }
};

let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();

iter.next() // { value: 'a', done: false }
iter.next() // { value: 'b', done: false }
iter.next() // { value: 'c', done: false }
iter.next() // { value: undefined, done: true }

*/

/* class RangeIterator {
  constructor(start, stop) {
    this.value = start;
    this.stop = stop;
  }

  [Symbol.iterator]() {
    return this;
  }

  next() {
    var value = this.value;
    if (value < this.stop) {
      this.value++;
      return {
        value: value,
        done: false
      }
    }
    return {
      done: true,
      value: undefined
    }
  }
}

function range(start, stop) {
  return new RangeIterator(start, stop)
}

for (var value of range(0, 3)) {
  console.log(value)
}
 */
/* 
function Obj(value) {
  this.value = value;
  this.next = null;
}

Obj.prototype[Symbol.iterator] = function () {
  var iterator = {
    next: next
  }
  var cur = this;

  function next() {
    if (cur) {
      var value = cur.value,
        cur = cur.next;
      return {
        value: cur.value,
        done: false
      }
    } else {
      return {
        done: true
      }
    }
  }
  return iterator
}

function Obj(value) {
  this.value = value;
  this.next = null;
}

Obj.prototype[Symbol.iterator] = function () {
  var iterator = {
    next: next
  };

  var current = this;

  function next() {
    if (current) {
      // 用一个变量先保存起来
      var value = current.value;
      current = current.next;
      return {
        done: false,
        value: value
      };
    } else {
      return {
        done: true
      }
    }
  }
  return iterator;
}

var one = new Obj(1);
var two = new Obj(2);
var three = new Obj(3);

one.next = two;
two.next = three;

for (var i of one) {
  console.log(i); // 1, 2, 3
}
 */
//遍历器核心要点是部署[Symbol.iterator]方法，然后返回返回遍历器对象包含next方法
// 迭代器模式核心其实就是记录index，和编写next方法
/* let obj = {
  data: ["hello", "world", "to", "labo"],
  [Symbol.iterator]() {
    var self = this,
      index = 0;
    return {
      next: function () {
        if (index < self.data.length) {
          return {
            value: self.data[index++],
            done: false
          }
        } else {
          return {
            value: undefined,
            done: true
          }
        }
      }
    }
  }
}

for (var data of obj) {
  console.log(data)
} */

// 利用数组的遍历器属性对类数组对象进行遍历
// let iterable = {
//   0: 'a',
//   1: 'b',
//   2: 'c',
//   length: 3,
//   [Symbol.iterator]: Array.prototype[Symbol.iterator]
// };

// for (let item of iterable) {
//   console.log(item); // 'a', 'b', 'c'
// }
/* 
  调用Iterator的场合:
  1、解构赋值
  2、扩展运算符：提供了一种更方便的转换为数组的方式，任何数据结构部署了 Iterator 接口，就可以对它使用扩展运算符，将其转为数组
  3、yield*: 后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。
*/

/* let generator = function* () {
  yield 1;
  yield*[2, 3, 4];
  yield 5;
};

var iterator = generator();

iterator.next() // { value: 1, done: false }
iterator.next() // { value: 2, done: false }
iterator.next() // { value: 3, done: false }
iterator.next() // { value: 4, done: false }
iterator.next() // { value: 5, done: false }
iterator.next() // { value: undefined, done: true } */


// 字符串的Iterator接口，字符串是一个类似数组的对象，也具有原生的Iterator接口

/* var someString = "hi";
typeof someString[Symbol.iterator]
// "function"

var iterator = someString[Symbol.iterator]();

iterator.next() // { value: "h", done: false }
iterator.next() // { value: "i", done: false }
iterator.next() // { value: undefined, done: true }
 */

/* 
  var str = new String("hi");

  [...str] // ["h", "i"]

  str[Symbol.iterator] = function() {
    return {
      next: function() {
        if (this._first) {
          this._first = false;
          return { value: "bye", done: false };
        } else {
          return { done: true };
        }
      },
      _first: true
    };
  };

  [...str] // ["bye"]
  str // "hi"
*/
// 字面量定义的字符串无法更改它的Symbol.iterator属性
// 包装类型和原始类型的区别是什么？？
/* var str = new String('hi')
str[Symbol.iterator] = function () {
  return {
    next: function () {
      if (this._first) {
        this._first = false;
        return {
          value: "bye",
          done: false
        };
      } else {
        return {
          done: true
        };
      }
    },
    _first: true
  };
};

console.log(...str) */
