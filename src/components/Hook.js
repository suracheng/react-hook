import React, { useState, useEffect, useRef, useCallback } from 'react';
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
// }


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

/**
react 根据 useState 出现的顺序决定 state 的状态值 , 从而保证多个 useState 状态值之间相互独立

***** 第一次渲染 *****
  useState(18)           //将 age 初始化为 18 
  useEffect('apple')     //将 fruit 初始化为 apple
  useState([{ text: 'good good studay, day day up!' }])  // 将 todos 初始化为数组


***** 第二次渲染 *****
  useState(18)           // 读取状态变量 age 的值
  useEffect('apple')     // 读取状态变量 fruit 的值
  useState([{ text: 'good good studay, day day up!' }])  // ...
*/
// ============ 多个 useState ============= 




// ============= useEffect =================

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      // setCount(count + 1); // 依赖于 `count` state
      setCount(c => c + 1);   // 不依赖于外部的 `count` 变量
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (<h1>{count}</h1>);
}

export default Counter;




// function Example ({ test }) {
//   const [ count, setCount ] = useState(18);
//   let timer = null;

//   // componentDidMount  componentDidUpdate  componentWillUnmount
//   useEffect(() => {
//     // console.log('count---', count);
//     // timer = window.setInterval(() => {
//     //   console.log('lalalala', timer);
//     // }, 1000);

//     document.title = `click ${count} ${test} timers`;

//     return () => {
//       // 每次更新时会先执行上一次return的清除操作， 然后在更新组件
//       console.log('查看清除运行的次数------', count);
//       // console.log('timer====', timer);
//       // window.clearInterval(timer);
//     }
//   }, [count]); 
//   // 第二个参数用来告诉 react 只有当 count 值发生改变时才会执行 useEffect 中的函数

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
// }

// function Test () {
//   const props = { test: '测试！' };
//   return Example(props);
// }

// export default Test;
// ============= useEffect =================





// function ExampleWithManyStates () {
//   let showFruit = true;
//   const [ age, setAge ] = useState(18);
//   const [ fruit, setFruit ] = useState('banana');

//   if (showFruit) {
//     const [ fruit, setFruit ] = useState('banana');
//     showFruit = false;
//   }
//   const [ todos, setTodos ] = useState([{ text: 'good good studay, day day up!' }]);

//   return (
//     <div>

//     </div>
//   );

// }



// ========= 条件 hook ======= 
// function Form() {
//   const [name, setName] = useState('Mary');

//   if (name !== '') {
//     useEffect(function persistForm() {
//       localStorage.setItem('formData', name);
//     });
//   }

//   // useEffect(function persistForm() {
//   //   localStorage.setItem('formData', name);
//   // });

//   const [surname, setSurname] = useState('Poppins');

//   useEffect(function updateTitle() {
//     document.title = name + ' ' + surname;
//   });
// }
// export default Form;


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
// ========== 条件 hook 导致的bug ======= 




// function someExpensiveComputation (props) {
//   return props;
// }

// function App() {
//   const props = 0;
  // const [count, setCount] = useState(() => {
  //   const initialState = someExpensiveComputation(props);
  //   return initialState;
  // });

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
// }
// export default App;



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
