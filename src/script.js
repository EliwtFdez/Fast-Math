// Definición de variables
let score = 0;
let lives = 20;
const timeLimit = 20000; // 20 segundos
const operations = ['+', '-', '*'];

// Elementos del DOM
const questionElement   = document.getElementById('question');
const userAnswerElement = document.getElementById('user-answer');
const submitButton      = document.getElementById('submit-answer');
const scoreElement      = document.getElementById('score');
const livesElement      = document.getElementById('lives');

function startGame() {
    askQuestion();
}

function askQuestion() {
    const num1 = Math.floor(Math.random() * 10); // Número aleatorio del 0 al 9
    const num2 = Math.floor(Math.random() * 10); // Número aleatorio del 0 al 9

    const operation = operations[Math.floor(Math.random() * operations.length)]; // Operación aleatoria

    const question = `${num1} ${operation} ${num2}`;
    const answer = eval(question); 

    questionElement.textContent = `${question}`;

    let timeout = setTimeout(() => {
        lives--;
        updateUI();
        askQuestion();
    }, timeLimit); 

    submitButton.onclick = function() {
        clearTimeout(timeout); 
        const userAnswer = parseInt(userAnswerElement.value);
        if (!isNaN(userAnswer)) {
            if (userAnswer === answer) {
                score++;
            } else {
                lives--;
            }
            updateUI();
            askQuestion();
            userAnswerElement.value = '';
        } else {
            alert('Plis, Try Again.');
        }
    }
}

function updateUI() {
    scoreElement.textContent = `Score: ${score}`;
    livesElement.textContent = `Lives: ${lives}`;
    if (lives === 0) {
        endGame();
    }
}

function endGame() {
    alert(`Game Over. Final Score: ${score}`);
    resetGame();
}

function resetGame() {
    score = 0;
    lives = 20;
    updateUI();
    startGame();
}

startGame();
