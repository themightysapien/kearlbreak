import { Deck } from '../deck';
export interface CanHoldDeck {
    deck: Deck;

    give(deck: Deck);
}
