## 什么是 Hook
Hook 是 **react 16.8.0** 及以上版本新增的功能, 能让你在函数组件中“钩入” React 特性的函数，名字通常都以 use 开始,
Hook的出现使你在非 class 的情况下可以使用更多的 React 特性，使一部分有状态组件由 class 的写法转换到 function。


(=====
不能在 class 组件中使用
在 hook 没出现之前 我们使用 function 定义的组件成为 无状态组件， 引入 hook 之后 我们可以将它称为 函数组件
以前在编写函数组件时需要像其中添加一些 state 状态时， 必须将 function 转为 class ， 现在可以直接在 function 中使用 hook 来获取 state 状态
=====)


## 为什么会有 Hook, 我们为什么要使用它
#### 在组件之间复用状态逻辑很难
> 原因：通常我们会使用 高阶组件 或 render props 的形式来解决状态逻辑组件的复用问题， 这类方案可能有时会使得你的代码变得难以理解, 使用 DevTools 查看 React 应用， 会发现抽象组成的组件会形成“嵌套地狱”。

可以使用 hook 从组件中提取状态逻辑， 使得这些逻辑可以单独测试并复用。（把想要实现的功能拆分成一个个自定义的 hook, 直接在组件中调用 hook 即可。  可以无需修改组件结构的情况下复用状态逻辑。 这使得在组件间或社区内共享 Hook 变得更便捷。）


#### 生命周期函数中的逻辑太乱， 使复杂组件变得难以理解  （那为啥使用 hook 就能解决呢？ 耦合性好， 代码相关逻辑可放在同一个函数中， 可观性好）
> 原因：某个组件中我们可能会在 componentDidMount 函数中 获取 ajax 数据， 同时还会订阅一些事件，设置监听等， 在 componentWillUnmount 中清除定时器， 取消事件监听等， 相互关联且需要对照修改的代码被进行了拆分，而完全不相关的代码却在同一个方法中组合在一起。当组件变得复杂后，很容易产生 bug，并且导致逻辑不一致

#### this 指向问题 (为什么 function 中不用考虑 this 指向)
> class 组件中要考虑 this 指向问题， 一旦不小心忘了绑定 this，各种 bug 就随之而来。 

#### 使用 hook 可以用更少的代码实现相同的效果 （见后面代码部分）

#### 在 hook 发布之前， 使用 function 函数编写 无状态组件， 当需要往组件中添加 state 状态时， 需要将组件改写为 class 形式 （现在可以直接使用 function 函数编写有状态组件）


## hooks API
```
  ** Basic Hooks **
    useState
    useEffect
    useContext

  ** Additional Hooks **
    useReducer
    useCallback
    useMemo
    useRef
    useImperativeMethods
    useMutationEffect
    useLayoutEffect
```

> 使用 hook ， 所有 React 相关的 package 需升级到 16.8.0 或以上更高版本。

### useState
- useState 方法接受唯一一个参数（字符串 数字 布尔 数组 对象）作为 state 的初始值， 返回一个包含两项元素的数组

```
const [ something, setSomething ] = useState(0);
```

- 返回的 setSomething 为一个函数， 可以改变 state 状态值， 但更新状态时，不像 this.setState 一样合并 state ， 而是直接替换旧的 state， 返回新的 state

- 如果初始 state 需要通过复杂计算获得，则可以传入一个函数，在函数中计算并返回初始的 state，此函数只在初始渲染时被调用。

- 支持多个 useState 调用

```
const [ something, setSomething ] = useState(() => {
  const initialState = someExpensiveComputation(props);

  return initialState;
});
```


### useEffect
- useEffect 方法函数接受一个函数作为参数
- 可以将其看做 componentDidMount，componentDidUpdate 和componentWillUnmount 这三个函数的组合


useEffect中定义的副作用函数的执行不会阻碍浏览器更新视图，也就是说这些函数是异步执行的，而之前的componentDidMount或componentDidUpdate中的代码则是同步执行的
```

该函数在第一次渲染之后 和 每次更新之后都会执行， React 保证了每次运行 effect 的同时，DOM 都已经更新完毕 (在组件渲染之后执行)

useEffect 传入的函数中 可以返回一个函数 (可以是箭头函数或者为函数起个别名) 用于取消或清楚一些操作 

在调用新的 effect 之前对前一个 effect 进行清理

useEffect 接收两个参数， 第一个参数 执行副作用时所调用的函数， 第二个参数用来限定是否需要执行 effect 函数， 同样适用于有清除操作的 effect
第二参数为空数组时， useEffect 只会在 componentDidMount 和 componentWillUnmount 时调用一次
```

### useContext
```
useContext(MyContext) 只是让你能够读取 context 的值以及订阅 context 的变化。你仍然需要在上层组件树中使用 <MyContext.Provider> 来为下层组件提供 context。
```



## Hook 使用规则
- 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用 (确保每次都能按照同样的顺序调用 hook, 这样能让 raect 保证在多次的 useState 和 useEffect 的调用中保证 hook 状态的准确性)

- 不要在普通的 JavaScript 函数中调用 Hook。可以
  [x] 在 React 的函数组件中调用 Hook
  [x] 在自定义 Hook 中调用其他 Hook

- 提供 eslint-plugin-react-hooks 的插件来强制执行以上两条规则

- 在一个组件中多次调用 useState 和 useEffect ， 如何判断对应的状态呢？

  React 靠的是 hook 调用的顺序， hook 的调用顺序在每次的渲染中都是相同， 能保证 hook 状态的准确性
  
  如果在判断条件等中使用 hook ， 当条件不成立时， 该 hook 不执行， 后面的 hook 调用都被提前执行， 导致 bug 产生； 如果我们想有条件的执行一个 hook 可以将判断条件放在 hook 内部。


## 自定义 hook
> 通过自定义 hook， 可以将组件逻辑提取到可重用的函数中, 自定义 Hooks 从技术上讲并不是 React 的特性。编写自定义 Hooks 的可行性源自于 Hooks 的设计方式

1. 自定义 Hook 是一个函数， 函数名以 “use” 开头， 在函数内部可调用其它 hook
  （以 “use” 开头, 是一个约定， 不遵循的话，由于无法判断某个函数是否包含对其内部 Hook 的调用，React 将无法自动检查你的 Hook 是否违反了 Hook 的规则。）

2. 多个组件使用相同的 hook 不会共享 state 状态， 自定义 Hook 是一种重用状态逻辑的机制，所以每次使用自定义 Hook 时，其中的所有 state 和副作用都是完全隔离的。  （重用状态逻辑的机制 是什么 ？？）















```
文章参考
https://segmentfault.com/a/1190000019223106?utm_source=tag-newest
https://blog.csdn.net/liuyingv8/article/details/84068075
https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/
```
