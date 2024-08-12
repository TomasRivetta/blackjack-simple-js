/*
    2C = Two of Clubs (Treboles)
    2D = Two of Diaminds (Diamantes)
    2H = Two of hearts (Corazones)
    2S = Two of Spades (Espadas)

*/

let deck = [];

const tipos = ['C', 'D', 'H', 'S']

const especiales = ['A', 'J', 'Q', 'K']

let puntosJugador = 0, puntosComputadora = 0


// Referencias del HTML

const btnNuevoJuego = document.querySelector('#btnNuevo')

const btnPedir = document.querySelector('#btnPedir')

const btnDetener = document.querySelector('#btnDetener')

const divCartasJugador = document.querySelector('#jugador-cartas')

const divCartasComputadora = document.querySelector('#computadora-cartas')

const puntosHTML = document.querySelectorAll('small')


// Esta funcion crea un mazo
const crearDeck = () => {

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

    deck = _.shuffle(deck)

    return deck

}

// Esta funcion me permite tomar una carta
const pedirCarta = () => {

    if (deck.length === 0) {
        throw 'No hay cartas en la baraja'
    }

    let carta = deck.pop()

    return carta

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

//turno de la computadora
const turnoComputadora = (puntosMinimos) => {

    do {

        const carta = pedirCarta()

        puntosComputadora += valorCarta(carta)

        puntosHTML[1].innerText = puntosComputadora

        //Creamos la carta en el front
        const imgCarta = document.createElement('img')
        imgCarta.src = `assets/cartas/${carta}.png`
        imgCarta.classList.add('carta')

        divCartasComputadora.append(imgCarta)

        if (puntosMinimos > 21) {
            break
        }

    } while ((puntosComputadora < puntosMinimos) && puntosMinimos <= 21);


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

// Eventos

btnNuevoJuego.addEventListener('click', () => {

    deck = [];
    deck = crearDeck()

    puntosJugador = 0
    puntosComputadora = 0
    puntosHTML[0].innerText = 0
    puntosHTML[1].innerText = 0

    divCartasJugador.innerHTML = ''
    divCartasComputadora.innerHTML = ''


})


btnPedir.addEventListener('click', () => {

    const carta = pedirCarta()

    puntosJugador += valorCarta(carta)

    puntosHTML[0].innerText = puntosJugador

    //Creamos la carta en el front
    const imgCarta = document.createElement('img')
    imgCarta.src = `assets/cartas/${carta}.png`
    imgCarta.classList.add('carta')


    //Añadimos la carta a la mano el jugador
    divCartasJugador.append(imgCarta)

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

    turnoComputadora(puntosJugador)
})


crearDeck()