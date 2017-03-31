import React, { Component } from 'react';
import getCard from './shuffler';
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
  constructor() {
    super();
    this.state = { card: getCard() };
    this.next = this.next.bind(this);
  }

  next() {
    this.setState({ card: getCard() });
  }

  render() {
    return <div className="container">
      <Card data={this.state.card}/>
      <button onClick={this.next}>Next</button>
    </div>
  }
}

export default App;
