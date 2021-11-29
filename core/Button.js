import { Node } from "./Node.js";
export class Button extends Node {
  constructor(string, x, y) {
    super();
    this._string = string || "";
    this.string = this._string;
    this.view.style.color = "white";
    this.view.style.fontSize = "30px";
    this.view.style.position = "absolute";
    this.width = 100;
    this.height = 50;
    this.view.style.left = x + "px";
    this.view.style.top = y + "px";
    this.view.style.width = "120px";
    this.view.style.height = "60px";
    // this.view.style.backgroundColor = "red";
    this.view.style.border = "2px solid black";
    this.view.style.justifyContent = "center";
    this.view.style.display = "flex";
    this.view.style.alignItems = "center";
    this.view.style.cursor = "pointer";
    this.view.style.backgroundColor = "#50C9C3";
    this.view.style.borderRadius = "10px";
    this.view.className = "button";
  }

  get string() {
    return this._string;
  }

  set string(value) {
    this._string = value;
    this.view.innerHTML = this._string;
  }
  showButton() {
    this.view.style.visibility = "visible";
    this.view.style.display = "flex";
  }
  hideButton() {
    this.view.style.display = "none";
  }
  hoverButton() {
    this.view.style.backgroundColor = "red";
  }
}
