import { LinearDeckRenderer } from '../renderers/deck/linear';
import { Deck } from '../../entities/deck';

export interface DeckRendererContract {
    initDeck(deck: Deck);
    render(scene: any);
}

export function LinearDeckRendererFactory(positionX: number, positionY: number) {
    const renderer = new LinearDeckRenderer();
    renderer.positionX = positionX;
    renderer.positionY = positionY;
    return renderer;

}
