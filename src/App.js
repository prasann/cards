import React, { Component } from 'react';
import getCard from './shuffler';
import './App.css';

class FrontContent extends Component {
  render() {
    const data = this.props.data;
    return <div><h1>{data.english}</h1></div>
  }
}

class BackContent extends Component {
  render() {
    const data = this.props.data;
    return <div>
      <h2>{data.deutsch}</h2>
      <p>{data.gender}</p>
      <p>{data.plural}</p>
    </div>
  }
}

class CardContent extends Component {
  render() {
    return this.props.side ? <FrontContent data={this.props.data}/> : <BackContent data={this.props.data}/>
  }
}
class Card extends Component {
  constructor() {
    super();
    this.state = { flipped: false };
    this.toggleFlip = this.toggleFlip.bind(this);
  }

  toggleFlip() {
    this.setState({ flipped: !this.state.flipped });
  }

  render() {
    return <div className="card">
      <button onClick={this.toggleFlip}>Flip</button>
      <CardContent side={this.state.flipped} data={this.props.data}/>
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
      <button className="next" onClick={this.next}>Next</button>
    </div>
  }
}

export default App;
