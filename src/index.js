import "./style.css";
import appleFile from "./assets/apple.png";

// const HEIGHT = 500;
const WIDTH = 800;
const NUMBEROFCOLUMN = 20;
const NUMBEROFLINE = 12;
const gridElem = WIDTH / NUMBEROFCOLUMN;
const HEIGHT = gridElem * NUMBEROFLINE;
let speed = 400;
// Grid is 20 x 12 cell (40x40px)
const appleImg = new Image();
appleImg.src = appleFile;
let assetsReady = false;
appleImg.onload = () => {
  assetsReady = true;
};

const canvas = document.querySelector("canvas");
canvas.setAttribute("height", HEIGHT);
canvas.setAttribute("width", WIDTH);

const keyToDirection = {
  ArrowUp: "up",
  KeyW: "up",
  ArrowDown: "down",
  KeyS: "down",
  ArrowLeft: "left",
  KeyA: "left",
  ArrowRight: "right",
  KeyD: "right",
};

const ctx = canvas.getContext("2d");
let direction = "up";
let score = 0;

const snake = [
  [9, 9],
  [8, 9],
  [7, 9],
];

let apple = [5, 5];

function gameOver() {
  if (
    snake[0][0] >= NUMBEROFCOLUMN ||
    snake[0][1] >= NUMBEROFLINE ||
    snake[0][0] < 0 ||
    snake[0][1] < 0
  ) {
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
  if (!assetsReady) {
    ctx.fillStyle = "red";
    ctx.fillRect(apple[0] * gridElem, apple[1] * gridElem, gridElem, gridElem);
  }

  ctx.drawImage(
    appleImg,
    apple[0] * gridElem,
    apple[1] * gridElem,
    gridElem,
    gridElem
  );
}

function generateApple() {
  const [x, y] = [
    Math.trunc(Math.random() * NUMBEROFCOLUMN - 1),
    Math.trunc(Math.random() * NUMBEROFLINE - 1),
  ];
  for (let body of snake) {
    if (body[0] === x && body[1] === y) {
      return generateApple();
    }
  }
  apple = [x, y];
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
  if (head[0] === apple[0] && head[1] === apple[1]) {
    score += 1;
    if (speed <= 900 && speed + score * 50 <= 900) {
      speed += score * 50;
    }
    generateApple();
  } else {
    snake.pop();
  }
  //   console.log(snake[0][0], snake[0][1]);
  return gameOver();
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "40px sans-serif";
  ctx.textBaseline = "top";
  ctx.fillText(score, gridElem, gridElem);
}

function move() {
  if (!updateSnakePosition()) {
    drawMap();
    drawSnake();
    drawApple();
    drawScore();
    setTimeout(() => {
      requestAnimationFrame(move);
    }, 1000 - speed);
  } else {
    alert("Perdu! Votre score est de : ", score);
  }
}

window.addEventListener("keydown", (event) => {
  const newDirection = keyToDirection[event.code];
  if (!newDirection) {
    return;
  }
  direction = newDirection;
});
requestAnimationFrame(move);
