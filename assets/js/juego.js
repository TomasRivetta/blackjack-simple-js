const miModulo = (() => {

    'use strict'

    let deck = [];

    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K']

    let puntosJugadores = []


    // Referencias del HTML

    const btnNuevoJuego = document.querySelector('#btnNuevo'),
        btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener')

    const divCartasJugadores = document.querySelectorAll('.divCartas'), puntosHTML = document.querySelectorAll('small')

    //Iniciamos el juego

    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck()

        puntosJugadores = []

        for (let index = 0; index < numJugadores; index++) {
            puntosJugadores.push(0)
        }

        puntosHTML.forEach(elem => elem.innerText = 0)

        divCartasJugadores.forEach(elem => elem.innerHTML = '')

        btnPedir.disabled = false
        btnDetener.disabled = false



    }

    // Esta funcion crea un mazo
    const crearDeck = () => {

        deck = []

        for (let i = 2; i <= 10; i++) {

            for (let tipo of tipos) {

                deck.push(i + tipo)

            }

        }

        for (let tipo of tipos) {

            for (let esp of especiales) {
                deck.push(esp + tipo)
            }

        }

        return _.shuffle(deck)

    }

    // Esta funcion me permite tomar una carta
    const pedirCarta = () => {

        if (deck.length === 0) {
            throw 'No hay cartas en la baraja'
        }

        return deck.pop()

    }

    const valorCarta = (carta) => {

        const valor = carta.substring(0, carta.length - 1);

        //Es un numero ?
        // if (isNaN(valor)) {
        //     console.log("No es un numero");
        //     puntos = (valor === 'A') ? 11 : 10
        // }
        // else {
        //     console.log("Es un numero");
        //     puntos = valor * 1
        // }

        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1
    }
    // Turno 0 = primer jugador y el ultimo turno de la computadora
    const acumularPuntos = (carta, turno) => {


        puntosJugadores[turno] = puntosJugadores[turno] += valorCarta(carta)
        puntosHTML[turno].innerText = puntosJugadores[turno]


        return puntosJugadores[turno]

    }

    const crearCarta = (carta, turno) => {

        //Creamos la carta en el front
        const imgCarta = document.createElement('img')
        imgCarta.src = `assets/cartas/${carta}.png`
        imgCarta.classList.add('carta')

        divCartasJugadores[turno].append(imgCarta)

    }

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores

        setTimeout(() => {

            if (puntosComputadora === puntosMinimos) {
                alert('Empate');
            } else if (puntosMinimos > 21) {
                alert('Gano la computadora');
            } else if (puntosComputadora > 21) {
                alert('Gano el jugador');
            } else {
                console.log('computadora gana');

            }

        }, 12);
    }

    //turno de la computadora
    const turnoComputadora = (puntosMinimos) => {

        let puntosComputadora = 0;

        do {

            const carta = pedirCarta()

            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1)

            crearCarta(carta, puntosJugadores.length - 1)

        } while ((puntosComputadora < puntosMinimos) && puntosMinimos <= 21);

        determinarGanador()
    }

    // Eventos

    btnNuevoJuego.addEventListener('click', () => {

        inicializarJuego()

    })


    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta()

        const puntosJugador = acumularPuntos(carta, 0)

        crearCarta(carta, 0)

        if (puntosJugador > 21) {
            console.warn("Perdiste");
            btnPedir.disabled = true
            btnDetener.disabled = true

            turnoComputadora(puntosJugador)
        }
        else if (puntosJugador === 21) {
            console.warn("21, genial");
            btnPedir.disabled = true
            btnDetener.disabled = true
            turnoComputadora(puntosJugador)
        }

    })

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true
        btnDetener.disabled = true

        turnoComputadora(puntosJugadores[0])
    })

    return {
        nuevoJuego: inicializarJuego
    }

})()
