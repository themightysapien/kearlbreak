import { CanShuffle } from './contracts/can-shuffle';
import { CanHoldDeck } from './contracts/can-hold-deck';
import { Deck } from './deck';
export class Player implements CanShuffle, CanHoldDeck {
    static STATUS_ACTIVE = 1;
    static STATUS_PASSIVE = 0;

    static CLIENT = 1;
    static REMOTE = 2;

    public id;
    public name;
    public status;
    public type = 2;
    deck: Deck;

    static FromName(name, id = '') {
        let player = new Player();
        player.setAsPassive();

        player.setName(name);
        player.id = id;
        return player;
    }

    shuffle() {
    }

    give(deck: Deck) {
        this.deck = deck;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setAsActive() {
        this.status = Player.STATUS_ACTIVE;
        return this;
    }

    setAsPassive() {
        this.status = Player.STATUS_PASSIVE;
        return this;
    }

    setAsClient() {
        this.type = Player.CLIENT;
        return this;
    }

    setAsRemote() {
        this.type = Player.REMOTE;
        return this;
    }

    isActive() {
        return this.status == Player.STATUS_ACTIVE;
    }

    isClient() {
        return this.type == Player.CLIENT;
    }
}
