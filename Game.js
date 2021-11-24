import { Button, Cover, Score } from "./Cover.js";
import { Label } from "./Label.js";
// import { Sprite } from "./Sprite.js";

let index = 0;
let cards = [];
let image = null;
let scoreNum = 2000;
let temp = [];
let indexTemp = [];
let canClick = true; //flag
let checkIndexCard = 20;
let arrDuplicate = [];

let randomImage = shuffle();
function shuffle() {
  for (let i = 0; i < 10; i++) {
    const arrImage = "url(./img/pokemon-" + i + ".png)";
    arrDuplicate.push(arrImage, arrImage);
  }
  arrDuplicate.sort(() => Math.random() - 0.5);

  return arrDuplicate;
}

//Score
let scoreBox = new Score();
document.body.appendChild(scoreBox.view);
scoreBox.view.innerHTML = "Score = " + scoreNum;

//Button
let playButton = new Button();
document.body.appendChild(playButton.view);
playButton.view.innerHTML = "Play";
playButton.view.addEventListener("click", startGame);

function createButton(i, j, index) {
  let replayButton = new Button();
  document.body.appendChild(replayButton.view);
  replayButton.view.innerHTML = "Replay";
  replayButton.x = j * 340;
  replayButton.y = i * 230;
  replayButton.view.addEventListener("click", resetGame);

  let retryButton = new Button();
  document.body.appendChild(retryButton.view);
  retryButton.view.innerHTML = "Retry";
  retryButton.x = j * 450;
  retryButton.y = i * 230;
  replayButton.view.addEventListener("click", resetGame);
}
const resetGame = () => {
  canClick = true;
  scoreNum = 10000;
  checkScore();
};

const checkScore = () => {
  if (checkIndexCard === 0) {
    setTimeout(() => {
      alert(`Congrats!!! You'r Score: ${scoreNum}`);
    }, 500);
  }
  if (scoreNum === 0) {
    scoreBox.view.innerHTML = "Score = " + scoreNum;
    setTimeout(() => {
      alert("You lose!");
      return resetGame();
    }, 500);
  } else if (scoreNum !== 0) {
    scoreBox.view.innerHTML = "Score = " + scoreNum;
  }
};

//Game
function startGame() {
  playButton.view.style.display = "none";
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 5; j++) {
      index++;
      createCard(i, j, index);
      createButton(2, 1, index);
      checkScore();
    }
  }
}
function replayGame() {
  playButton.view.style.display = "none";
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 5; j++) {
      index++;
      checkScore();
    }
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
  if (!canClick) return;
  this.open();
  this.children[0].open();
  // flipOpen(index);
  temp.push(this);
  indexTemp.push(index);
  //Check card
  if (temp.length === 2) {
    canClick = false;
    if (indexTemp[0] !== indexTemp[1]) {
      //Match Card
      if (temp[0].image === temp[1].image) {
        setTimeout(function () {
          temp[0].delete();
          temp[1].delete();
          temp = [];
          indexTemp = [];
          scoreNum += 1000;
          checkIndexCard -= 2;
          checkScore();
          canClick = true;
        }, 1000);
      }
      //Not Match Card
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
          canClick = true;
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
        canClick = true;
      }, 1000);
    }
  }
}

function addLabel(index, cover) {
  let label = new Label(index);
  cover.addChild(label);
}

// function flipOpen(cover) {
//   let tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });
//   tl.to(cover, { scaleX: 0, duration: 1 });
//   tl.add(function () {
//     cover.style.display = "none";
//   });
//   tl.to(cover, { scaleX: 1, duration: 1 });
// }
