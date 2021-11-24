import { Node } from "./Node.js";
import { Button, Cover, Score } from "./Cover.js";
import { Label } from "./Label.js";

export class Game extends Node {}
let index = 0;
let cards = [];
let scoreNum = 10000;
let temp = [];
let indexTemp = [];
let canClick = true; //flag
let checkIndexCard = 20;
let arrDuplicate = [];
let scoreUpdateNum = 0;

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

function scoreUpdate() {
  let scoreUpdate = new Label();
  document.body.appendChild(scoreUpdate.view);
  scoreUpdate.view.style.color = "#60ff60";
  scoreUpdate.view.style.textAlign = "right";
  scoreUpdate.view.innerHTML = " ";
  scoreUpdate.y = 503;
  scoreUpdate.x = 120;
  if (scoreUpdateNum == 1000) {
    scoreUpdate.view.style.visibility = "visible";
    scoreUpdate.view.innerHTML = "+1000";
  }
  if (scoreUpdateNum == 500) {
    scoreUpdate.view.style.visibility = "visible";
    scoreUpdate.view.style.color = "red";
    scoreUpdate.view.innerHTML = "-500";
  }
  setTimeout(() => {
    scoreUpdate.view.style.visibility = "hidden";
  }, 500);
}

//Button
let playButton = new Button();
document.body.appendChild(playButton.view);
playButton.view.innerHTML = "Play";
playButton.view.addEventListener("click", startGame);

const checkScore = () => {
  if (checkIndexCard === 0) {
    setTimeout(() => {
      alert(`Congrats!!! You'r Score: ${scoreNum}`);
      window.location.reload();
    }, 500);
  }
  if (scoreNum === 0) {
    scoreBox.view.innerHTML = "Score = " + scoreNum;
    setTimeout(() => {
      alert("You lose!");
      window.location.reload();
    }, 500);
  } else if (scoreNum !== 0) {
    scoreBox.view.innerHTML = "Score = " + scoreNum;
  }
};

//Game
function startGame() {
  playButton.delete();
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 5; j++) {
      index++;
      createCard(i, j, index);
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
  // this._flipOpen();
  this.open();
  this.children[0].open();
  temp.push(this);
  indexTemp.push(index);
  //Check card
  if (temp.length === 2) {
    canClick = false;
    if (indexTemp[0] !== indexTemp[1]) {
      //Match Card
      if (temp[0].image === temp[1].image) {
        setTimeout(function () {
          temp[0].hide();
          temp[1].hide();
          temp = [];
          indexTemp = [];
          scoreNum += 1000;
          checkIndexCard -= 2;
          checkScore();
          canClick = true;
          scoreUpdateNum = 1000;
          scoreUpdate();
        }, 1500);
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
          scoreUpdateNum = 500;
          scoreUpdate();
        }, 1500);
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
      }, 1500);
    }
  }
}

function addLabel(index, cover) {
  let label = new Label(index);
  cover.addChild(label);
}
