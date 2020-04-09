"use strict";
const helpers = require('../helper');
const Player = require('./player');
class Room {
    id;
    name;
    players;
    _game;

    getId() {
        return this.id;
    }

    setId(value) {
        this.id = value;
    }

    getName() {
        return this.name;
    }

    setName(value) {
        this.name = value;
    }

    getPlayers() {
        return this.players;
    }

    addPlayer(value) {
        this.players.push(value);
    }

    constructor(name) {
        this.setId(helpers.randomId());
        this.setName(name);
        this.players = [
            new Player(helpers.randomId(), 'Sher Khan'),
            new Player(helpers.randomId(), 'Bagali Khan Thane'),
            new Player(helpers.randomId(), 'Ramteil'),
        ];
    }

    game(){
        return this._game;
    }
    startGame(game){
        this._game = game;
        return this;
    }


};


module.exports = Room;