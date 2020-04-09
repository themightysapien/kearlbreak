"use strict";
class Player {

    getName() {
        return this.name;
    }

    setName(value) {
        this.name = value;
    }

    getDeck() {
        return this.deck;
    }

    setDeck(value) {
        this.deck = value;
    }

    getScores() {
        return this.scores;
    }

    setScores(value) {
        this.scores = value;
    }

    getId() {
        return this.id;
    }

    setId(value) {
        this.id = value;
    }

    constructor(id, name){
        this.setId(id);
        this.setName(name);
    }


};


module.exports = Player;