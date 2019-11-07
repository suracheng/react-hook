import React, { useState, useEffect, useRef, useCallback, useContext, Component } from 'react';
import { isEqual } from 'lodash'
import { Button } from 'antd';


// =========== useState ============== 
// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <div>{count}</div>
//       <Button
//         onClick={() => {
//           setCount(count + 1);
//         }}
//       >
//         点击
//       </Button>
//     </div>
//   );
// };
// export default App;


// const someExpensiveComputation =  (props) => props;
// function App() {
//   const props = 0;
//   const [count, setCount] = useState(() => {
//     const initialState = someExpensiveComputation(props);
//     return initialState;
//   });

//   return (
//     <div>
//       <div>{count}</div>
//       <Button
//         onClick={() => {
//           setCount((prevCount) => {
//             console.log('返回先前的state----', prevCount);
//             return prevCount + 1; // 计算得出新的state
//           });
//         }}
//       >
//         点击
//       </Button>
//     </div>
//   );
// }
// export default App;
// =========== useState ============== 




// =========== 多个 useState =============
// function ExampleWithManyStates () {
//   // 更新数据时操作不方便， state 是替换的方式更新 state
//   // const [] = useState({
//   //   age: 18,
//   //   fruit: 'apple',
//   //   todos: [{ text: 'good good studay, day day up!' }]
//   // });
//   const [ age, setAge ] = useState(18);
//   const [ fruit, setFruit ] = useState('apple');
//   const [ todos, setTodos ] = useState([{ text: 'good good studay, day day up!' }]);


//   return (
//     <div>
//       <p>{ age }</p>
//       <p>{ fruit }</p>
//       <p>
//         {
//           todos.map((item) => (item.text))
//         }
//       </p>
//     </div>
//   );
// }
// export default ExampleWithManyStates;



/*
***** 第一次渲染 *****
  useState(18)           // 将 age 初始化为 18 
  useEffect('apple')     // 将 fruit 初始化为 apple
  useState([{ text: 'good good studay, day day up!' }])  // 将 todos 初始化为数组


***** 第二次渲染 *****
  useState(18)           // 读取状态变量 age 的最新的值
  useEffect('apple')     // 读取状态变量 fruit 的最新的值
  useState([{ text: 'good good studay, day day up!' }])  // ...
*/
// ============ 多个 useState ============= 





// ============= useEffect =================

// function Example () {
//   const [ count, setCount ] = useState(0);

//   // componentDidMount / componentDidUpdate / componentWillUnmount
//   useEffect(() => {
//     document.title = `click ${count} timers`;
//     console.log('count---', count);

//     return () => {
//       // 每次更新时会先执行上一次return的清除操作， 然后在更新组件
//       console.log('===== clean up! ======', count);
//     }
//   }, [count]); // 第二个参数用来告诉 react 只有当 count 值发生改变时才会执行 useEffect 中的函数
//   // 如果设置了依赖项，effect中用到的所有组件内的值都要包含在依赖中


//   const [ age, setAge ] = useState(18);

//   useEffect(() => {
//     const timer = window.setInterval(() => {
//       setCount(age + 1); // 依赖于 `age` state 传入 count 时 ，每次更新都会清除 设置定时器
//       // setAge(prevAge => prevAge + 1);   // 不依赖于外部的 `age` 变量
//     }, 1000);
//     return () => window.clearInterval(timer);
//   }, []);


//   return (
//     <div>
//       <div>count: {count}</div>
//       <h1>age: {age}</h1>
//       <Button
//         onClick={() => {
//           setCount(count + 1);
//         }}
//       >
//         点击
//       </Button>
//     </div>
//   );
// }

// export default Example;

// ============= useEffect =================



// ========= 条件 hook 导致的bug ======= 
// function Form() {
//   const [name, setName] = useState('Mary');

//   if (name !== '') {
//     useEffect(function persistForm() {
//       localStorage.setItem('formData', name);
//     });
//   }

//   const [surname, setSurname] = useState('Poppins');

//   useEffect(function updateTitle() {
//     document.title = name + ' ' + surname;
//   });

//   // .....
// }
// export default Form;



/**

问题： 在一个组件中多次调用 useState 和 useEffect，如何判断对应的状态呢？

  React 靠的是 hook 调用的顺序， hook 的调用顺序在每次的渲染中都是相同， 能保证 hook 状态的准确性
  如果在判断条件等中使用 hook ， 当条件不成立时， 该 hook 不执行， 后面的 hook 调用都被提前执行， 导致 bug 产生； 如果我们想有条件的执行一个 hook 可以将判断条件放在 hook 内部。
*/
// ------------
// 首次渲染
// ------------
// useState('Mary')           // 1. 使用 'Mary' 初始化变量名为 name 的 state
// useEffect(persistForm)     // 2. 添加 effect 以保存 form 操作
// useState('Poppins')        // 3. 使用 'Poppins' 初始化变量名为 surname 的 state
// useEffect(updateTitle)     // 4. 添加 effect 以更新标题

// -------------
// 二次渲染
// -------------
// useState('Mary')           // 1. 读取变量名为 name 的 state（参数被忽略）
// useEffect(persistForm)     // 2. 替换保存 form 的 effect
// useState('Poppins')        // 3. 读取变量名为 surname 的 state（参数被忽略）
// useEffect(updateTitle)     // 4. 替换更新标题的 effect



// useState('Mary')           // 1. 读取变量名为 name 的 state（参数被忽略）
// useEffect(persistForm)     // 🔴 此 Hook 被忽略！
// useState('Poppins')        // 🔴 2 （之前为 3）。读取变量名为 surname 的 state 失败
// useEffect(updateTitle)     // 🔴 3 （之前为 4）。替换更新标题的 effect 失败

// 可以将条件放置在 useEffect 中
// ========== 条件 hook 导致的bug ======= 



// ========== useContext ===========

// const context = React.createContext();
 
// function Example() {
//   const theme = useContext(context);
  
//   console.log('theme------', theme);

//   return (
//     <p style={{color: theme.color}}>Hello World!</p>
//   );
// }

// class Test extends Component {
//   state = {
//     color: "red",
//     background: "black"
//   };
 
//   render() {
//     return (
//         <context.Provider value={{ ...this.state }}>
//           <Example/>
//           <button onClick={() => this.setState({color: 'blue'})}>color</button>
//           <button onClick={() => this.setState({background: 'blue'})}>backgroud</button>
//         </context.Provider>
//     );
//   }
// }

// export default Test;

// ========== useContext ===========




// ================ 自定义 hook ================
// function useWindowWidth () {
//   const [ width, setWidth ] = useState(window.innerWidth);

//   useEffect(() => {
//     const handleResize = () => setWidth(window.innerWidth);
//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     }
//   });

//   return width;
// }

// function myComponent () {
//   const width = useWindowWidth();

//   return (
//     <p>窗口宽度： {width}</p>
//   )
// }

// export default myComponent;
// ================ 自定义 hook ================









// =========== useRef ===========

// function Counter() {
//   const [count, setCount] = useState(0);
//   const prevCount = usePrevious(count);
//   return (
//     <div>
//       <h1>Now: {count}, before: {prevCount}</h1>
//       <p onClick={() => {
//         setCount(count + 1);
//       }}>点击</p>
//     </div>
//   );
// }

// function usePrevious(value) {
//   const ref = useRef();
//   console.log('ref----', ref);
//   useEffect(() => {
//     ref.current = value;
//   });
//   return ref.current;
// }
// export default Counter;