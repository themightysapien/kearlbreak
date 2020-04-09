export class DeckOld {
    cards: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
        27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52];

    players: number = 4;
    private drawnCards: number[][] = [];

    setPlayers(no) {
        this.players = no;
        return this;
    }


    shuffle() {
        console.log("Going To Shuffle");
        let currentIndex = this.cards.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = this.cards[currentIndex];
            this.cards[currentIndex] = this.cards[randomIndex];
            this.cards[randomIndex] = temporaryValue;

        }

        return this;
    }

    draw() {
        let perPlayer = this.cards.length / this.players;
        for (let i = 0; i < this.players; i++) {
            let playerCards = [];
            for (let j = perPlayer * i; j < perPlayer * (i + 1); j++) {
                playerCards.push(this.cards[j]);
            }

            this.drawnCards.push(playerCards);
        }
        return this;
    }

    fetch() {
        return this.drawnCards.pop();
    }

}