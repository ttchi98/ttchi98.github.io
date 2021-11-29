import { Label } from "./Label.js";
import { Card } from "./Card.js";
import { Node } from "./Node.js";
import { Button } from "./Button.js";

let defaultScore = 5000;

export class Game extends Node {
  constructor() {
    super();
    this.canClick = true; //flag
    this.checkCard = [];
    this.deckRetryCard = [];
    this.scoreNum = defaultScore;
    this._scoreBox = null;
    this._scoreUpdate = null;
    this.playButton = null;
    this.cardMatch = [];
    this.temp = [];
    this.tempIndex = [];
    this.scoreUpdateNum = 0;
    this.shuffleImage = this.shuffle();
  }
  shuffle() {
    let arrDuplicate = [];
    for (let i = 0; i < 10; i++) {
      const arrImage = "./img/digimon-" + i + ".png";
      arrDuplicate.push(arrImage, arrImage);
    }
    arrDuplicate.sort(() => Math.random() - 0.5);
    return arrDuplicate;
  }
  createTable() {
    this.view = document.createElement("div");
    document.body.appendChild(this.view);
    this.view.style.position = "absolute";
    this.view.style.backgroundImage = "url(./img/bgDigimon.jpeg)";
    this.view.style.width = "600px";
    this.view.style.height = "600px";
    this.view.style.backgroundSize = "contain";
    this.x = 25;
    this.y = 100;
  }
  createScoreBox(scoreNum, scoreUpdateNum) {
    this._scoreBox = new Label("Score =  " + scoreNum + scoreUpdateNum);
    document.body.appendChild(this._scoreBox.view);
    this._scoreBox.view.style.width = "450px";
    this._scoreBox.view.style.height = "60px";
    this._scoreBox.view.style.backgroundColor = "#fff";
    this._scoreBox.view.style.border = "2px solid black ";
    this._scoreBox.view.style.justifyContent = "center";
    this._scoreBox.view.style.alignItems = "center";
    this._scoreBox.view.style.display = "flex";
    this._scoreBox.view.style.borderRadius = "10px";
  }

  createScoreUpdate() {
    this._scoreUpdate = new Label();
    document.body.appendChild(this._scoreUpdate.view);
    this._scoreUpdate.view.innerHTML = " ";
    this._scoreUpdate.y = 23;
    this._scoreUpdate.x = 350;
  }
  checkScoreUpdate() {
    if (this.scoreUpdateNum == 1000) {
      this._scoreUpdate.view.style.visibility = "visible";
      this._scoreUpdate.view.style.color = "#4caf50";
      this._scoreUpdate.view.innerHTML = "+1000";
    } else if (this.scoreUpdateNum == 500) {
      this._scoreUpdate.view.style.visibility = "visible";
      this._scoreUpdate.view.style.color = "red";
      this._scoreUpdate.view.innerHTML = "-500";
    }
    setTimeout(() => {
      this._scoreUpdate.view.style.visibility = "hidden";
    }, 1500);
  }

