import { Node } from "./Node.js";
export class Label extends Node {
  constructor(string) {
    super();
    this._string = string || "";
    this.string = this._string;
    this.view.style.color = "black";
    this.view.style.fontSize = "30px";
    this.view.style.position = "absolute";
  }

  get string() {
    return this._string;
  }

  set string(value) {
    this._string = value;
    this.view.innerHTML = this._string;
  }
  showLabel() {
    this.view.style.visibility = "visible";
  }
  hideLabel() {
    this.view.style.visibility = "hidden";
  }
}
