import { Label } from "./Label.js";
import { Card } from "./Card.js";
import { Node } from "./Node.js";
import { Button } from "./Button.js";

let arrDuplicate = [];

let shuffleImage = shuffle();
function shuffle() {
  for (let i = 0; i < 10; i++) {
    const arrImage = "./img/digimon-" + i + ".png";
    arrDuplicate.push(arrImage, arrImage);
  }
  // arrDuplicate.sort(() => Math.random() - 0.5);

  return arrDuplicate;
}

export class Game extends Node {
  constructor() {
    super();
    this.canClick = true; //flag
    this.deckCard = [];
    this.scoreNum = 1000;
    this._scoreBox = null;
    this._scoreUpdate = null;
    this.playButton = null;
    this.cardMatch = [];
    this.temp = [];
    this.tempIndex = [];
    this.scoreUpdateNum = 0;
  }
  createTable() {
    this.view = document.createElement("div");
    document.body.appendChild(this.view);
    this.view.style.position = "absolute";
    this.view.style.backgroundColor = "#4CD6E5";
    this.view.style.backgroundImage = "url(./img/bg.png)";
    // this.view.style.backgroundSize = "contain";

    this.x = 0;
    this.y = 100;
  }
  createScoreBox(scoreNum, scoreUpdateNum) {
    this._scoreBox = new Label("Score =  " + scoreNum + scoreUpdateNum);
    document.body.appendChild(this._scoreBox.view);
    this._scoreBox.view.style.width = "350px";
    this._scoreBox.view.style.height = "40px";
    this._scoreBox.view.style.border = "2px solid black ";
    this._scoreBox.view.style.justifyContent = "center";
    this._scoreBox.view.style.alignItems = "center";
    this._scoreBox.view.style.display = "flex";
  }

  createScoreUpdate() {
    this._scoreUpdate = new Label();
    document.body.appendChild(this._scoreUpdate.view);
    this._scoreUpdate.view.style.color = "#4caf50";
    this._scoreUpdate.view.style.textAlign = "right";
    this._scoreUpdate.view.innerHTML = " ";
    this._scoreUpdate.y = 10;
    this._scoreUpdate.x = 280;
    if (this.scoreUpdateNum == 1000) {
      this._scoreUpdate.view.style.visibility = "visible";
      this._scoreUpdate.view.innerHTML = "+1000";
    } else if (this.scoreUpdateNum == 500) {
      this._scoreUpdate.view.style.visibility = "visible";
      this._scoreUpdate.view.style.color = "red";
      this._scoreUpdate.view.innerHTML = "-500";
    }
    setTimeout(() => {
      this._scoreUpdate.view.style.visibility = "hidden";
    }, 500);
  }

  createDeckCard() {
    let index = 0;
    let cards = [];
    let col = 4;
    let row = 5;
    let imgIndex = shuffleImage;
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
  }
  onClickCard(card) {
    if (!this.canClick) return;
    let openSound = new Audio("./audio/openSound.wav");
    let closeSound = new Audio("./audio/closeSound.wav");
    let hideSound = new Audio("./audio/hideSound.wav");
    openSound.play();
    //First Click
    card.children[2].hideLabel();
    card.hideCover();
    this.deckCard.push(card);
    this.tempIndex.push(card.children[2].string);
    this.temp.push(card.path);
    //Check Card
    if (this.tempIndex.length == 2) {
      this.canClick = false;
      //Same Card
      if (this.tempIndex[0] == this.tempIndex[1]) {
        setTimeout(() => {
          this.deckCard[0].flipClose();
          this.deckCard[1].flipClose();
          this.resetCard();
        }, 1500);
      } else {
        if (this.temp.length >= 2 && this.deckCard.length >= 2) {
          this.canClick = false;
          if (this.temp[0] === this.temp[1]) {
            //Match Card
            this.cardMatch.push(this.deckCard[0]);
            this.cardMatch.push(this.deckCard[1]);
            this.scoreNum += 1000;
            this._scoreBox.string = "Score = " + this.scoreNum;
            //   this.animateValue(
            //     this._scoreBox,
            //     this.scoreNum,
            //     (this.scoreNum += 1000),
            //     5000
            //   );
            this.scoreUpdateNum = 1000;
            this.createScoreUpdate(this.scoreUpdateNum);
            setTimeout(() => {
              this.deckCard[0].flipHide();
              this.deckCard[1].flipHide();
              this.resetCard();
              hideSound.play();
            }, 1500);
          } else {
            //Not Match Card
            this.scoreNum -= 500;
            this._scoreBox.string = "Score =  " + this.scoreNum;
            this.scoreUpdateNum = 500;
            this.createScoreUpdate(this.scoreUpdateNum);
            setTimeout(() => {
              this.deckCard[0].flipClose();
              this.deckCard[1].flipClose();
              this.resetCard();
              closeSound.play();
            }, 1500);
          }
          if (this.scoreNum <= 0) {
            setTimeout(() => {
              this.canClick = false;

              alert("Game Over");
              let youLose = new Audio("./audio/youLose.wav");
              youLose.play();
              window.location.reload();
            }, 1500);
          }
          if (this.cardMatch.length == 20 && this.scoreNum != 0) {
            setTimeout(() => {
              alert(`Congrats!!! You'r Score: ${this.scoreNum}`);
              let youWin = new Audio("./audio/youWin.mp3");
              youWin.play();
              window.location.reload();
            }, 1500);
          }
        }
      }
      this.tempIndex = [];
    }
  }
  resetCard() {
    this.deckCard = [];
    this.temp = [];
    this.canClick = true;
  }
}

let game = new Game();
game.view.style.backgroundImage = "url(./img/backgroundPokemon.png)";
let playButton = new Button("Play", 0, 0);
document.body.appendChild(playButton.view);
playButton.view.addEventListener("click", function () {
  playButton.hideButton();
  replayButton.showButton();
  game.createTable();
  game.createDeckCard();
  let backgroundSound = new Audio("./audio/musicBackground.mp3");
  backgroundSound.play();
});

let replayButton = new Button("Replay", 370, 0);
document.body.appendChild(replayButton.view);
replayButton.hideButton();
replayButton.view.addEventListener("click", function () {
  window.location.reload();
});
