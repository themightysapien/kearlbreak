const Round = require('./round');
class Game {
    rounds = [];
    currentRound = 0;
    startingPlayOrder = [];
    cards = [];


    constructor(order) {
        this.startingPlayOrder = order;
    }

    startRound() {
        this.currentRound++;
        // for(var i = 0; i<this.startingPlayOrder.length; i++){

        // }

        var startingCards = {};
        startingCards[this.startingPlayOrder[0]] = this.cards.slice(0, 13);
        startingCards[this.startingPlayOrder[1]] = this.cards.slice(13 - 1, 26 - 1);
        startingCards[this.startingPlayOrder[2]] = this.cards.slice(26 - 1, 39 - 1);
        startingCards[this.startingPlayOrder[3]] = this.cards.slice(39 - 1, 52 - 1);
        this.rounds.push(new Round(startingCards));

        console.log(this.rounds);

    }

    setCards(cards) {
        this.cards = cards;
        return this;
    }
}
module.exports = Game;