export class Card {
    static STATUS_ON_HAND = 1;
    static STATUS_PLAYED = 0;

    static SPRITE = 'cards';

    private $number;
    private $status;
    private $weight;
    private $groupWeight;


    constructor(n) {
        this.$number = n;
        this.$status = Card.STATUS_ON_HAND;
        this.$weight = this.calculateCardWeight();
        this.$groupWeight = this.calculateGroupWeight();
    }

    private calculateCardWeight() {
        const tempWeight = this.$number % 13;
        if (tempWeight === 1) {
            return 100;
        }

        return tempWeight;
    }

    private calculateGroupWeight() {
        if (this.$number <= 13) {
            return 100;
        }

        return 1;
    }

    markedAsPlayed() {
        this.$status = Card.STATUS_PLAYED;
        return this;
    }

    isOnHand() {
        // tslint:disable-next-line: triple-equals
        return this.$status == Card.STATUS_ON_HAND;
    }

    getNumber() {
        return this.$number;
    }

    /*renderAtHand() {
        if (!this.isOnHand()) {
            return;
        }
        console.log(this.$number);
        this.getRenderer().renderAtHand(this.$number);
    }*/


}
