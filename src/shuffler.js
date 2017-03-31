import cardData from './data.json';

const randomNumber = (max, min) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default function getCard() {
  return cardData[randomNumber(5, 0)];
}

