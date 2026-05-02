let totalAcumulado = 0;
let pantalla = "0";
let ultimoOperador = null;

const display = document.querySelector('.screen');

function clicBoton(valor) {
    if (isNaN(parseInt(valor))) {
        manejarSimbolo(valor);
    } else {
        manejarNumero(valor);
    }
    display.innerText = pantalla;
}

function manejarSimbolo(simbolo) {
    switch (simbolo) {
        case 'C':
            pantalla = '0';
            totalAcumulado = 0;
            ultimoOperador = null;
            break;
        case '=':
            if (ultimoOperador === null) return;
            realizarOperacion(parseInt(pantalla));
            ultimoOperador = null;
            pantalla = "" + totalAcumulado;
            totalAcumulado = 0;
            break;
        case '←':
            if (pantalla.length === 1) {
                pantalla = '0';
            } else {
                pantalla = pantalla.substring(0, pantalla.length - 1);
            }
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            manejarMatematica(simbolo);
            break;
    }
}

function manejarMatematica(simbolo) {
    if (pantalla === '0') return;

    const valorPantalla = parseInt(pantalla);

    if (totalAcumulado === 0) {
        totalAcumulado = valorPantalla;
    } else {
        realizarOperacion(valorPantalla);
    }
    ultimoOperador = simbolo;
    pantalla = '0';
}

function realizarOperacion(valorPantalla) {
    if (ultimoOperador === '+') {
        totalAcumulado += valorPantalla;
    } else if (ultimoOperador === '−') {
        totalAcumulado -= valorPantalla;
    } else if (ultimoOperador === '×') {
        totalAcumulado *= valorPantalla;
    } else if (ultimoOperador === '÷') {
        totalAcumulado /= valorPantalla;
    }
}

function manejarNumero(cadenaNumero) {
    if (pantalla === "0") {
        pantalla = cadenaNumero;
    } else {
        pantalla += cadenaNumero;
    }
}

function iniciar() {
    document.querySelector('.calc-buttons')
        .addEventListener('click', function(event) {
            if (event.target.tagName === 'BUTTON') {
                clicBoton(event.target.innerText.trim());
            }
        });
}

iniciar();