let score = 0;
let timer = 60;
let interval;
const character = document.getElementById('character');
const heart = document.getElementById('heart');
const gameArea = document.querySelector('.game-area');
const result = document.getElementById('result');

document.getElementById('startButton').addEventListener('click', startGame);

function startGame() {
    score = 0;
    timer = 60;
    document.getElementById('score').innerText = score;
    document.getElementById('timer').innerText = timer;
    result.innerText = ''; // Clear previous result

    interval = setInterval(updateTimer, 1000);
    moveHeart();
    document.addEventListener('keydown', moveCharacter);
}

function updateTimer() {
    timer--;
    document.getElementById('timer').innerText = timer;

    if (timer <= 0) {
        clearInterval(interval);
        result.innerText = `Game Over! Your score is ${score}.`;
        resetGame();
    }
}

function moveHeart() {
    const x = Math.random() * (gameArea.clientWidth - 50); // Adjust for heart width
    const y = Math.random() * (gameArea.clientHeight - 50); // Adjust for heart height

    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
}

function checkCollision() {
    const characterRect = character.getBoundingClientRect();
    const heartRect = heart.getBoundingClientRect();

    return !(
        characterRect.right < heartRect.left || 
        characterRect.left > heartRect.right || 
        characterRect.bottom < heartRect.top || 
        characterRect.top > heartRect.bottom
    );
}

// Check for collision when character moves
document.addEventListener('keydown', function(event) {
    moveCharacter(event);
    if (checkCollision()) {
        score++;
        document.getElementById('score').innerText = score;
        moveHeart();
    }
});

// Move character with arrow keys
function moveCharacter(event) {
    const step = 10; // Move by 10 pixels
    let characterRect = character.getBoundingClientRect();
    let gameAreaRect = gameArea.getBoundingClientRect();

    switch (event.key) {
        case 'ArrowUp':
            if (characterRect.top > gameAreaRect.top) {
                character.style.top = `${character.offsetTop - step}px`;
            }
            break;
        case 'ArrowDown':
            if (characterRect.bottom < gameAreaRect.bottom) {
                character.style.top = `${character.offsetTop + step}px`;
            }
            break;
        case 'ArrowLeft':
            if (characterRect.left > gameAreaRect.left) {
                character.style.left = `${character.offsetLeft - step}px`;
            }
            break;
        case 'ArrowRight':
            if (characterRect.right < gameAreaRect.right) {
                character.style.left = `${character.offsetLeft + step}px`;
            }
            break;
    }
};

// Button controls for mobile
document.getElementById('upButton').addEventListener('click', () => moveCharacterWithButton('up'));
document.getElementById('downButton').addEventListener('click', () => moveCharacterWithButton('down'));
document.getElementById('leftButton').addEventListener('click', () => moveCharacterWithButton('left'));
document.getElementById('rightButton').addEventListener('click', () => moveCharacterWithButton('right'));

function moveCharacterWithButton(direction) {
    const step = 10; // Move by 10 pixels
    let characterRect = character.getBoundingClientRect();
    let gameAreaRect = gameArea.getBoundingClientRect();

    switch (direction) {
        case 'up':
            if (characterRect.top > gameAreaRect.top) {
                character.style.top = `${character.offsetTop - step}px`;
            }
            break;
        case 'down':
            if (characterRect.bottom < gameAreaRect.bottom) {
                character.style.top = `${character.offsetTop + step}px`;
            }
            break;
        case 'left':
            if (characterRect.left > gameAreaRect.left) {
                character.style.left = `${character.offsetLeft - step}px`;
            }
            break;
        case 'right':
            if (characterRect.right < gameAreaRect.right) {
                character.style.left = `${character.offsetLeft + step}px`;
            }
            break;
    }

    // Check for collision after moving with button
    if (checkCollision()) {
        score++;
        document.getElementById('score').innerText = score;
        moveHeart();
    }
}

function resetGame() {
    document.removeEventListener('keydown', moveCharacter);
    clearInterval(interval);
}
