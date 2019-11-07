# React Hook 入门

## 什么是 Hook
Hook 是 **react 16.8.0** 及以上版本新增的功能, 能让你在函数组件中 “钩入” React 特性的函数，名字通常都以 use 开始,
Hook的出现使你在非 class 的情况下可以使用更多的 React 特性。


## 为什么会有 Hook, 我们为什么要使用它

#### 在 hook 发布之前， 我们通常使用 function 函数编写 无状态组件， 当需要往组件中添加 state 状态时， 需要将组件改写为 class 形式 （hook 出现后可以直接使用 function 函数编写有状态组件）




#### 在组件之间复用状态逻辑很难
> 原因：通常我们会使用 高阶组件 或 render props 的形式来解决状态逻辑组件的复用问题， 这类方案可能有时会使得代码变得难以理解, 使用 Devtools 查看 React 应用时，会发现组件层级结构变深，当复用的状态逻辑过多时， 会发现抽象组成的组件会形成“嵌套地狱”。



#### 生命周期函数中的逻辑太乱， 使复杂组件变得难以理解  
> 原因：某个组件中我们可能会在 componentDidMount 函数中 获取 ajax 数据， 同时还会订阅事件，设置监听等， 在 componentWillUnmount 中清除定时器， 取消事件监听等， 相互关联且需要对照修改的代码被进行了拆分，而完全不相关的代码却在同一个方法中组合在一起。当组件变得复杂后，很容易产生 bug， 导致逻辑不一致， 不利于维护


可以使用 hook 从组件中提取状态逻辑， 使得这些逻辑可以单独测试并复用。
（把想要实现的功能拆分成一个个自定义的 hook, 直接在组件中调用 hook 即可。  可以无需修改组件结构的情况下复用状态逻辑。 这使得在组件间或社区内共享 Hook 变得更便捷。）


#### this 指向问题
> class 组件中考虑 this 指向问题， 一旦不小心忘了绑定 this，各种 bug 就随之而来。 


#### 使用 hook 可以用更少的代码实现相同的效果 （见代码部分）


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



## Hook 使用规则
- 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。

- 不要在普通的 JavaScript 函数中调用 Hook。可以
  [x] 在 React 的函数组件中调用 Hook
  [x] 在自定义 Hook 中调用其他 Hook

- 提供 eslint-plugin-react-hooks 的插件来强制执行以上两条规则



###### 在一个组件中多次调用 useState 和 useEffect ， 如何判断对应的状态呢？

  React 靠的是 hook 调用的顺序， hook 的调用顺序在每次的渲染中都是相同， 能保证 hook 状态的准确性
  如果在判断条件等中使用 hook ， 当条件不成立时， 该 hook 不执行， 后面的 hook 调用都被提前执行， 导致 bug 产生； 如果我们想有条件的执行一个 hook 可以将判断条件放在 hook 内部。



### useState
- useState 方法接受唯一一个参数（字符串 数字 布尔 数组 对象）作为 state 的初始值， 返回一个包含两项元素的数组。

```
const [ something, setSomething ] = useState(0);
```

- 如果初始 state 需要通过复杂计算获得，则可以传入一个函数，在函数中计算并返回初始的 state，此函数只在初始渲染时被调用。
```
const [ something, setSomething ] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
```

- 返回的 setSomething 为一个函数， 类似 this.setState, 用来更改 state 状态值， 但更新状态时，不像 this.setState 一样合并 state ， 而是直接替换旧的 state， 返回新的 state

- setSomething 函数接受 值 或 函数两种类型的参数

- 支持多个 useState 调用





### useEffect
- useEffect 方法函数 用来处理组件中的副作用， 接受两个参数，第一个为函数（执行副作用时所调用的函数）， 第二个为一个数组（用来限定是否需要执行 effect 函数， 同样适用于有清除操作的 effect 第二参数为空数组时， useEffect 只会在 componentDidMount 和 componentWillUnmount 时调用一次）


- 可以看作是 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合

```
渲染时执行顺序：
render -> effect callback -> re-render -> clean callback -> effect callback
```

- 可以创建多个 hook, 将相关逻辑代码放在同一个 hook 中， 使代码逻辑清晰

- useEffect与类组件生命周期不同的是，componentDidUpdate和componentDidMount 都是在 DOM 更新后同步执行的, 但 useEffect 并不会在 DOM 更新后同步执行，也不会阻塞更新界面（异步执行）。






### useContext
- useContext 接受函数 React.createContext 返回的 context 对象作为参数，返回当前 context 中值

- useContext(MyContext) 只是让你能够读取 context 的值以及订阅 context 的变化。你仍然需要在上层组件树中使用 <MyContext.Provider> 来为下层组件提供 context。




## 自定义 hook
- 自定义 Hook 是一个函数， 函数名以 “use” 开头 （约定）， 在函数内部可调用其它 hook。

- 可以在内部调用其他 hook

- 多个组件使用相同的 hook 不会共享 state 状态， 自定义 Hook 是一种重用状态逻辑的机制，所以每次使用自定义 Hook 时，其中的所有 state 和副作用都是完全隔离的。

> 通过自定义 hook， 可以将组件逻辑提取到可重用的函数中


