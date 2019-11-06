import React, { Component } from 'react';

// 显示朋友列表中的该用户是否在线
class FriendStatus extends Component {
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
    if (this.state.isOnline === null) {
      return 'Loading...';
    }
    return this.state.isOnline ? 'Online' : 'Offline';
  }
}

export default FriendStatus;