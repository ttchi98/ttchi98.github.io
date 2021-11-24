import { Node } from "./Node.js";

export class Cover extends Node {
  constructor(image, index) {
    super();
    this.image = image;
    this.index = index;
    this.isDeleted = false;
    this.view.style.backgroundColor = "#4CD6E5";
    this.view.style.width = "105px";
    this.view.style.height = "105px";
    this.view.style.margin = "10px";
    this.view.style.textAlign = "center";
    this.view.style.border = "2px solid black";
    this.view.style.cursor = "pointer";
  }

  open() {
    if (!this.isDeleted) {
      this.view.style.backgroundImage = this.image;
      this.view.style.backgroundColor = "#fff";
      this.view.style.backgroundSize = "contain";
      // this.gasp.to({ duration: 1, rotationY: 180 });
    }
  }

  close() {
    if (!this.isDeleted) {
      this.view.style.backgroundColor = "#4CD6E5";
      this.view.style.backgroundImage = "none";
    }
  }
  delete() {
    this.view.style.backgroundColor = "black";
    this.view.style.display = "none";
    this.isDeleted = true;
  }
  // flipOpen() {
  //   let tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });
  //   tl.to(cover, { scaleX: 0, duration: 1 });
  //   tl.add(function () {
  //     cover.style.display = "none";
  //   });
  //   tl.to(cover, { scaleX: 1, duration: 1 });
  // }
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
