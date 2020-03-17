/* 
    Symbol.iterator 方法的最简单实现就是Generator函数。
  如果Symbol.iterator属性是一个generator函数，那么几乎不用部署任何代码，
  只要用yield命令给出每一步的返回值即可。
 */

let selfIter = {
  *[Symbol.iterator]() {
    yield 'hello';
    yield 'world'
  }
}

console.log([...selfIter])