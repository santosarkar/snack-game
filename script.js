const gameArea = document.getElementById('gameArea');
const scoreText = document.getElementById('score');
const restartBtn = document.getElementById('restart');

const gridSize = 20;
const gameSize = 400;

let snake = [{ x: 60, y: 60 }];
let food = { x: 0, y: 0 };
let direction = { x: 0, y: 0 };
let score = 0;
let speed = 200; // Speed of the snake (lower means faster)
let gameInterval;

// Initialize game
function initializeGame() {
    document.addEventListener('keydown', changeDirection);
    restartBtn.addEventListener('click', restartGame);
    spawnFood();
    gameInterval = setInterval(updateGame, speed);
}

// Create Snake Segment
function createSnakeSegment(x, y) {
    const snakeSegment = document.createElement('div');
    snakeSegment.style.left = `${x}px`;
    snakeSegment.style.top = `${y}px`;
    snakeSegment.classList.add('snake');
    gameArea.appendChild(snakeSegment);
}

// Create Food
function createFood(x, y) {
    const foodElement = document.createElement('div');
    foodElement.style.left = `${x}px`;
    foodElement.style.top = `${y}px`;
    foodElement.classList.add('food');
    gameArea.appendChild(foodElement);
}

// Update Snake
function updateGame() {
    moveSnake();
    checkCollision();
}

// Move Snake
function moveSnake() {
    const head = { x: snake[0].x + direction.x * gridSize, y: snake[0].y + direction.y * gridSize };
    snake.unshift(head);

    // Remove the last segment of the snake unless it just ate food
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreText.textContent = `Score: ${score}`;
        spawnFood();
    } else {
        snake.pop();
    }

    renderSnake();
}

// Render Snake
function renderSnake() {
    gameArea.innerHTML = ''; // Clear previous snake
    snake.forEach(segment => createSnakeSegment(segment.x, segment.y));
    createFood(food.x, food.y);
}

// Change Direction based on keyboard input
function changeDirection(event) {
    const key = event.keyCode;
    if (key === 37 && direction.x !== 1) { // Left arrow
        direction = { x: -1, y: 0 };
    } else if (key === 38 && direction.y !== 1) { // Up arrow
        direction = { x: 0, y: -1 };
    } else if (key === 39 && direction.x !== -1) { // Right arrow
        direction = { x: 1, y: 0 };
    } else if (key === 40 && direction.y !== -1) { // Down arrow
        direction = { x: 0, y: 1 };
    }
}

// Check if snake hits wall or itself
function checkCollision() {
    const head = snake[0];

    // Wall collision
    if (head.x < 0 || head.x >= gameSize || head.y < 0 || head.y >= gameSize) {
        gameOver();
    }

    // Self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
        }
    }
}

// Spawn food at a random position
function spawnFood() {
    food.x = Math.floor(Math.random() * (gameSize / gridSize)) * gridSize;
    food.y = Math.floor(Math.random() * (gameSize / gridSize)) * gridSize;
}

// Game over
function gameOver() {
    clearInterval(gameInterval);
    alert(`Game Over! Your score: ${score}`);
}

// Restart the game
function restartGame() {
    clearInterval(gameInterval);
    snake = [{ x: 60, y: 60 }];
    direction = { x: 0, y: 0 };
    score = 0;
    scoreText.textContent = `Score: 0`;
    gameInterval = setInterval(updateGame, speed);
    spawnFood();
    renderSnake();
}

// Start the game
initializeGame();
