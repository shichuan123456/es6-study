// Object.assign
/* 
  ## Object.assign拷贝的属性是有限制的，
    只拷贝源对象的自身属性（不拷贝继承属性），
    也不拷贝不可枚举的属性（enumerable: false）。
*/

const target = { a: 1 };

const source1 = { b: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
// ##########
const target = { a: 1, b: 1 };

const source1 = { b: 2, c: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}

// 如果只有一个参数，Object.assign会直接返回该参数。
const obj = {a: 1};
Object.assign(obj) === obj // true

typeof Object.assign(2) // "object"

// 由于undefined和null无法转成对象，所以如果它们作为参数，就会报错。
Object.assign(undefined) // 报错
Object.assign(null) // 报错

/* 首先，这些参数都会转成对象，如果无法转成对象，就会跳过。
  这意味着，如果undefined和null不在首参数，就不会报错。 */
let obj = {a: 1};
Object.assign(obj, undefined) === obj // true
Object.assign(obj, null) === obj // true


const v1 = 'abc';
const v2 = true;
const v3 = 10;

const obj = Object.assign({}, v1, v2, v3);
console.log(obj); // { "0": "a", "1": "b", "2": "c" }


Object.assign({b: 'c'},
  Object.defineProperty({}, 'invisible', {
    enumerable: false,
    value: 'hello'
  })
)

Object.assign({ a: 'b' }, { [Symbol('c')]: 'd' })
// { a: 'b', Symbol(c): 'd' }