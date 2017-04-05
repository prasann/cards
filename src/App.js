import React, { Component } from 'react';
import getCard from './shuffler';
import './App.css';

class FrontContent extends Component {
  render() {
    const data = this.props.data;
    return <div className="front"><h1>{data.english}</h1></div>
  }
}

class BackContent extends Component {
  render() {
    const data = this.props.data;
    return <div className="back">
      <h2>{data.deutsch}</h2>
      <p>{data.gender}</p>
      <p>{data.plural}</p>
    </div>
  }
}

class Card extends Component {
  constructor() {
    super();
    this.state = { flipped: false };
    this.toggleFlip = this.toggleFlip.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({ flipped: false })
  }

  toggleFlip() {
    this.setState({ flipped: !this.state.flipped });
  }

  render() {
    return <div onClick={this.toggleFlip}
                className="offset-lg-5 col-lg-2 offset-sm-2 col-sm-8 offset-md-3 col-md-6">
      <div className={`card flipper ${(this.state.flipped ? 'flip' : '')}`}>
        <FrontContent data={this.props.data}/>
        <BackContent data={this.props.data}/>
      </div>
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
      <button className="next offset-lg-5 col-lg-2" onClick={this.next}>Next </button>
    </div>
  }
}

export default App;
