import { Node } from "./Node.js";
export class Label extends Node {
  constructor(string) {
    super();
    this._string = string || "";
    this.string = this._string;
    this.view.style.color = "black";
    this.view.style.fontSize = "30px";
    this.x = 35;
    this.y = 30;
  }

  get string() {
    return this._string;
  }

  set string(value) {
    this._string = value;
    this.view.innerHTML = this._string;
  }

  open() {
    this.string = "";
  }

  close(value) {
    this.string = value;
  }
}
