const miModulo = (() => {
    "use strict";

    const tipos = ["C", "D", "H", "S"],
        letras = ["J", "Q", "K", "A"];

    let numJugadores = 2,
        puntosJugadores = [],
        deck = [],
        fichasJugador = 100,
        fichasApuesta;

    // REFERENCIAS AL DOM
    const btnPedir = document.querySelector("#btnPedir"),
        btnDetener = document.querySelector("#btnDetener"),
        btnNuevo = document.querySelector("#btnNuevo"),
        btnReiniciar = document.querySelector("#btnReiniciar");

    const divCartasJugadores = document.querySelectorAll(".player__divCartas");
    const puntosHTML = document.querySelectorAll("small");

    //REFERENCIAS MIAS
    const fichasOutput = document.querySelector("#fichas");
    const mensajeOutput = document.querySelector(".message");
    const fichasInput = document.querySelector("#fichas__input");
    const fichasApostadasDOM = document.querySelector("#player__apostado__fichas");

    const errorOutput = document.querySelector("#errorOutput");

    // FUNCIONES
    const inicializarJuego = () => {
        fichasApuesta = fichasInput.value;

        // Validaciones
        if (fichasApuesta <= 0) {
            return printError("Las fichas a jugar deben ser un número positivo.");
        }
        if (fichasApuesta > 0 && fichasApuesta > fichasJugador) {
            return printError("No podés jugar más fichas de las que tenés, timbero.");
        }

        btnNuevo.disabled = true;
        btnReiniciar.disabled = true;
        fichasInput.value = null;
        setFichas(fichasJugador - fichasApuesta);
        mostrarApuesta(fichasApuesta);

        deck = crearDeck();
        limpiarJuego();

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    };

    const reiniciarJuego = () => {
        setFichas(100);
        limpiarJuego();
        crearCarta('grey_back', 0);
        crearCarta('grey_back', 0);
        crearCarta('red_back', puntosJugadores.length - 1);
        crearCarta('red_back', puntosJugadores.length - 1);
    };

    const limpiarJuego = () => {
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0); // re-creo el arreglo de puntaje.
            puntosHTML[i].innerText = 0; // reinicio los puntajes en pantalla.
            removeAllChildNodes(divCartasJugadores[i]); // elimino las cartas.
        }
        printMensaje("");
    };

    const removeAllChildNodes = parent => {
        while (parent.children.length > 0) {
            parent.removeChild(parent.firstChild);
        }
    };

    const printError = error => {
        errorOutput.innerText = error;
        setTimeout(() => {
            errorOutput.innerText = "";
        }, 1500);
    };

    const printMensaje = mensaje => {
        mensajeOutput.innerHTML = mensaje;
    };

    const setFichas = cantidad => {
        fichasJugador = cantidad;
        fichasOutput.innerText = cantidad;
    };

    const mostrarApuesta = apuesta => {
        fichasApostadasDOM.innerText = apuesta;
        fichasApostadasDOM.parentElement.classList.remove("hide");
    };
    const esconderApuesta = () => {
        fichasApostadasDOM.parentElement.classList.add("hide");
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
                printMensaje("Perdiste, te pasaste.");
                // No recupera nada.
            } else if (puntosComputadora > 21) {
                if (puntosMinimos === 21) {
                    // Gana x5;
                    setFichas(fichasJugador + fichasApuesta * 5);
                    printMensaje(
                        `<span class="black">¡</span><span class="yellow">Black Jack ${puntosMinimos}</span><span class="black">!</span>, ganaste x5 `
                    );
                } else {
                    //Gana x2
                    setFichas(fichasJugador + fichasApuesta * 2);
                    printMensaje(`Ganaste!, el casino se pasó.`);
                }
            } else if (puntosComputadora === puntosMinimos) {
                // Recupera lo apostado.
                setFichas(fichasJugador + fichasApuesta * 1);
                printMensaje("Empate, recuperas la apuesta.");
            } else {
                // La única posibilidad restante es que puntosComputadora > puntosJugador
                // No recupera nada.
                printMensaje(`Gano el casino.`);
            }
            esconderApuesta();
            btnNuevo.disabled = false;
            btnReiniciar.disabled = false;
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
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            // Desactivo los botones si pierde,
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            // Desactivo los botones si saca 21.
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    btnDetener.addEventListener("click", () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        // Desactivo los botones si detiene.
        turnoComputadora(puntosJugadores[0]);
    });

    btnNuevo.addEventListener("click", () => {
        inicializarJuego();
    });

    btnReiniciar.addEventListener("click", () => {
        reiniciarJuego();
    });

    return {
        nuevoJuego: inicializarJuego, // Hago pública la función.
    };
})();
