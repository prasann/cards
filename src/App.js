import React, { Component } from 'react';
import cardData from './data.json';
import './App.css';

class Card extends Component {
  render() {
    const data = this.props.data;
    return <div>
      <h1>{data.english}</h1>
      <h2>{data.deutsch}</h2>
      <p>{data.gender}</p>
      <p>{data.plural}</p>
    </div>;
  }
}

class App extends Component {
  render() {
    return <div className="container">
      <Card data={cardData[0]}/>
    </div>
  }
}

export default App;
