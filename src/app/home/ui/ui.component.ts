import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { GameService } from '../../game/game.service';
import { Player } from '../../game/entities/player';
import { Room } from '../../game/services/network/network.service';
import { ToastController } from '@ionic/angular';
import { ActionMediator } from '../../game/services/actions/action.mediator';
import { ACTIONS } from '../../game/services/actions/actions';

@Component({
  selector: 'game-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiComponent implements OnInit {

  playerJoined = false;
  players: Player[] = [];

  rooms: Room[] = [];
  currentRoom: Room;

  name = 'BAGH RAJA';

  constructor(
    private gameService: GameService,
    private cdRef: ChangeDetectorRef,
    public toastController: ToastController,
    private action: ActionMediator
  ) { }

  ngOnInit() {
    this.gameService.playerRepo.players$.subscribe((players: Player[]) => {
      // console.log(players);
      this.players = players;
      this.cdRef.detectChanges();
    });

    this.gameService.networkService.getOtherRooms().subscribe(rooms => {
      this.rooms = rooms;
      this.currentRoom = this.gameService.networkService.getCurrentRoom();
      this.cdRef.detectChanges();
    });

    this.action.on(ACTIONS.NOTIFY).subscribe(val => {
      this.presentToast(val['message']);
    });

    this.action.on(ACTIONS.START_PLAY).subscribe(val => {
      console.log("STARTING PLAY");
      this.gameService.play(val['game']);
    });


  }

  initPlayerName() {
    const name = prompt('Enter Your Username');
    if (name) {
      this.name = name;
    }

  }

  createRoom() {
    const name = prompt('Your Room Name');

    if (name) {
      this.gameService.networkService.createRoom(name);
    }
  }

  joinRoom(room: Room) {
    this.gameService.networkService.joinRoom(room.id, this.name);
  }

  leaveRoom(room: Room) {
    this.gameService.networkService.leaveRoom(room.id, this.gameService.playerRepo.getClientPlayer().id);
    this.gameService.playerRepo.emptyPool();
  }


  play() {
    this.gameService.networkService.send('play', {});
  }

  shuffle() {
    this.gameService.networkService.send('shuffle', {});
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