  createDeckCard() {
    let index = 0;
    let cards = [];
    let col = 4;
    let row = 5;
    let imgIndex = this.shuffleImage;
    this.view.appendChild(playButton.view);

    for (let i = 0; i < col; i++) {
      for (let j = 0; j < row; j++) {
        let centerX = 250;
        let centerY = 180;
        let card = new Card(imgIndex[index], index + 1);
        ++index;
        card.createImg();
        card.createCover();
        card.createLabel();
        this.view.appendChild(card.view);
        cards.push(card, index);
        card.setPosition(centerX, centerY);
        card.view.addEventListener("click", this.onClickCard.bind(this, card));
        //Animation
        let tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });
        tl.delay(0.05 * index)
          .add(() => {
            this.canClick = false;
          })
          .to(card, {
            duration: 3,
            ease: "elastic.inOut(1.5, 0.3)",
            x: 120 * j,
            y: 150 * i,
          })
          .add(() => {
            this.canClick = true;
          });
      }
    }
    this.createScoreBox(this.scoreNum);
    this._scoreBox.string = "Score = " + this.scoreNum;
    this.createScoreUpdate(this.scoreUpdateNum);
    this.deckRetryCard = imgIndex;
  }

  onClickCard(card) {
    if (!this.canClick) return;
    let openSound = new Audio("./audio/openSound.wav");
    let closeSound = new Audio("./audio/closeSound.wav");
    let hideSound = new Audio("./audio/hideSound.wav");
    let youLoseSound = new Audio("./audio/youLoseSound.wav");
    let youWinSound = new Audio("./audio/youWinSound.mp3");

    openSound.play();
    //First Click
    card.children[2].hideLabel();
    card.hideCover();
    this.checkCard.push(card);
    this.tempIndex.push(card.children[2].string);
    this.temp.push(card.path);
    //Check Card
    if (this.tempIndex.length == 2) {
      this.canClick = false;
      //Same Card
      if (this.tempIndex[0] == this.tempIndex[1]) {
        setTimeout(() => {
          this.checkCard[0].flipClose();
          this.checkCard[1].flipClose();
          this.resetCard();
        }, 1500);
      } else {
        if (this.temp.length >= 2 && this.checkCard.length >= 2) {
          if (this.temp[0] === this.temp[1]) {
            //Match Card
            this.canClick = false;
            this.cardMatch.push(this.checkCard[0]);
            this.cardMatch.push(this.checkCard[1]);
            setTimeout(() => {
              this.checkCard[0].flipHide();
              this.checkCard[1].flipHide();
              this.scoreNum += 1000;
              this._scoreBox.string = "Score = " + this.scoreNum;
              this.scoreUpdateNum = 1000;
              this.checkScoreUpdate(this.scoreUpdateNum);
              this.resetCard();
              hideSound.play();
            }, 1500);
          } else {
            //Not Match Card
            this.scoreNum -= 500;
            this._scoreBox.string = "Score =  " + this.scoreNum;
            this.scoreUpdateNum = 500;
            this.checkScoreUpdate(this.scoreUpdateNum);
            setTimeout(() => {
              this.checkCard[0].flipClose();
              this.checkCard[1].flipClose();
              this.resetCard();
              closeSound.play();
            }, 1500);
          }
          if (this.scoreNum <= 0) {
            setTimeout(() => {
              youLoseSound.play();
              this.canClick = false;
              alert("Game Over!");
              this.retryGame();
            }, 1500);
          }
          if (this.cardMatch.length == 20 && this.scoreNum != 0) {
            youWinSound.play();
            setTimeout(() => {
              alert(`Congrats!!! You'r Score: ${this.scoreNum}`);
              this.replayGame();
            }, 1500);
          }
        }
      }
      this.tempIndex = [];
    }
  }
  resetCard() {
    this.checkCard = [];
    this.temp = [];
    this.canClick = true;
  }
  replayGame() {
    replayButton.showButton();
    this.scoreNum = defaultScore;
    this.cardMatch = [];
  }
  retryGame() {
    this.createTable();
    retryButton.showButton();
    this.scoreNum = defaultScore;
    this.cardMatch = [];
    this.checkCard = [];
  }
}

let game = new Game();
let backgroundSound = new Audio("./audio/musicBackground.mp3");
let playButton = new Button("Play", 8, 8);
let replayButton = new Button("Replay", 465, 8);
let retryButton = new Button("Retry", 465, 8);
document.body.appendChild(playButton.view);
playButton.view.addEventListener("click", function () {
  playButton.hideButton();
  game.createTable();
  game.createDeckCard(game.shuffleImage);
  game.createScoreUpdate();
  backgroundSound.play();
});

document.body.appendChild(replayButton.view);
replayButton.hideButton();
replayButton.view.addEventListener("click", function () {
  game.createDeckCard(game.shuffle());
  replayButton.hideButton();
});

document.body.appendChild(retryButton.view);
retryButton.hideButton();
retryButton.view.addEventListener("click", function () {
  game.createDeckCard(game.deckRetryCard);
  retryButton.hideButton();
});
