/* 
  通常读取某个属性的值是null或undefied，会为他们指定默认值 用 || 
*/

const headerText = response.settings.headerText || 'Hello, world!';
const animationDuration = response.settings.animationDuration || 300;
const showSplashScreen = response.settings.showSplashScreen || true;

/* 
  如上做会有一个问题， 如果属性的值为空字符串，false, 0。默认值都会生效，
  ES2020引入??用来判断unll和undefined
*/

const animationDuration = response.settings?.animationDuration ?? 300;

function Component(props) {
  const enable = props.enabled ?? true;
  // …
}
// 等同于
function Component(props) {
 const {
   enable: enable = true, // 赋默认值
 } = props
  // …
}

/* 
  ## 优先级：
     ??有一个运算优先级问题，它与&&和||的优先级孰高孰低。
     现在的规则是，如果多个逻辑运算符一起使用，必须用括号表明优先级，否则会报错。
*/

// 报错
lhs && middle ?? rhs
lhs ?? middle && rhs
lhs || middle ?? rhs
lhs ?? middle || 
// 如下便不会报错
(lhs && middle) ?? rhs;
lhs && (middle ?? rhs);

(lhs ?? middle) && rhs;
lhs ?? (middle && rhs);

(lhs || middle) ?? rhs;
lhs || (middle ?? rhs);

(lhs ?? middle) || rhs;
lhs ?? (middle || rhs);