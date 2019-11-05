import React, { Component } from 'react';


function withSubscription(WrappedComponent) {

  return class extends Component {
    constructor(props) {
      super(props);
      this.state = { isOnline: null };
      this.handleStatusChange = this.handleStatusChange.bind(this);
    }
 
    componentDidMount() {
      ChatAPI.subscribeToFriendStatus(
        this.props.friend.id,
        this.handleStatusChange
      );
    }
 
    componentWillUnmount() {
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
      return <WrappedComponent isOnline={this.state.isOnline}/>
    }
  }
}
 
const FriendStatus = withSubscription(({isOnline}) => {
  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
});


export default FriendStatus;
