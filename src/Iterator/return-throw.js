/* 
  遍历器对象除了next方法，还可以具有return方法和throw方法，
  return和throw方法可选。return方法的使用场合是，如果for...of循环提前退出（break,出错），
  就会调用return方法，可以进行清理或者释放资源。
  
*/
 /* 
    return方法必须返回一个对象，这是 Generator 规格决定的
 */
function readLinesSync(file) {
  return {
    [Symbol.iterator]() {
      return {
        next() {
          return { done: false };
        },
        return() {
          file.close();
          return { done: true };
        }
      };
    },
  };
}

// 情况一
for (let line of readLinesSync(fileName)) {
  console.log(line);
  break;
}

// 情况二
for (let line of readLinesSync(fileName)) {
  console.log(line);
  throw new Error();
}

// TODO 未完