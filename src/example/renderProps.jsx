import React, { Component } from 'react';


class OnlineStatus extends Component {
  constructor(props) {
    super(props);
    this.state = { isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }
 
  componentDidMount() {
    // 订阅好友在线状态
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
 
  componentWillUnmount() {
    // 取消订阅
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
 
  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }
 
  render() {
    const { isOnline } = this.state;

    return this.props.children({ isOnline });
  }
}
 

class FriendStatus extends Component {
  render(){
    return (
      <OnlineStatus friend={this.props.friend}>
        {
          ({ isOnline }) => {
            if (isOnline === null) {
              return 'Loading...';
            }
            return isOnline ? 'Online' : 'Offline';
          }
        }
      </OnlineStatus>
    );
  }
}

export default FriendStatus;