import { Component, OnInit } from '@angular/core';
import { HomeSceneService } from '../game/scenes/home-scene.service';
import { GameService } from '../game/game.service';
import { PlaySceneService } from '../game/scenes/play-scene.service';
import { PlayersService } from '../game/services/players.service';
import { ActionMediator } from '../game/services/actions/action.mediator';
import { ACTIONS } from '../game/services/actions/actions';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  game: Phaser.Game;



  constructor(
    private gameService: GameService,
    private action: ActionMediator
  ) {

  }

  ngOnInit() {
    this.game = this.gameService.startGame();
    //this.gameService.playerRepo.mockPlayers();

    // this.action.on(ACTIONS.PLAYER_ADDED).subscribe((v) => {
    //   console.log(v);
    // });

    // Put here the code you want to execute
  }

  

}
