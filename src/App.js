import React, { Component } from 'react';
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
      <Card data={{ english: 'Table', deutsch: 'Tisch', gender: 'der tisch', plural: 'tische' }}/>
    </div>
  }
}

export default App;
