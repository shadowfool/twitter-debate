import React, { Component } from 'react';
class Tweet extends Component {
  render() {
    return (
      <div> {this.props.data.text} </div>
    );
  }
}
export default Tweet;