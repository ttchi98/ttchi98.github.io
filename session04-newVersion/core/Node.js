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
  get height() {
    return this._height;
  }
  set height(value) {
    this._height = value;
    this.view.style.height = this._height + "px";
  }
  get width() {
    return this._width;
  }
  set width(value) {
    this._width = value;
    this.view.style.width = this._width + "px";
  }
  initView() {
    this.view = document.createElement("div");
  }
  flipOpen() {
    if (!this._active) {
      let tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });
      tl.to(this.view, { scaleX: 0, duration: 0.5 });
      tl.to(this.view, { scaleX: 1, duration: 0.5 });
    }
  }

  flipClose() {
    if (!this._active) {
      this._card.view.style.visibility = "visible";
      this._img.view.style.visibility = "visible";
      this._label.view.style.visibility = "visible";

      let tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });
      tl.to(this.view, { scaleX: 0, duration: 0.5 });
      tl.to(this.view, { scaleX: 1, duration: 0.5 });
    }
  }
  flipHide() {
    this.view.style.zIndex = "1";
    let tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });
    tl.delay(0.1)
      .fromTo(this.view, { scale: 1 }, { scale: 1.5, duration: 1 })
      .add(() => {
        this._card.view.style.display = "none";
        this._img.view.style.display = "none";
        this._label.view.style.display = "none";
        this.view.style.display = "none";
      });
  }
  delete() {
    this.view.style.display = "none";
  }
  show() {
    this.view.style.display = "inline";
  }

  on(event, listener) {
    this.view.addEventListener(event, listener);
  }

  addChild(node) {
    this.children.push(node);
    this.view.appendChild(node.view);
  }
  animateValue(id, start, end, duration) {
    if (start === end) return;
    var range = end - start;
    var current = start;
    var increment = end > start ? 1 : -1;
    var stepTime = Math.abs(Math.floor(duration / range));
    var obj = document.getElementById(id);
    var timer = setInterval(function () {
      current += increment;
      obj.innerHTML = current;
      if (current == end) {
        clearInterval(timer);
      }
    }, stepTime);
  }
}
