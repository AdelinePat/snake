import "./style.css";

// const HEIGHT = 500;
const WIDTH = 800;
const NUMBEROFCOLUMN = 20;
const NUMBEROFLINE = 12;
const gridElem = WIDTH / NUMBEROFCOLUMN;
const HEIGHT = gridElem * NUMBEROFLINE;
const SPEED = 500;
// Grid is 20 x 12 cell (40x40px)

const canvas = document.querySelector("canvas");
canvas.setAttribute("height", HEIGHT);
canvas.setAttribute("width", WIDTH);

const ctx = canvas.getContext("2d");
let direction = "up";
const snake = [
  [9, 9],
  [8, 9],
  [7, 9],
];

const apple = [5, 5];

function gameOver() {
  if (
    ((direction === "right" || direction === "left") &&
      snake[0][0] >= NUMBEROFCOLUMN) ||
    snake[0][1] >= NUMBEROFCOLUMN ||
    snake[0][0] < 0 ||
    snake[0][1] < 0
  ) {
    console.log("perdu!");
    return true;
  } else if (
    ((direction === "up" || direction === "down") &&
      snake[0][0] >= NUMBEROFLINE) ||
    snake[0][1] >= NUMBEROFLINE ||
    snake[0][0] < 0 ||
    snake[0][1] < 0
  ) {
    console.log("perdu!");
    return true;
  } else {
    const [head, ...body] = snake;
    for (let bodyEleme of body) {
      if (bodyEleme[0] === head[0] && bodyEleme[1] === head[1]) {
        return true;
      }
    }
  }
  return false;
}

function drawMap() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

function drawSnake() {
  ctx.fillStyle = "green";
  for (let body of snake) {
    ctx.fillRect(body[0] * gridElem, body[1] * gridElem, gridElem, gridElem);
  }
}

function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(apple[0] * gridElem, apple[1] * gridElem, gridElem, gridElem);
}

function updateSnakePosition() {
  let head;
  switch (direction) {
    case "right": {
      head = [snake[0][0] + 1, snake[0][1]];
      break;
    }
    case "left": {
      head = [snake[0][0] - 1, snake[0][1]];
      break;
    }
    case "up": {
      head = [snake[0][0], snake[0][1] - 1];
      break;
    }
    case "down": {
      head = [snake[0][0], snake[0][1] + 1];
      break;
    }
  }
  snake.unshift(head);
  snake.pop();
  return gameOver();
}

function move() {
  if (!updateSnakePosition()) {
    drawMap();
    drawSnake();
    drawApple();
    setTimeout(() => {
      requestAnimationFrame(move);
    }, 1000 - SPEED);
  } else {
    alert("Perdu!");
  }
}

// drawMap();
// drawSnake();
// drawApple();
window.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "ArrowDown":
    case "keyS": {
      direction = "down";
      break;
    }
    case "ArrowUp":
    case "keyZ": {
      direction = "up";
      break;
    }
    case "ArrowLeft":
    case "keyQ": {
      direction = "left";
      break;
    }
    case "ArrowRight":
    case "keyD": {
      direction = "right";
      break;
    }
  }
});
requestAnimationFrame(move);
