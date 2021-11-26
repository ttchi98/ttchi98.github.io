//0: cover 1: img 2: label
import { Node } from "./Node.js";
import { Sprite } from "./Sprite.js";
import { Label } from "./Label.js";
export class Card extends Node {
  constructor(path, index) {
    super();
    this.string = index;
    this._path = path;
    this._card;
    this._img;
    this._label;
    this.active = true;
    this._isDelete = false;
    this.view.style.border = "1.5px solid black";
    this.view.style.cursor = "pointer";
  }
  get path() {
    return this._path;
  }
  set path(value) {
    this._path = value;
    this.view.src = this.path;
  }
  get isDelete() {
    return this._isDelete;
  }
  set isDelete(value) {
    this._isDelete = value;
  }
  createCover() {
    this._card = new Sprite("./img/cover.jpeg");
    this.addChild(this._card);
    this._card.active = true;
    this._card.width = 120;
    this._card.height = 150;
    this.view.style.width = "120px";
    this.view.style.height = "120px";
    this.view.style.justifyContent = "center";
    this.view.style.display = "flex";
    this.view.style.alignItems = "center";
    this.view.style.userSelect = "none";
  }
  createImg() {
    this._img = new Sprite(this._path);
    this.view.style.backgroundColor = "#fff";
    this.addChild(this._img);
    this._img.width = 120;
    this._img.height = 150;
  }
  createLabel() {
    this._label = new Label(this.string);
    this.addChild(this._label);
    this._label.active = true;
  }
  showCover() {
    this._card.view.style.visibility = "visible";
  }
  hideCover() {
    this._card.view.style.visibility = "hidden";

    let tl = gsap.timeline({ repeat: 0, duration: 0 });
    tl.to(this.view, { scaleX: 0, duration: 0.5 });
    tl.to(this.view, { scaleX: 1, duration: 0.5 });
  }
  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }
}
