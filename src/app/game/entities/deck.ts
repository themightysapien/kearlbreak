import { Card } from './card';
export class Deck {
    private cards: Card[] = [];

    static Deal(numbers: number[]) {
        const nos = numbers.sort((a, b) => {
            return a - b;
        });
        const deck = new Deck();
        for (let i = 0; i < nos.length; i++) {
            deck.add(nos[i]);
        }
        return deck;
    }

    add(n) {
        this.cards.push(new Card(n));
    }

    getCards() {
        return this.cards;
    }

}
