import React, { Component } from 'react';
import shuffler from './shuffler';
import './App.css';

const genderColor = ({ g }) => {
  switch (g.toUpperCase()) {
    case 'M':
      return 'blue';
    case 'F':
      return 'red';
    default:
      return 'green';
  }
};

const genderForm = ({ g }) => {
  switch (g.toUpperCase()) {
    case 'M':
      return 'der';
    case 'F':
      return 'die';
    default:
      return 'das';
  }
};

class FrontContent extends Component {
  render() {
    const data = this.props.data;
    return <div className="front"><h1 className={genderColor(this.props.data)}>{data.en}</h1></div>
  }
}

class BackContent extends Component {
  render() {
    const data = this.props.data;
    return <div className={`back ${genderColor(this.props.data)}`}>
      <h2>{`${genderForm(this.props.data)} ${data.de}`}</h2>
      <p>{`die ${data.pl}`}</p>
    </div>
  }
}

class Card extends Component {
  constructor(props) {
    super();
    this.state = { flipped: props.flipped, showData: props.data };
    this.toggleFlip = this.toggleFlip.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({ flipped: false });
    this.setState({ showData: this.props.data });
  }

  toggleFlip() {
    this.setState({ flipped: !this.state.flipped });
  }

  render() {
    return <div onClick={this.toggleFlip}
                className="offset-lg-5 col-lg-2 offset-sm-2 col-sm-8">
      <div className={`card flipper ${(this.state.flipped ? 'flip' : '')}`}>
        <FrontContent data={this.state.showData}/>
        <BackContent data={this.state.showData}/>
      </div>
    </div>;
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = { card: shuffler.nextCard() };
    this.next = this.next.bind(this);
  }

  next() {
    this.setState({ card: shuffler.nextCard() });
  }

  render() {
    return <div className="container">
      <div className="text-center offset-lg-2 col-lg-8 offset-sm-2 col-sm-8">
        <h1>Vokabeln Karten</h1>
      </div>
      <div>
        <Card data={this.state.card} flipped={false}/>
      </div>
      <div className="offset-lg-4 col-lg-4 offset-sm-2 col-sm-8">
        <button className="next offset-lg-4 col-lg-4 offset-sm-1 col-sm-10" onClick={this.next}>Next</button>
      </div>
    </div>
  }
}

export default App;
