
// 字符串是一个类数组的对象，也原生具有Iterator接口。

let str  = new String("hi");
typeof str[Symbol.iterator] === 'function'

// var iterator = str[Symbol.iterator]()

// iterator.next()  // {value: 'h', done: false}
// iterator.next()  // {value: 'i', done: fasle}
// iterator.next()  // {value: undefined, done: true}


str[Symbol.iterator] = function() {
  return {
    _first: true,
    next: function() {
      if(this._first) {
        this._first = false;
        return {
          value: "hello",
          done: false
        }
      }
      return {
        done: true
      }

    }
  }
}

let iter = str[Symbol.iterator]()
for (const item of str) {
  console.log(item)
}


