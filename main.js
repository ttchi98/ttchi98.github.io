import { Game } from "./core/Game.js";

const game = new Game();

document.body.style.backgroundImage = "url(./img/background.jpeg)";

document.body.appendChild(game.view);
