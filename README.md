#### 什么是 Hook
Hook 是 react 16.8.0 及以上版本新增的功能, 能让你在函数组件中“钩入” React 特性的函数，名字通常都以 use 开始,
Hook的出现使你在非 class 的情况下可以使用更多的 React 特性，使一部分有状态组件由 class 的写法转换到 function。


(=====
不能在 class 组件中使用
在 hook 没出现之前 我们使用 function 定义的组件成为 无状态组件， 引入 hook 之后 我们可以将它称为 函数组件
以前在编写函数组件时需要像其中添加一些 state 状态时， 必须将 function 转为 class ， 现在可以直接在 function 中使用 hook 来获取 state 状态
=====)


#### 为什么会有 Hook, 我们为什么要使用 Hook
1. 在组件之间复用状态逻辑很难
  - 原因：通常我们会使用 高阶组件 或 render props 的形式来解决状态逻辑组件的复用问题， 但这类方案可能有时会使得你的代码变得难以理解。






  如果你在 React DevTools 中观察过 React 应用，你会发现由 providers，consumers，高阶组件，render props 等其他抽象层组成的组件会形成“嵌套地狱”。尽管我们可以在 DevTools 过滤掉它们，但这说明了一个更深层次的问题：React 需要为共享状态逻辑提供更好的原生途径。




2. 生命周期中的逻辑太乱
3. this 指向问题
4. 使用 hook 可以用更少的代码实现相同的逻辑


#### hooks API
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
- 从 16.8.0 开始，React 在以下模块中包含了 React Hook 的稳定实现：
  - React DOM
  - React DOM Server
  - React Test Renderer
  - React Shallow Renderer



#### useState
```
useState() 传入的参数为 状态初始值(可以为 字符串 数字 数组 对象等)， 返回一个含有两项的数组， 变量名可以随意定义，
const [ count, setCount ] = useState(0);

setCount 功能类似 this.setState ， 但更新状态时，不像 this.setState 一样合并 state ， 而是直接替换旧的 state， 返回新的 state

如果初始 state 需要通过复杂计算获得，则可以传入一个函数，在函数中计算并返回初始的 state，此函数只在初始渲染时被调用
```

#### useEffect
```
可以把 useEffect Hook 看做 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合。

该函数在第一次渲染之后 和 每次更新之后都会执行， React 保证了每次运行 effect 的同时，DOM 都已经更新完毕 (在组件渲染之后执行)

useEffect 传入的函数中 可以返回一个函数 (可以是箭头函数或者为函数起个别名) 用于取消或清楚一些操作 

在调用新的 effect 之前对前一个 effect 进行清理

useEffect 接收两个参数， 第一个参数 执行副作用时所调用的函数， 第二个参数用来限定是否需要执行 effect 函数， 同样适用于有清除操作的 effect
第二参数为空数组时， useEffect 只会在 componentDidMount 和 componentWillUnmount 时调用一次
```

#### useContext
```
useContext(MyContext) 只是让你能够读取 context 的值以及订阅 context 的变化。你仍然需要在上层组件树中使用 <MyContext.Provider> 来为下层组件提供 context。
```



#### Hook 使用规则
- 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用 (确保每次都能按照同样的顺序调用 hook, 这样能让 raect 保证在多次的 useState 和 useEffect 的调用中保证 hook 状态的准确性)
- 只能在 React 的 function component 中使用  (只能在 React 的函数组件中调用 Hook。不要在其他 JavaScript 函数中调用)

-  提供 eslint-plugin-react-hooks 的插件来强制执行以上两条规则

- 在一个组件中多次调用 useState 和 useEffect ， 如何判断对应的状态呢
  React 靠的是 hook 调用的顺序， hook 的调用顺序在每次的渲染中都是相同， 既能保证正常运行

- 如果在判断条件等中使用 hook ， 当条件不成立， 该 hook 不执行的时候， 后面的 hook 调用都被提前执行， 导致 bug 产生； 如果我们想有条件的执行一个 hook 可以将判断条件放在 hook 内部


#### 自定义 hook
```
1. 自定义 Hook 必须以 “use” 开头, 这是一个约定， 不遵循的话，由于无法判断某个函数是否包含对其内部 Hook 的调用，React 将无法自动检查你的 Hook 是否违反了 Hook 的规则。
2. 多个组件使用相同的 hook 不会共享 state 状态， 自定义 Hook 是一种重用状态逻辑的机制，所以每次使用自定义 Hook 时，其中的所有 state 和副作用都是完全隔离的。
3. 每次调用 Hook，它都会获取独立的 state。 从 react 角度来看， 相当于调用 useState 和 useEffect
```




