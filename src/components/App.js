import React, { Component } from 'react';
import { Button } from 'antd';

// =============== 计算器 ===============
class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      count: 0,
    };

    this.handleSetCount = this.handleSetCount.bind(this);
  }

  handleSetCount (count) {
    this.setState({ count });
  }

  render () {
    const { count } = this.state;

    return (
      <div>
        <div>{count}</div>
        <Button
          onClick={() => {
            this.handleSetCount(count+1);
          }}
        >
          点击
        </Button>
      </div>
    )
  }
}

export default App;
// =============== 计算器 ===============


// ============ 改变标题 Class 版本 =============
// class Example extends Component {
//   constructor (props) {
//     super(props);
//     this.state = {
//       count: 18,
//     };
//   }

//   componentDidMount () {
//     document.title = `click ${this.state.count} timers`;
//   }

//   componentDidUpdate () {
//     document.title = `click ${this.state.count} timers`;
//   }

//   handerSetCount = (count) => {
//     this.setState({ count });
//   }

//   render () {
//     const { count } = this.state;

//     return (
//       <div>
//         <div>{count}</div>
//         <Button
//           onClick={() => {
//             this.handerSetCount(count + 1);
//           }}
//         >
//           点击
//         </Button>
//       </div>
//     );
//   }
// }

// export default Example;
// ============ 改变标题 Class 版本 =============


// ============ 高阶组件 =============
// const withUser = WapperComponent => {
//   const user = 'xxxxx';
//   return props => (<WapperComponent user={user}  {...props}/>);
// }
// const UserPage = props => {
//   return (
//     <div>
//       <p>My name is {props.user}!</p>
//     </div>
//   );
// }
// export default withUser(UserPage);
// ============ 高阶组件 =============