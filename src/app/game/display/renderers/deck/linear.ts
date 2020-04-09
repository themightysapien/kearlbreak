import { Deck } from '../../../entities/deck';
import { Card } from '../../../entities/card';
import { CardRenderer } from '../../card-renderer';
import { DeckRendererContract } from '../../contract/deck-render-contract';
export class LinearDeckRenderer implements DeckRendererContract {
    private $deck;
    spacingX = 30;
    positionY = 550;
    positionX = 200;

    constructor() {

    }

    initDeck(deck: Deck) {
        this.$deck = deck;
        return this;
    }

    render(scene) {
        const spacingX = this.spacingX;
        const spacingY = this.positionY;


        this.$deck.getCards().forEach((card: Card, position) => {
            const cardRenderer = CardRenderer.ForCard(card, position);
            if (cardRenderer.isReadyToRenderOnHand()) {
                cardRenderer.y = spacingY;
                cardRenderer.x = this.positionX + spacingX + (spacingX * position);
                cardRenderer.render(scene);
                // graphics.drawCircle(cardRenderer.x, cardRenderer.y, 10);
            }

        });

    }
}
