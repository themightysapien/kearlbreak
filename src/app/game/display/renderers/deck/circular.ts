import { Deck } from '../../../entities/deck';
import { Card } from '../../../entities/card';
import { CardRenderer } from '../../card-renderer';
import { DeckRendererContract } from '../../contract/deck-render-contract';
export class CircularDeckRenderer implements DeckRendererContract {
    private $deck: Deck;

    constructor() {

    }

    initDeck(deck: Deck) {
        this.$deck = deck;
        return this;
    }


    render(scene) {
        const circleRadius = 205;
        const spacing = 30;
        const origin = [300, 300];

        // const graphics = scene.add.graphics(0, 0);
        // // graphics.lineStyle(2, 0xffd900, 1);
        // graphics.beginFill(0xFF0000, 1);
        // graphics.drawCircle(origin[0], origin[1], 5);

        this.$deck.getCards().forEach((card: Card, position) => {
            const cardRenderer = CardRenderer.ForCard(card, position);
            if (cardRenderer.isReadyToRenderOnHand()) {
                cardRenderer.x = 20 + origin[0] - circleRadius + (spacing * position);
                cardRenderer.y = -Math.sqrt(Math.pow(circleRadius, 2) - Math.pow((cardRenderer.x - origin[0]), 2)) + origin[1];
                cardRenderer.rotateAngle = Math.atan((cardRenderer.y - origin[1]) / (cardRenderer.x - origin[0]));
                cardRenderer.render(scene);
                // graphics.drawCircle(cardRenderer.x, cardRenderer.y, 10);
            }

        });

    }
}
