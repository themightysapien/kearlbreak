import { Injectable } from '@angular/core';
import * as Phaser from 'phaser';
import { NetworkService } from './services/network/network.service';
import { PlayerServerListener } from './services/listeners/player.server.listener';
import { PlayersService } from './services/players.service';
import { PlaySceneService } from './scenes/play-scene.service';
import { HomeSceneService } from './scenes/home-scene.service';
import { RoomServerListener } from './services/listeners/room.server.listener';
import { ActionMediator } from './services/actions/action.mediator';


export interface Round {
  bet: object;
  score: object;
  startingCards: {
    [key: string]: number[]
  };
}
export interface GameData {
  cards: number[];
  currentRound: number;
  rounds: Round[];
  startingPlayOrder: string[];
}
@Injectable({
  providedIn: 'root'
})
export class GameService {

  private gameConfig: Phaser.Types.Core.GameConfig = {
    title: 'Sample',

    type: Phaser.AUTO,

    scale: {
      width: window.innerWidth,
      height: window.innerHeight,
    },

    physics: {
      default: 'arcade',
      arcade: {
        debug: true,
      },
    },

    parent: 'game',
    backgroundColor: '#000000',
  };

  private gameData: GameData = null;

  private game: Phaser.Game;
  constructor(
    public playerRepo: PlayersService,
    public networkService: NetworkService,
    private playScene: PlaySceneService,
    private homeScene: HomeSceneService,
    private action: ActionMediator
  ) { }

  config() {
    return this.gameConfig;
  }

  startGame() {
    this.game = new Phaser.Game(this.gameConfig);
    this.game.scene.add('Home', this.homeScene);
    this.game.scene.add('Play', this.playScene);
    this.game.scene.start('Home');
    this.init();
    return this.game;
  }

  gameInstance() {
    return this.game;
  }

  gofull() {

    if (this.game.scale.isFullscreen) {
      this.game.scale.stopFullscreen();
    }
    else {
      this.game.scale.startFullscreen();
    }

  }

  private init() {

    this.initListener();


  }

  public play(gameData) {
    this.gameData = gameData;
    this.playerRepo.distributeCards(this.gameData.rounds[this.gameData.currentRound - 1]);
    this.game.scene.start('Play');
  }

  public pause() {
    this.game.scene.pause('Play');
  }

  private initListener() {
    const listeners = [
      new RoomServerListener(this.playerRepo, this.action),
      new PlayerServerListener(this.playerRepo, this.action),
    ];

    listeners.forEach(l => {
      l.listen(this.networkService);
    });
  }
}
