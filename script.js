const playGrid = document.querySelector("#playgrid");
const info = document.querySelector("#info");
const btnReset = document.querySelector("#btn-reset");
let player = "x";
let whoWin = "";
info.innerHTML = "x turn";
const patternWin = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function createBox() {
  for (let i = 0; i < 9; i++) {
    let div = document.createElement("div");
    div.classList.add("box");
    div.addEventListener("click", clickMark);

    playGrid.append(div);
  }
}
createBox();

function clickMark(e) {
  e.target.classList.add(player);
  e.target.removeEventListener("click", clickMark);
  changePlayer();
  checkWin();
}

function changePlayer() {
  if (player === "x") {
    player = "o";
    info.innerHTML = "o turn";
  } else {
    player = "x";
    info.innerHTML = "x turn";
  }
}

function checkWin() {
  let allDiv = document.querySelectorAll(".box");
  patternWin.forEach((patt) => {
    let [a, b, c] = patt;
    if (
      allDiv[a].classList.contains("x") &&
      allDiv[b].classList.contains("x") &&
      allDiv[c].classList.contains("x")
    ) {
      whoWin = "x";
    }
    if (
      allDiv[a].classList.contains("o") &&
      allDiv[b].classList.contains("o") &&
      allDiv[c].classList.contains("o")
    ) {
      whoWin = "o";
    }
  });
  if (whoWin !== "") {
    if (whoWin === "x") {
      info.innerHTML = "x win!";
    } else {
      info.innerHTML = "o win!";
    }
    allDiv.forEach((er) => {
      er.removeEventListener("click", clickMark);
    });
  }
  let allx = document.querySelectorAll(".x");
  let allo = document.querySelectorAll(".o");

  if (allo.length + allx.length === 9) {
    info.innerHTML = "Draw!";
  }
}
btnReset.addEventListener("click", resetGame);

function resetGame() {
  let allDiv = document.querySelectorAll(".box");

  allDiv.forEach((d) => {
    d.classList.remove("x");
    d.classList.remove("o");
    d.addEventListener("click", clickMark);
  });
  player = "x";
  whoWin = "";
  info.innerHTML = "x turn!";
}
