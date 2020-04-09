import { Player } from '../entities/player';
import { Injectable } from '@angular/core';
import { ActionMediator } from './actions/action.mediator';
import { ACTIONS } from './actions/actions';
import { BehaviorSubject } from 'rxjs';
import { Round } from '../game.service';
import { Deck } from '../entities/deck';

@Injectable({
    providedIn: 'root'
})
export class PlayersService {
    private clientPlayer: Player;
    private playersPool: BehaviorSubject<Player[]> = new BehaviorSubject<Player[]>([]);
    public players$ = this.playersPool.asObservable();


    constructor(private action: ActionMediator) {
        // this.mockPlayers();
    }

    setClientPlayer(player: Player) {
        this.clientPlayer = player;
    }

    addPlayer(p: Player) {
        console.log(p);
        const currentPlayers = this.getPlayers();
        const oldIndex = currentPlayers.findIndex(item => item.id == p.id);
        if (oldIndex != -1) {
            currentPlayers[oldIndex] = p;
        } else {
            currentPlayers.push(p);
        }

        this.playersPool.next(currentPlayers);
        this.action.do(ACTIONS.PLAYER_ADDED, {
            player: p
        });
        // this.ev.publish('newUser', {player: player});

    }

    getPlayers() {
        return this.playersPool.getValue();
    }

    emptyPool() {
        return this.playersPool.next([]);
    }

    updatePool(players: Player[]) {
        this.playersPool.next(players);
    }


    public removeById(id) {
        const players = this.playersPool.getValue().filter(item => item.id != id);
        this.updatePool(players);

    }

    getClientPlayer() {
        return this.clientPlayer;
    }

    getActivePlayer() {
        return this.getPlayers().filter((player: Player) => {
            return player.isActive();
        });
    }

    isClientActive() {
        return this.getActivePlayer().length > 0 && this.getActivePlayer()[0].name == this.getClientPlayer().name;
    }


    mockPlayers() {
        const names = ['ralf', 'kim', 'leona'];
        names.forEach((name) => {
            setTimeout(() => {
                this.addPlayer(Player.FromName(name));
            }, 1000);
        });

        // setTimeout(() => {
        //     this.clientPlayer = Player.FromName("bagh");
        //     this.clientPlayer.setAsActive().setAsClient();
        //     this.addPlayer(this.clientPlayer);
        // }, 2000);


    }

    distributeCards(round: Round) {
        const players = this.playersPool.getValue();
        players.forEach((player: Player) => {
            player.give(Deck.Deal(round.startingCards[player.id]));
        });
        this.updatePool(players);

        console.log(players);
    }


}
