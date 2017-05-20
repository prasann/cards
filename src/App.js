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

const deData = (data) => (`${genderForm(data)} ${data.de}`);
const enData = (data) => (data.en);

class FrontContent extends Component {
  render() {
    const data = this.props.data;
    return <div className={`front`} >
      <h1>{this.props.en2de ? enData(data) : deData(data)}</h1>
      <div className="hintText" ><i>Tap the card to get info</i>
      </div>
    </div>
  }
}

class BackContent extends Component {
  render() {
    const data = this.props.data;
    return <div className="back" >
      <h2>{this.props.en2de ? deData(data) : enData(data)}</h2>
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
        <FrontContent data={this.state.showData} en2de={this.props.en2de}/>
        <BackContent data={this.state.showData} en2de={this.props.en2de}/>
      </div>
    </div>;
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = { card: shuffler.nextCard(), en2de: true };
    this.next = this.next.bind(this);
    this.toggleLanguage = this.toggleLanguage.bind(this);
    this.toggleText = this.toggleText.bind(this);
  }

  next(e) {
    this.setState({ card: shuffler.nextCard() });
    e.preventDefault();
  }

  toggleLanguage(e){
    this.setState({ en2de : !this.state.en2de});
    e.preventDefault();
  }

  toggleText(){
    return this.state.en2de ? 'English <=> German' : 'German <=> English';
  }

  render() {
    return <div className="container" >
      <h1>Vokabeln Karten</h1>
      <a href="#" onClick={this.toggleLanguage}>{this.toggleText()}</a>
      <Card data={this.state.card} en2de={this.state.en2de} />
      <button className="next" onClick={this.next} >Next</button>
    </div>
  }
}

export default App;
