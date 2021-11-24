import { Node } from "./Node.js";

export class Cover extends Node {
  constructor(image, index) {
    super();
    this.image = image;
    this.index = index;
    this.view.style.backgroundColor = "#4CD6E5";
    this.view.style.width = "105px";
    this.view.style.height = "105px";
    this.view.style.margin = "10px";
    this.view.style.textAlign = "center";
    this.view.style.border = "2px solid black";
    this.view.style.cursor = "pointer";
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
    this.view.style.top = "460px";
    this.view.style.fontSize = "30px";
    this.view.style.border = "2px solid black";
    this.view.style.textAlign = "center";
  }
}

export class Button extends Node {
  constructor(index) {
    super();
    this.index = index;
    this.view.style.backgroundColor = "red";
    this.view.style.width = "100px";
    this.view.style.height = "40px";
    this.view.style.position = "absolute";
    this.view.style.top = "460px";
    this.view.style.left = "220px";
    this.view.style.fontSize = "30px";
    this.view.style.border = "2px solid black";
    this.view.style.textAlign = "center";
    this.view.style.cursor = "pointer";
    this.view.style.backgroundSize = "contain";
  }
}
