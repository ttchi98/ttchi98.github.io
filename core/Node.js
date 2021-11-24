export class Node {
  constructor() {
    this._x = 0;
    this._y = 0;
    this._width = 0;
    this._height = 0;
    this._active = false;
    this.children = [];
    this.initView();
    this.view.style.position = "absolute";
    this.view.style.userSelect = "none";
  }
  get active() {
    return this._active;
  }
  set active(value) {
    this._active = value;
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
  open() {
    if (!this._active) {
      setTimeout(() => {
        this.view.style.backgroundImage = this.image;
        this.view.style.backgroundColor = "#fff";
        this.view.style.backgroundSize = "contain";
      }, 500);
      let tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });
      tl.to(this.view, { scaleX: 0, duration: 0.5 });
      tl.to(this.view, { scaleX: 1, duration: 0.5 });
    }
  }

  close() {
    if (!this._active) {
      this.view.style.backgroundColor = "#4CD6E5";
      this.view.style.backgroundImage = "none";
    }
  }
  hide() {
    // this.view.style.position = "absolute";
    this.view.style.zIndex = "1";
    setTimeout(() => {
      this.view.style.display = "none";
    }, 500);
    gsap.fromTo(this.view, { scale: 1 }, { scale: 2, duration: 2 });
  }
  delete() {
    this.view.style.display = "none";
  }
  show() {
    this.view.style.display = "inline";
  }
  initView() {
    this.view = document.createElement("div");
  }
  addChild(node) {
    this.children.push(node);
    this.view.appendChild(node.view);
  }
}
