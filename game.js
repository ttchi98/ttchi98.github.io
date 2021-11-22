import { Cover, Score } from "./Cover.js";
import { Label } from "./Label.js";

let index = 0;
let cards = [];
let image = null;
let scoreNum = 10000;
let temp = [];
let indexTemp = [];

let randomImage = shuffle();
function shuffle() {
  let arrImage = [
    "url(./img/Articuno.png)",
    "url(./img/Bulbasaur.png)",
    "url(./img/Charmander.png)",
    "url(./img/Eevee.png)",
    "url(./img/mew.png)",
    "url(./img/mewtwo.png)",
    "url(./img/Moltres.png)",
    "url(./img/pikachu.png)",
    "url(./img/Squirtle.png)",
    "url(./img/Zapdos.png)",
    "url(./img/Articuno.png)",
    "url(./img/Bulbasaur.png)",
    "url(./img/Charmander.png)",
    "url(./img/Eevee.png)",
    "url(./img/mew.png)",
    "url(./img/mewtwo.png)",
    "url(./img/Moltres.png)",
    "url(./img/pikachu.png)",
    "url(./img/Squirtle.png)",
    "url(./img/Zapdos.png)",
  ];
  arrImage.sort(() => Math.random() - 0.5);
  return arrImage;
}

//Score
let scoreBox = new Score();
document.body.appendChild(scoreBox.view);

const resetGame = () => {
  scoreNum = 10000;
  cards = [];
  let temp = [];
  let indexTemp = [];
};

const checkScore = () => {
  if (scoreNum === 0) {
    return alert("You lose!");
    resetGame();
  } else if (scoreNum !== 0) {
    scoreBox.view.innerHTML = "Score: " + scoreNum;
  }
};

//Game
for (let i = 0; i < 4; i++) {
  for (let j = 0; j < 5; j++) {
    index++;
    createCard(i, j, index);
    checkScore();
  }
}

function createCard(i, j, index) {
  let cover = new Cover(randomImage[index - 1]);
  document.body.appendChild(cover.view);
  cards.push(cover, index);
  addLabel(index, cover);
  cover.x = j * 110;
  cover.y = i * 110;
  let _onClick = onClickFunction.bind(cover, index);
  cover.view.addEventListener("click", _onClick);
}
function onClickFunction(index) {
  this.open();
  this.children[0].open();
  temp.push(this);
  indexTemp.push(index);
  //Check card
  if (temp.length === 2) {
    if (indexTemp[0] !== indexTemp[1]) {
      //Match Card
      if (temp[0].image === temp[1].image) {
        setTimeout(function () {
          temp[0].delete();
          temp[1].delete();
          temp = [];
          indexTemp = [];
          scoreNum += 1000;

          checkScore();
        }, 1000);
      } //Not Match Card
      else if (temp[0].image !== temp[1].image) {
        setTimeout(function () {
          temp[0].close();
          temp[1].close();
          temp[0].children[0].close(indexTemp[0]);
          temp[1].children[0].close(indexTemp[1]);
          indexTemp = [];
          temp = [];
          scoreNum -= 500;

          checkScore();
        }, 1000);
      }
    }
    //Same Card
    else {
      setTimeout(function () {
        temp[0].close();
        temp[1].close();
        temp[0].children[0].close(indexTemp[0]);
        temp[1].children[0].close(indexTemp[1]);
        indexTemp = [];
        temp = [];
      }, 1000);
    }
  }
}

function addLabel(index, cover) {
  let label = new Label(index);
  cover.addChild(label);
}
