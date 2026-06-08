const dead = document.getElementById("dead");
const lost = document.getElementById("lost");

function getHole(index) {
  return document.getElementById(`hole${index}`);
}

function resetGame() {
  dead.textContent = 0;
  lost.textContent = 0;
}

for (let i = 1; i <= 9; i += 1) {
  getHole(i).onclick = function () {
    if (this.className.includes("hole_has-mole")) {
      dead.textContent = Number(dead.textContent) + 1;
    } else {
      lost.textContent = Number(lost.textContent) + 1;
    }

    if (Number(dead.textContent) === 10) {
      alert("Победа!");
      resetGame();
    }

    if (Number(lost.textContent) === 5) {
      alert("Вы проиграли!");
      resetGame();
    }
  };
}