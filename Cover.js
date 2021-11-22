import { Node } from "./Node.js";

function play(audio) {
  var audio = new Audio(audios);
  audio.play();
}
export class Cover extends Node {
  constructor(image, index) {
    super();
    this.image = image;
    this.index = index;
    this.isDeleted = false;
    this.view.style.backgroundColor = "orange";
    this.view.style.width = "100px";
    this.view.style.height = "100px";
    this.view.style.margin = "10px";
    this.view.style.textAlign = "center";
    this.view.style.border = "2px solid black";

    this.view.style.transition = "transform 0.8s";
    this.view.style.transform = "scale(1)";
    this.view.style.transformStyle = "preserve-3d";
  }

  open() {
    if (!this.isDeleted) {
      this.view.style.backgroundColor = "#fff";
      this.view.style.backgroundImage = this.image;
      this.view.style.backgroundSize = "contain";
      this.view.style.transform = "rotateY(180deg)";
    }
  }

  close() {
    if (!this.isDeleted) {
      this.view.style.backgroundColor = "orange";
      this.view.style.backgroundImage = "none";
      this.view.style.transform = "rotateY(360deg)";
    }
  }
  delete() {
    this.view.style.backgroundImage = "url(./img/pokemonball.png)";
    this.view.style.backgroundSize = "contain";

    // this.view.style.backgroundColor = "black";
    // this.view.style.backgroundImage = "none";
    this.isDeleted = true;
  }
}

export class Score extends Node {
  constructor(index) {
    super();
    this.index = index;
    this.view.style.backgroundColor = "#36df52";
    this.view.style.width = "200px";
    this.view.style.height = "40px";
    this.view.style.position = "absolute";
    this.view.style.top = "450px";
    this.view.style.fontSize = "30px";
    this.view.style.border = "2px solid black";
    this.view.style.textAlign = "center";
  }
}
