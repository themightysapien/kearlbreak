import { Card } from "../entities/card";
export class CardRenderer {
    static ForCard(card: Card, position) {
        let cardRenderer = new CardRenderer(card);
        cardRenderer.x = (62 + ((position - 1) * 62));
        cardRenderer.y = (100);
        cardRenderer.frame = (cardRenderer.card.getNumber() - 1);

        return cardRenderer;


    }

    /*static cardCounter = 0;

     getSpriteRow(number) {
     return number / 13;
     }

     renderAtHand(number) {
     let game = GameManager.GAME;
     let card = game.add.sprite(62 + (CardRenderer.cardCounter * 62), 100, 'cards');
     card['frame'] = number;
     CardRenderer.cardCounter++;
     }

     renderAtMiddle(number) {
     }*/
    private card;
    private _x;
    private _y;
    private _frame;
    private _rotateAngle;


    constructor(card: Card) {
        this.card = card;
    }
    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }

    get frame() {
        return this._frame;
    }

    set frame(value) {
        this._frame = value;
    }

    get rotateAngle() {
        return this._rotateAngle;
    }

    set rotateAngle(value) {
        this._rotateAngle = value;
    }



    isReadyToRenderOnHand() {
        return this.card.isOnHand();
    }

    render(scene) {
        //console.log(this.x + ', ' + this.y);

        let card = scene.add.sprite(this.x, this.y, Card.SPRITE, this.frame);
        /* console.log('Angle:'+this.rotateAngle);*/
        if (this.rotateAngle > 0) {
            card.angle = this.rotateAngle;
        }
        return card;
    }
}
