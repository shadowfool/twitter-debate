import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Client from './Client';
import Tweet from './tweet.js';
const socket = io.connect('http://localhost:4000');
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {tweets: []}
  }
  componentDidMount() {
     socket.on('tweet', (data) => {
       this.setState({tweets: this.state.tweets.concat([data])})
     });
  }
  render() {
    return (
      <div className="App">
         {this.state.tweets.map((tweet) => (
           <Tweet data={tweet} />
        ))}
      </div>
    );
  }
}
export default App;