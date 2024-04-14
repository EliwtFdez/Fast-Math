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
const timerElement      = document.getElementById('Timer');

let currentAnswer; // Esta variable guarda la respuesta correcta actual

function startGame() 
{
    askQuestion();
    
    submitButton.addEventListener('click', function() {
        let userAnswerValue = parseInt(userAnswerElement.value, 10); // Convertir la respuesta del usuario a un número
        checkAnswer(userAnswerValue, currentAnswer);
    });
    
}


let currentInterval; // Esta variable almacena el intervalo actual para que puedas limpiarlo más tarde

function askQuestion() {
    // Primero, limpiamos cualquier intervalo existente antes de empezar uno nuevo
    if (currentInterval) {
        clearInterval(currentInterval);
    }

    const num1 = Math.floor(Math.random() * 50); // Número aleatorio del 0 al 49
    const num2 = Math.floor(Math.random() * 50); // Número aleatorio del 0 al 49
    const operation = operations[Math.floor(Math.random() * operations.length)];
    const question = `${num1} ${operation} ${num2}`;
    const answer = Math.floor(eval(question)); // Evalúa la respuesta y redondea si es necesario

    questionElement.textContent = question;

    const startTime = Date.now();
    let timeLeft = timeLimit;

    currentAnswer = Math.floor(eval(question)); // Asegúrate de que este eval no sea vulnerable a inyección de código
    questionElement.textContent = question;


    currentInterval = setInterval(() => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
        timeLeft = timeLimit - elapsedTime;

        document.getElementById('time-left').textContent = `${(timeLeft / 1000).toFixed(1)}s`;
        document.getElementById('time-bar').style.width = `${(timeLeft / timeLimit) * 100}%`;

        if (timeLeft <= 0) {
            clearInterval(currentInterval);
            document.getElementById('time-bar').style.width = '0%';
            handleIncorrectAnswer();
        }
    }, 100); // Actualización cada 100 ms para una animación suave
}

function handleIncorrectAnswer() {
    lives--;
    updateUI();
    if (lives > 0) {
        askQuestion(); // Solo pregunta de nuevo si el jugador todavía tiene vidas
    }
}



function checkAnswer(userAnswer, correctAnswer) {
    if (!isNaN(userAnswer)) {
        if (userAnswer === correctAnswer) {
            score++;
            alert('Correct!');
        } else {
            handleIncorrectAnswer();
        }
        userAnswerElement.value = '';
        updateUI();
        askQuestion();
    } else {
        alert('Please enter a valid number.');
    }
}

function handleIncorrectAnswer() {
    lives--;
    alert('Incorrect!');
    updateUI();
}

function updateUI() 
{
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
