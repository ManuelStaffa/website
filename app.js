if (window.attachEvent) {
  window.attachEvent("onload", reset);
} else if (window.addEventListener) {
  window.addEventListener("load", reset, false);
} else {
  document.addEventListener("load", reset, false);
}

const history = document.querySelector(".history");
const result = document.querySelector(".result");
const low_high = document.querySelector(".low_high");
const input = document.querySelector(".input");
const button = document.querySelector(".button");
const amount = document.getElementById("amount");

var random =
  Math.floor(Math.random() * document.getElementById("amount").value) + 1;
var turn = 1;

amount.addEventListener("change", function() {
  random =
    Math.floor(Math.random() * document.getElementById("amount").value) + 1;
});

amount.addEventListener("change", function() {
  document.getElementById("input").max = parseInt(
    document.getElementById("amount").value
  );

  if (
    document.getElementById("input").max > 1000 ||
    parseInt(document.getElementById("amount").value) > 1000
  ) {
    document.getElementById("input").max = 1000;
    document.getElementById("amount").value = 1000;
  }

  if (
    document.getElementById("input").max < 1 ||
    parseInt(document.getElementById("amount").value) < 1
  ) {
    document.getElementById("input").max = 1;
    document.getElementById("amount").value = 1;
  }
});

difficulty.addEventListener("change", function() {
  if (document.getElementById("difficulty").value > 50) {
    document.getElementById("difficulty").value = 50;
  }

  if (document.getElementById("difficulty").value < 1) {
    document.getElementById("difficulty").value = 1;
  }
});

function check() {
  var guess = parseInt(document.getElementById("input").value);
  if (
    guess > -1 &&
    guess < parseInt(document.getElementById("amount").value) + 1
  ) {
    if (turn == 0) {
      history.textContent = "Versuche ";
    }
    history.textContent += guess + " ";
    if (guess == random) {
      result.textContent = "RICHTIG";
      document.getElementById("result").style.backgroundColor = "green";
      low_high.textContent = "Du hast gewonnen.";
      gameOver();
    } else if (
      turn <
      parseInt(document.getElementById("difficulty").value)
    ) {
      result.textContent = "FALSCH";
      document.getElementById("result").style.backgroundColor = "red";
      if (guess > random) {
        low_high.textContent = "zu hoch";
      } else {
        low_high.textContent = "zu niedrig";
      }
    } else {
      document.getElementById("result").style.backgroundColor = "red";
      result.textContent = "Du hast verloren. n00b.";
      gameOver();
    }
    turn++;
    document.getElementById("input").value = "";
  } else {
    document.getElementById("input").value = "";
    low_high.textContent = "Fehler";
    result.textContent = `Gebe eine Zahl zwischen 1 und ${
      document.getElementById("amount").value
    } ein.`;
    document.getElementById("result").style.backgroundColor = "#e0af02";
  }
}

function gameOver() {
  document.getElementById("input").value = "";
  document.getElementById("submit").disabled = true;
  turn = 0;
}

function reset() {
  history.textContent = "Versuche: ";
  low_high.textContent = "";
  result.textContent = "";
  document.getElementById("submit").disabled = false;

  random =
    Math.floor(Math.random() * document.getElementById("amount").value) + 1;
}