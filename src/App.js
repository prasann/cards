import React, { Component } from 'react';
import './App.css';

class Card extends Component {
  render() {
    return <div>
      <h1>Table</h1>
      <h2>Tisch</h2>
      <p> der Tisch </p>
      <p>Tische</p>
    </div>;
  }
}

class App extends Component {
  render() {
    return <div className="container">
      <Card></Card>
    </div>
  }
}

export default App;
