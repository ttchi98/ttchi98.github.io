import { Node } from "./Node.js";
export class Sprite extends Node {
    constructor(path) {
        super()
        this.setImage(path);
    }
    initView() {
        this.view = document.createElement('img');
        this.view.style.position = "absolute";
    }
    setImage(src) {
        this.view.src = src;
        this.view.style.width = "90px";
        this.view.style.height = "90px";
    }
    showImage() {
        this.view.style.visibility = "visible";
    }
    hideImage() {
        // this.view.style.visibility = "hidden";
        this.view.style.display = "none";
    }

}