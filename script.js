let intentos = 6;
let diccionario = ['APPLE', 'HURLS', 'WINGS', 'YOUTH'];
let palabra = '';

window.addEventListener('load', init);

function init() {
    console.log('Esto se ejecuta solo cuando se carga la página web');
    obtenerPalabraAleatoria();
}

const button = document.getElementById("guess-button");
button.addEventListener("click", intentar);

function obtenerPalabraAleatoria() {
    fetch('https://random-word-api.herokuapp.com/word')
        .then(response => response.json())
        .then(data => {
            palabra = data[0].toUpperCase();
            console.log('Palabra aleatoria:', palabra);
        })
        .catch(error => {
            console.error('Error al obtener la palabra aleatoria:', error);
        });
}

function intentar() {
    if (intentos > 0) {
        const GRID = document.getElementById("grid");
        const ROW = document.createElement('div');
        ROW.className = 'row';

        const INTENTO = leerIntento(); // Obtener el intento del usuario
        for (let i = 0; i < palabra.length; i++) {
            const SPAN = document.createElement('span');
            SPAN.className = 'letter';
            if (INTENTO[i] === palabra[i]) { // VERDE
                SPAN.innerHTML = INTENTO[i];
                SPAN.style.backgroundColor = '#79b851';
            } else if (palabra.includes(INTENTO[i])) { // AMARILLO
                SPAN.innerHTML = INTENTO[i];
                SPAN.style.backgroundColor = '#f3c237';
            } else { // GRIS
                SPAN.innerHTML = INTENTO[i];
                SPAN.style.backgroundColor = '#a4aec4';
            }
            ROW.appendChild(SPAN);
        }
        GRID.appendChild(ROW);

        const valor = document.getElementById("guess-input").value.toUpperCase();
        if (valor === palabra) {
            terminar("¡Adivinaste la palabra!");
        } else {
            intentos--;
            document.getElementById('remaining-guesses').textContent = `Intentos restantes: ${intentos}`;
            if (intentos === 0) {
                terminar(`¡Se acabaron los intentos! La palabra era "${palabra}".`);
            }
        }
    }
}

function leerIntento() {
    let intento = document.getElementById("guess-input");
    intento = intento.value;
    intento = intento.toUpperCase();
    return intento;
}

function terminar(mensaje) {
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    button.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}

document.getElementById('remaining-guesses').textContent = `Intentos restantes: ${intentos}`;
