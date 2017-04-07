import React, { Component } from 'react';
import getCard from './shuffler';
import './App.css';

const genderColor = ({ gender }) => {
  switch (gender.toUpperCase()) {
    case 'M':
      return 'blue';
    case 'F':
      return 'red';
    default:
      return 'green';
  }
};

class FrontContent extends Component {
  render() {
    const data = this.props.data;
    return <div className="front"><h1 className={genderColor(this.props.data)}>{data.english}</h1></div>
  }
}

class BackContent extends Component {
  render() {
    const data = this.props.data;
    return <div className={`back ${genderColor(this.props.data)}`}>
      <h2>{data.deutsch}</h2>
      <p>{data.plural}</p>
      <p>{data.description}</p>
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
    this.setState({ flipped: false });
  }

  toggleFlip() {
    this.setState({ flipped: !this.state.flipped });
  }

  render() {
    return <div onClick={this.toggleFlip}
                className="offset-lg-5 col-lg-2 offset-sm-2 col-sm-8">
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
      <div className="text-center offset-lg-2 col-lg-8 offset-sm-2 col-sm-8">
        <h1>Vokabeln Karten</h1>
      </div>
      <div>
        <Card data={this.state.card}/>
      </div>
      <div className="offset-lg-4 col-lg-4 offset-sm-2 col-sm-8">
        <button className="next offset-lg-4 col-lg-4 offset-sm-1 col-sm-10" onClick={this.next}>Next</button>
      </div>
    </div>
  }
}

export default App;
