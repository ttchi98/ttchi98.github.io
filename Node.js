export class Node {
  constructor() {
    this._x = 0;
    this._y = 0;
    this._width = 0;
    this._height = 0;
    this._active = true;
    this.children = [];
    this.initView();
    this.view.style.position = "absolute";
    this.view.style.userSelect = "none";
  }
  get x() {
    return this._x;
  }
  set x(value) {
    this._x = value;
    this.view.style.left = this._x + "px";
  }
  get y() {
    return this._y;
  }
  set y(value) {
    this._y = value;
    this.view.style.top = this._y + "px";
  }
  initView() {
    this.view = document.createElement("div");
  }
  addChild(node) {
    this.children.push(node);
    this.view.appendChild(node.view);
  }
}
