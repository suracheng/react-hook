/**
##### 介绍
raect hooks ==> 16.8.0  新增功能, 使你在非 class 的情况下可以使用更多的 React 特性
它的出现可以使一部分组件由 class 转换到 function 的写法 

不能在 class 组件中使用


在 hook 没出现之前 我们使用 function 定义的组件成为 无状态组件， 引入 hook 之后 我们可以将它称为 函数组件

以前在编写函数组件时需要像其中添加一些 state 状态时， 必须将 function 转为 class ， 现在可以直接在 function 中使用 hook

##### hooks API
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

##### 使用规则
- 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用
- 只能在 function component 中使用  (只能在 React 的函数组件中调用 Hook。不要在其他 JavaScript 函数中调用)


##### 优势

##### 局限性



- useState 

- useEffect












 */