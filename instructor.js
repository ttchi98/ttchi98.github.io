var arrPicture = [
  "url(./img/Articuno.png)",
  "url(./img/Bulbasaur.png)",
  "url(./img/Charmander.png)",
  "url(./img/Eevee.png)",
  "url(./img/mew.png)",
  "url(./img/mewtwo.png)",
  "url(./img/Moltres.png)",
  "url(./img/pikachu.png)",
  "url(./img/Squirtle.png)",
  "url(./img/Zapdos.png)",
  "url(./img/Articuno.png)",
  "url(./img/Bulbasaur.png)",
  "url(./img/Charmander.png)",
  "url(./img/Eevee.png)",
  "url(./img/mew.png)",
  "url(./img/mewtwo.png)",
  "url(./img/Moltres.png)",
  "url(./img/pikachu.png)",
  "url(./img/Squirtle.png)",
  "url(./img/Zapdos.png)",
];
var boxField = [];
var temp = [];
var click = -1;
var win = 0;
var score = 10000;

document.body.style.backgroundColor = "#9b9b9b";

//Score
var scoreBox = document.createElement("div");
document.body.appendChild(scoreBox);
scoreBox.style.width = "200px";
scoreBox.style.height = "50px";
scoreBox.style.backgroundColor = "#3D9C9C";
scoreBox.style.marginBottom = "10px";
scoreBox.style.border = "solid 2px black";
scoreBox.style.borderRadius = "16px";

var numScore = document.createElement("div");
scoreBox.appendChild(numScore);
numScore.style.position = "relative";
numScore.style.top = "5px";
numScore.style.textAlign = "center";
numScore.innerHTML = "Score: " + score;
numScore.style.fontSize = "30px";

//Final
var finalBox = document.createElement("div");
document.body.appendChild(finalBox);
finalBox.style.width = "400px";
finalBox.style.height = "auto";
finalBox.style.backgroundColor = "#73E000";
finalBox.style.marginBottom = "10px";
finalBox.style.border = "solid 2px black";
finalBox.style.borderRadius = "16px";
finalBox.style.display = "none";

var numFinal = document.createElement("div");
finalBox.appendChild(numFinal);
numFinal.style.position = "relative";
numFinal.style.textAlign = "center";
numFinal.innerHTML = "You won with Score: " + score + " !!!";
numFinal.style.fontSize = "30px";

//Box
var containBox = document.createElement("div");
document.body.appendChild(containBox);
containBox.style.width = "550px";
containBox.style.height = "auto";
containBox.style.backgroundColor = "#6e6e6e";
containBox.style.display = "flex";
containBox.style.flexWrap = "wrap";
containBox.style.borderRadius = "16px";

const box = (number, img) => {
  var cover = document.createElement("div");
  containBox.appendChild(cover);
  cover.style.width = "100px";
  cover.style.height = "100px";
  cover.style.backgroundColor = "orange";
  cover.style.margin = "3px";
  cover.style.border = "solid 2px black";
  cover.style.cursor = "pointer";
  cover.style.borderRadius = "16px";
  cover.style.transition = "transform 0.8s";
  cover.style.transformStyle = "preserve-3d";
  cover.id = number;

  var numBox = document.createElement("div");
  cover.appendChild(numBox);
  numBox.style.position = "relative";
  numBox.style.top = "30px";
  numBox.style.textAlign = "center";
  numBox.innerHTML = number;
  numBox.style.fontSize = "30px";

  cover.addEventListener("mousedown", function () {
    cover.style.backgroundColor = "#fff";
    cover.style.backgroundImage = img;
    cover.style.backgroundSize = "contain";
    cover.style.transform = "rotateY(180deg)";
    numBox.innerHTML = "";
    temp.push(cover.id);

    score += 1000;
    numScore.innerHTML = "Score: " + score;
    console.log(score);
  });
};

//Render
const render = () => {
  const randomArray = (list) => {
    list.sort(() => Math.random() - 0.5);
  };
  randomArray(arrPicture);

  for (index = 0; index < 20; index++) {
    boxField.push(box(index + 1, arrPicture[index]));
  }
};
render();
containBox.addEventListener("mousedown", function () {
  temp.push(boxField.id);
  console.log(temp);
});

const boxOpen = () => {
  temp.push(this);
  var len = boxOpen.length;
  if (len === 2) {
    if (temp[0].type === temp[1].type) {
      matched();
    } else {
      unmatched();
    }
  }
};

const matched = () => {
  temp[0].classList.add("match");
  temp[1].classList.add("match");
  temp[0].classList.remove("show", "open");
  temp[1].classList.remove("show", "open");
  temp = [];
};

function unmatched() {
  temp[0].classList.add("unmatched");
  temp[1].classList.add("unmatched");
  disable();
  setTimeout(function () {
    temp[0].classList.remove("show", "open", "unmatched");
    temp[1].classList.remove("show", "open", "unmatched");
    enable();
    temp = [];
  }, 1100);
}

function disable() {
  Array.prototype.filter.call(cards, function (card) {
    card.classList.add("disabled");
  });
}
