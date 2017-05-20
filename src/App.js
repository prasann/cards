import React, { Component } from 'react';
import shuffler from './shuffler';
import './App.css';

const presetData = {
  'M': { color: 'blue', artikal: 'der' },
  'F': { color: 'red', artikal: 'die' },
  'N': { color: 'green', artikal: 'das' },
};

const SLIDER_TIME_IN_MS = 500;

const genderForm = ({ g }) => (presetData[g].artikal);
const genderColor = ({ g }) => (presetData[g].color);

class FrontContent extends Component {
  render() {
    const data = this.props.data;
    return <div className={`front`} ><h1>{data.en}</h1></div>
  }
}

class BackContent extends Component {
  render() {
    const data = this.props.data;
    return <div className="back" >
      <h2>{`${genderForm(this.props.data)} ${data.de}`}</h2>
      <p><i>pl: </i>{`${data.pl}`}</p>
    </div>
  }
}

class Card extends Component {
  constructor(props) {
    super();
    this.state = { flipped: props.flipped, showData: props.data, inTransit: false };
    this.toggleFlip = this.toggleFlip.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({ flipped: false, inTransit: true });
    setTimeout(() => {
      this.setState({ showData: props.data });
    }, SLIDER_TIME_IN_MS / 2);
    setTimeout(() => {
      this.setState({ inTransit: false });
    }, SLIDER_TIME_IN_MS);
  }

  toggleFlip() {
    this.setState({ flipped: !this.state.flipped });
  }

  render() {
    return <div onClick={this.toggleFlip}
                style={{ color: genderColor(this.state.showData) }}
                className={`${this.state.inTransit === true ? 'animate' : ''}`} >
      <div className={`card flipper ${(this.state.flipped ? 'flip' : '')}`} >
        <FrontContent data={this.state.showData} />
        <BackContent data={this.state.showData} />
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
    return <div className="container" >
      <div className="text-center offset-lg-2 col-lg-8 offset-sm-2 col-sm-8" >
        <h1>Vokabeln Karten</h1>
      </div>
      <div className="card-container col-lg-2 col-sm-8 offset-lg-5 offset-sm-2" >
        <Card data={this.state.card} />
      </div>
      <div className="offset-lg-4 col-lg-4 offset-sm-2 col-sm-8" >
        <button className="next offset-lg-4 col-lg-4 offset-sm-1 col-sm-10" onClick={this.next} >Next</button>
      </div>
    </div>
  }
}

export default App;
