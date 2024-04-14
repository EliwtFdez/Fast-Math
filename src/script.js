
document.addEventListener('DOMContentLoaded', function() {

    const startButton       = document.getElementById('start-game');
    const howToPlayButton   = document.getElementById('how-to-play');
    const difficultyButton  = document.getElementById('difficulty');
   
//Funciona El boton de Juego Principal
    startButton.addEventListener('click', function() {
          window.location.href = 'GamePrincipal.html'; // Cambia '/path/to/' a la ubicación correcta del archivo en tu servidor o proyecto
    });

// Instrucciones de como jugar
    howToPlayButton.addEventListener('click', function() {
        alert("You'll be presented with a random math question. " +
              "Enter the correct answer and press 'Submit Answer' button. " +
              "You have limited time for each question and limited lives. " +
              "Try to score as high as you can!");
    });

//Tipo de dificultad y selecionar dificultad dentro de otra pag
    difficultyButton.addEventListener('click', function() {
        window.location.href = 'Difficulty.html'; // Cambia '/path/to/' a la ubicación correcta del archivo en tu servidor o proyecto
    });
    
});


