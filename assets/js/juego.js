/*
    2C = Two of Clubs (Treboles)
    2D = Two of Diaminds (Diamantes)
    2H = Two of hearts (Corazones)
    2S = Two of Spades (Espadas)

*/

let deck = [];

const tipos = ['C', 'D', 'H', 'S']

const especiales = ['A', 'J', 'Q', 'K']

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