import React, { Component, createContext } from 'react';
import { Button } from 'antd';

// =============== 计算器 ===============
// class App extends Component {
//   constructor (props) {
//     super(props);
//     this.state = {
//       count: 0,
//     };

//     this.handleSetCount = this.handleSetCount.bind(this);
//   }

//   handleSetCount (count) {
//     this.setState({ count });
//   }

//   render () {
//     const { count } = this.state;

//     return (
//       <div>
//         <div>{count}</div>
//         <Button
//           onClick={() => {
//             this.handleSetCount(count+1);
//           }}
//         >
//           点击
//         </Button>
//       </div>
//     )
//   }
// }

// export default App;
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



// ============ createContext =============


const { Consumer, Provider } = React.createContext({
  color: 'red',
});

class App extends Component {
  constructor () {
    super();
    this.state = {
      color: 'red'
    }
  }

  handleClick = (newColor) => {
    this.setState({ color: newColor })
  }

  render () {
      return (
        <Provider value={{ s: this.state, h: this.handleClick }}>
          <Head></Head>
        </Provider>
      )
  }
}


class Head extends Component {
  render () {
    return (<Title></Title>)
  }
}

class Title extends Component {

  render () {
    return (
      <Consumer>
        { ({s, h}) => {
            console.log(s, h)
            return <div style={s} onClick={ () => h('pink') }>hello</div>
          }
        }
      </Consumer>
    )
  }
}