import { Subject } from 'rxjs';
import { Player } from '../../entities/player';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class PlayerActions {
    private shuffleAction: Subject<Player> = new Subject<Player>();

    public suffle(player: Player) {
        this.shuffleAction.next(player);
    }

    public whenShuffled() {
        return this.shuffleAction.asObservable();
    }
}