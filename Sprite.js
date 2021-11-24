import { Node } from "./Node.js";

export class Sprite extends Node {
  constructor(image) {
    super();
    this.setImage(image);
  }
  initView() {
    this.view = document.createElement("img");
    this.view.style.position = "absolute";
  }

  setImage(src) {
    this.view.src = src;
  }
}
