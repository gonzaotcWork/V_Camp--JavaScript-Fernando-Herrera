// 2C = Two of Clubs (Treboles)
// 2D = Two of Diamonds (Diamantes)
// 2H = Two of Hearts (Corazones)
// 2S = Two of Spades (Espadas)

let deck;
const tipos = ["C", "D", "H", "S"];
let letras = ["J", "Q", "K", "A"];

let puntosJugador = 0,
    puntosComputadora = 0;

let puntosHTML = document.querySelectorAll("small");

const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");
const btnNuevo = document.querySelector('#btnNuevo');

const divCartasComputadora = document.querySelector("#computadora-cartas");
const divCartasJugador = document.querySelector("#jugador-cartas");

const crearDeck = () => {
    deck = [];
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }
    for (let letra of letras) {
        for (let tipo of tipos) {
            deck.push(letra + tipo);
        }
    }
    deck = _.shuffle(deck);
};

const pedirCarta = () => {
    if (deck.length === 0) {
        throw "No hay cartas en el deck";
    }
    let carta = deck.shift();
    return carta;
};

const valorCarta = carta => {
    const valor = carta.substring(0, carta.length - 1);
    return !isNaN(valor) ? +valor : valor === "A" ? 11 : 10;
};

const turnoComputadora = puntosMinimos => {
    let puntosComputadora = 0;

    do {
        const carta = pedirCarta();

        puntosComputadora = puntosComputadora + valorCarta(carta);

        puntosHTML[1].innerText = puntosComputadora;

        const imgCarta = document.createElement("img");
        imgCarta.src = `../cartas/cartas/${carta}.png`;
        imgCarta.classList.add("carta");
        divCartasComputadora.append(imgCarta);

        // Mientras la computadora tenga menos puntos que el Jugador y el jugador no se haya pasado
    } while ((puntosComputadora < puntosMinimos) && puntosMinimos <= 21);

    setTimeout(() => {
        if (puntosMinimos > 21) {
            alert(`Te pasaste, gana la computadora con ${puntosComputadora}`);
        } else if (puntosComputadora > 21) {
            alert(`GANASTE! con ${puntosMinimos}. La computadora se pasó. `);
        } else if (puntosComputadora === puntosMinimos) {
            alert("Nadie gana");
        } else { // La única posibilidad restante es que puntosComputadora > puntosJugador
            alert(`Gana la computadora con ${puntosComputadora}`);
        }
    }, 1000);
};

// EJECUCIÓN
crearDeck();

// EVENTOS
btnPedir.addEventListener("click", () => {
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);

    puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement("img");
    imgCarta.src = `../cartas/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21) {
        console.warn("Lo siento mucho, perdiste");
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
        console.warn("21, genial!");
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }
});

btnDetener.addEventListener("click", () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
});


const removeAllChildNodes = (parent) => { 
    while (parent.children.length > 0) {
        parent.removeChild(parent.firstChild);
     }
}

btnNuevo.addEventListener('click', () => {
    puntosJugador = 0;
    puntosComputadora = 0;
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    removeAllChildNodes(divCartasJugador);
    removeAllChildNodes(divCartasComputadora);

    btnPedir.disabled = false;
    btnDetener.disabled = false;



 })