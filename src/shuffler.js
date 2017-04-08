import cardData from './data.json';

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

class Shuffler {
  constructor() {
    console.time('shuffle');
    this.shuffledCards = shuffle(cardData);
    this.counter = 0;
    console.timeEnd('shuffle');
    console.log(cardData.length);
  }

  nextCard() {
    let result;
    if (this.counter < this.shuffledCards.length) {
      result = this.shuffledCards[this.counter];
      this.counter++;
    } else {
      this.counter = 0;
      result = this.shuffledCards[this.counter];
    }
    return result;
  }
}

export default new Shuffler();