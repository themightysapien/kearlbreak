import { ListenerContract } from './listener.contract';
import { NetworkService } from '../network/network.service';
import { PlayersService } from '../players.service';
import { Player } from '../../entities/player';
import { ActionMediator } from '../actions/action.mediator';
import { ACTIONS } from '../actions/actions';

export class PlayerServerListener implements ListenerContract {

    constructor(public playerRepo: PlayersService, public action: ActionMediator) {

    }

    listen(networkService: NetworkService) {

        // TODO: listen when player joins and trigger player added from server action.

        networkService.on('clientUser').subscribe(val => {
            //console.log('client player', val);
            const player = Player.FromName(val['name'], val['id']);
            player.setAsActive().setAsClient();
            this.playerRepo.setClientPlayer(player);
            setTimeout(() => {
                this.playerRepo.addPlayer(player);
            }, 1000);
        });

        networkService.on('userJoined').subscribe(val => {
            console.log('user joined', val);
            const player = Player.FromName(val['name'], val['id']);
            this.playerRepo.addPlayer(player);

            this.action.do(ACTIONS.NOTIFY, {
                'message': val['name'] + ' has joined the room.'
            });
        });

        networkService.on('leftRoom').subscribe(val => {
            console.log('leftRoom', val);
            //console.log(val);
            this.playerRepo.removeById(val['player_id']);
            this.action.do(ACTIONS.NOTIFY, {
                'message': val['player']['name'] + ' has left the room.'
            });
        });


        networkService.on('play').subscribe(val => {
            console.log('play', val);
            this.action.do(ACTIONS.START_PLAY, val as object);
        });
        // networkService.mockOn('playerJoined', {
        //     name: 'Bagh',
        //     room: { id: 'randomId', name: 'room name' }
        // }).subscribe(val => {
        //     const player = Player.FromName(val['name']);
        //     player.setAsActive().setAsClient();
        //     this.playerRepo.addPlayer(player);
        // });

        // networkService.mockOn('roomJoined', {
        //     room: { id: 'randomId', name: 'room name' }
        // }).subscribe(val => {
        //     networkService.setCurrentRoom(val['room']);
        // });
    }

}
