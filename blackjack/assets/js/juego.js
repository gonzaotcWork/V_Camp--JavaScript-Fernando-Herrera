const miModulo = (() => {
    "use strict";

    let deck = [];
    const tipos = ["C", "D", "H", "S"],
        letras = ["J", "Q", "K", "A"];

    let puntosJugadores = [];

    // REFERENCIAS AL DOM
    const btnPedir = document.querySelector("#btnPedir"),
        btnDetener = document.querySelector("#btnDetener"),
        btnNuevo = document.querySelector("#btnNuevo");

    const divCartasJugadores = document.querySelectorAll(".player__divCartas"),
        puntosHTML = document.querySelectorAll("small");
    
    //REFERENCIAS NUEVAS
    const fichas = document.querySelector('#fichas');
    const mensaje = document.querySelector('.message');

    // FUNCIONES
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0); // re-creo el arreglo de puntaje.
            puntosHTML[i].innerText = 0; // reinicio los puntajes en pantalla.
            removeAllChildNodes(divCartasJugadores[i]); // elimino las cartas. 
        }

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    };

    const removeAllChildNodes = parent => {
        while (parent.children.length > 0) {
            parent.removeChild(parent.firstChild);
        }
    };

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
        return _.shuffle(deck);
    };

    const pedirCarta = () => {
        if (deck.length === 0) {
            throw "No hay cartas en el deck";
        }
        return deck.shift();
    };

    const valorCarta = carta => {
        const valor = carta.substring(0, carta.length - 1);
        return !isNaN(valor) ? +valor : valor === "A" ? 11 : 10;
    };

    // Variable de puntos: puntosJugadores -> ARRAY
    // Turno: 0 = primer jugador, último la computadora
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno]; // retorno los puntos acumulados
    };

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement("img");
        imgCarta.src = `../images/cartas/${carta}.png`;
        imgCarta.classList.add("carta");
        divCartasJugadores[turno].append(imgCarta);
    };

    const determinarGanador = () => {
        const [puntosMinimos, puntosComputadora] = puntosJugadores;
        setTimeout(() => {
            if (puntosMinimos > 21) {
                alert(`Te pasaste, gana la computadora con ${puntosComputadora}`);
            } else if (puntosComputadora > 21) {
                alert(`GANASTE! con ${puntosMinimos}. La computadora se pasó. `);
            } else if (puntosComputadora === puntosMinimos) {
                alert("Nadie gana");
            } else {
                // La única posibilidad restante es que puntosComputadora > puntosJugador
                alert(`Gana la computadora con ${puntosComputadora}`);
            }
        }, 1000);
    };

    const turnoComputadora = puntosMinimos => {
        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);

            // Mientras la computadora tenga menos puntos que el Jugador y el jugador no se haya pasado
        } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);
        determinarGanador();
    };

    // EVENTOS
    btnPedir.addEventListener("click", () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0); // Aca no me parece bien usar const
        crearCarta(carta, 0);

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
        turnoComputadora(puntosJugadores[0]);
    });

    btnNuevo.addEventListener("click", () => {
        inicializarJuego();
    });

    return {
        nuevoJuego: inicializarJuego // Hago pública la función.
    };

})();
