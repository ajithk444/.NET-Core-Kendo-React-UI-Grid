import React, { Component } from 'react';

export class Home extends Component {
  displayName = Home.name

  render() {
    return (
      <div>
        <h1>Hello, Guest !</h1>
        <p>Welcome to your dashboard !</p>
       </div>
    );
  }
}
