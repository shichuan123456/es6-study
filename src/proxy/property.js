// deleteProperty方法用于拦截delete操作，如果这个方法抛出错误或者返回false，当前属性就无法被delete命令删除
// deleteProperty
var handler = {
  deleteProperty (target, key) {
    invariant(key, 'delete');
    delete target[key];
    return true;
  }
};
function invariant (key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`);
  }
}

var target = { _prop: 'foo' };
var proxy = new Proxy(target, handler);
delete proxy._prop
// Error: Invalid attempt to delete private "_prop" property

// defineProperty
/* 
  拦截Object.defineProperty操作
  上面代码中，defineProperty方法返回false，导致添加新属性总是无效。
  注意，如果目标对象不可扩展（non-extensible），则defineProperty不能增加目标对象上不存在的属性，否则会报错。
  另外，如果目标对象的某个属性不可写（writable）或不可配置（configurable），则defineProperty方法不得改变这两个设置。
*/

var handler = {
  defineProperty (target, key, descriptor) {
    return false;
  }
};
var target = {};
var proxy = new Proxy(target, handler);
proxy.foo = 'bar' // 不会生效

// getOwnPropertyDescriptor
/* 
  拦截Object.getOwnPropertyDescriptor(),返回一个属性描述对象或者undefined
*/

var handler = {
  getOwnPropertyDescriptor (target, key) {
    if (key[0] === '_') {
      return;
    }
    return Object.getOwnPropertyDescriptor(target, key);
  }
};
var target = { _foo: 'bar', baz: 'tar' };
var proxy = new Proxy(target, handler);
Object.getOwnPropertyDescriptor(proxy, 'wat')
// undefined
Object.getOwnPropertyDescriptor(proxy, '_foo')
// undefined
Object.getOwnPropertyDescriptor(proxy, 'baz')
// { value: 'tar', writable: true, enumerable: true, configurable: true }

// getPrototypeOf
/* 
  getPrototypeOf方法主要用来拦截获取对象原型。具体来说，拦截下面这些操作。

  Object.prototype.__proto__
  Object.prototype.isPrototypeOf()
  Object.getPrototypeOf()
  Reflect.getPrototypeOf()
  instanceof

  getPrototypeOf方法的返回值必须是对象或者null，否则报错。
  另外，如果目标对象不可扩展（non-extensible）， getPrototypeOf方法必须返回目标对象的原型对象。
*/

var proto = {};
var p = new Proxy({}, {
  getPrototypeOf(target) {
    return proto;
  }
});
Object.getPrototypeOf(p) === proto // true

// isExtensible()
/* 
  拦截Object.isExtensible操作，该方法只返回布尔值，否则返回值会被自动转为布尔值

  这个方法有一个强限制，它的返回值必须与目标对象的isExtensible属性保持一致，否则就会抛出错误
*/

var p = new Proxy({}, {
  isExtensible: function(target) {
    console.log("called");
    return true;
  }
});

Object.isExtensible(p)
// "called"
// true

Object.isExtensible(proxy) === Object.isExtensible(target)


var p = new Proxy({}, {
  isExtensible: function(target) {
    return false;
  }
});

Object.isExtensible(p)
// Uncaught TypeError: 'isExtensible' on proxy: trap result does not reflect extensibility of proxy target (which is 'true')