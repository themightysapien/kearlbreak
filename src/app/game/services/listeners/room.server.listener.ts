import { ListenerContract } from './listener.contract';
import { NetworkService } from '../network/network.service';
import { PlayersService } from '../players.service';
import { Player } from '../../entities/player';
import { ActionMediator } from '../actions/action.mediator';
import { ACTIONS } from '../actions/actions';

export class RoomServerListener implements ListenerContract {

    constructor(public playerRepo: PlayersService, public action: ActionMediator) {

    }

    listen(networkService: NetworkService) {
        networkService.on('server_error').subscribe(c => {
            this.action.do(ACTIONS.NOTIFY, {
                'message': c['message']
            });
        });

        networkService.on('roomsUpdated').subscribe((val) => {
            // this.action.do(ACTIONS.NOTIFY, {
            //     'message': 'Rooms Updated'
            // });
            networkService.updateRoomsFromServer(val['rooms']);
        });

        networkService.on('roomJoined').subscribe((val) => {
            // console.log('roomJoined', val);
            networkService.setCurrentRoom(val['room']);
            if (val['room']['players'].length > 0) {
                val['room']['players'].forEach((item) => {
                    this.playerRepo.addPlayer(Player.FromName(item['name'], item['id']));
                });
            }
        });

    }

}
