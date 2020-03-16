// message.body.user.firstName
const firstName = (message
  && message.body
  && message.body.user
  && message.body.user.firstName) || 'default';

const fooInput = myForm.querySelector('input[name=foo]')
const fooValue = fooInput ? fooInput.value : undefined

const firstName = message?.body?.user?.firstName || 'default';
const fooValue = myForm.querySelector('input[name=foo]')?.value

/* 
  ## 链判断运算符有三种用法?.是一个整体，如果断了返回undefined
     obj?.prop
     obj?.[expr]
     func?.(...args)
*/


a?.b
// 等同于
a == null ? undefined : a.b

a?.[x]
// 等同于
a == null ? undefined : a[x]

a?.b()
// 等同于
a == null ? undefined : a.b()

a?.()
// 等同于
a == null ? undefined : a()


a?.[++x]
// 等同于
a == null ? undefined : a[++x]


delete a?.b
// 等同于
a == null ? undefined : delete a.b


(a?.b).c
// 等价于
(a == null ? undefined : a.b).c
/* 
  ## 报错场合
*/

// 构造函数
new a?.()
new a?.b()

// 链判断运算符的右侧有模板字符串
a?.`{b}`
a?.b`{c}`

// 链判断运算符的左侧是 super
super?.()
super?.foo

// 链运算符用于赋值运算符左侧
a?.b = c


foo?.3:0 
// 等价于
foo? .3 : 0