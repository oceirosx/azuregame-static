// Obtener el canvas y el contexto 2D
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Definir las variables del juego
var ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  speed: 5,
  dx: 5,
  dy: -5
};

var paddle = {
  x: 0,
  y: canvas.height / 2 - 50,
  width: 10,
  height: 100,
  speed: 10,
  dy: 0
};

var score = {
  player: 0,
  computer: 0
};

// Función para dibujar la pelota
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath();
}

// Función para dibujar la paleta
function drawPaddle(x, y, width, height) {
  ctx.fillStyle = "#fff";
  ctx.fillRect(x, y, width, height);
}

// Función para dibujar la puntuación
function drawScore() {
  ctx.font = "30px Arial";
  ctx.fillStyle = "#fff";
  ctx.fillText("Player: " + score.player, 50, 50);
  ctx.fillText("Computer: " + score.computer, canvas.width - 200, 50);
}

// Función para mover la paleta del jugador
function movePaddle() {
  paddle.y += paddle.dy;

  if (paddle.y < 0) {
    paddle.y = 0;
  }

  if (paddle.y + paddle.height > canvas.height) {
    paddle.y = canvas.height - paddle.height;
  }
}

// Función para mover la pelota
function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Verificar si la pelota ha chocado con los bordes del canvas
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.dy = -ball.dy;
  }

  // Verificar si la pelota ha chocado con la paleta del jugador
  if (
    ball.x - ball.radius < paddle.x + paddle.width &&
    ball.y + ball.radius > paddle.y &&
    ball.y - ball.radius < paddle.y + paddle.height
  ) {
    ball.dx = -ball.dx;
    ball.speed += 0.5;
  }

  // Verificar si la pelota ha salido del canvas
  if (ball.x + ball.radius > canvas.width) {
    score.player++;
    resetBall();
  } else if (ball.x - ball.radius < 0) {
    score.computer++;
    resetBall();
  }
}

function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.speed = 5;
  ball.dx = -ball.dx;
}

// Función para mover la paleta de la computadora
function moveComputerPaddle() {
  if (ball.y > computerPaddle.y + computerPaddle.height / 2) {
    computerPaddle.y += computerPaddle.speed;
  } else {
    computerPaddle.y -= computerPaddle.speed;
  }
}

// Función principal del juego
function game() {
  // Limpiar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar la pelota y la paleta del jugador
  drawBall();
  drawPaddle(paddle.x, paddle.y, paddle.width, paddle.height);

  // Mover la pelota y la paleta del jugador
  moveBall();
  movePaddle();

  // Verificar si el juego ha terminado
  if (score.player >= 10) {
    alert("¡Ganaste!");
    document.location.reload();
  } else if (score.computer >= 10) {
    alert("¡Perdiste!");
    document.location.reload();
  }

  // Dibujar la puntuación
  drawScore();

  // Mover la paleta de la computadora
  moveComputerPaddle();

  // Dibujar la paleta de la computadora
  drawPaddle(
    computerPaddle.x,
    computerPaddle.y,
    computerPaddle.width,
    computerPaddle.height
  );

  // Animar el juego
  requestAnimationFrame(game);
}

// Asignar las teclas del teclado para mover la paleta del jugador
document.addEventListener("keydown", function(event) {
  if (event.code === "ArrowUp") {
    paddle.dy = -paddle.speed;
  } else if (event.code === "ArrowDown") {
    paddle.dy = paddle.speed;
  }
});

document.addEventListener("keyup", function(event) {
  if (event.code === "ArrowUp" || event.code === "ArrowDown") {
    paddle.dy = 0;
  }
});

// Definir la paleta de la computadora
var computerPaddle = {
  x: canvas.width - 10,
  y: canvas.height / 2 - 50,
  width: 10,
  height: 100,
  speed: 5
};

// Iniciar el juego
game();