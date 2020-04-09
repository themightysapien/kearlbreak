import { Injectable } from '@angular/core';
import * as Phaser from 'phaser';
import { PlayersService } from '../services/players.service';
import { ActionMediator } from '../services/actions/action.mediator';
import { Player } from '../entities/player';
import { LinearDeckRenderer } from '../display/renderers/deck/linear';
import { Card } from '../entities/card';
import { CircularDeckRenderer } from '../display/renderers/deck/circular';
import { LinearDeckRendererFactory, DeckRendererContract } from '../display/contract/deck-render-contract';



const sceneConfig = {
  active: false,
  visible: false,
  key: 'Play',
};
@Injectable({
  providedIn: 'root'
})
export class PlaySceneService extends Phaser.Scene {

  sprite;
  players: Player[];
  playersDeckRenderer: {
    [key: string]: DeckRendererContract
  } = {};

  constructor(
    private playerRepo: PlayersService,
    private action: ActionMediator) {
    super(sceneConfig);
    this.playerRepo.players$.subscribe(players => this.players = players);


  }



  preload() {
    //console.log(this.game.context.canvas.height);
    // this.load.spritesheet(Card.SPRITE, 'assets/cards2.png',
    //   { frameWidth: 61.5, frameHeight: 81 });

    this.load.spritesheet(Card.SPRITE, 'assets/cards.png',
      { frameWidth: 73.15, frameHeight: 98.5 });
  }

  create() {
    this.players.forEach(player => {
      // if (player.isClient()) {
      //   this.playersDeckRenderer[player.id] = new CircularDeckRenderer(player.deck);
      // } else {
      //   this.playersDeckRenderer[player.id] = new LinearDeckRenderer(player.deck);
      // }
      this.playersDeckRenderer[player.id] = LinearDeckRendererFactory(
        (this.game.context.canvas.width / 2) - ((61.5 - 30) * 7),
        this.game.context.canvas.height - 80);
    });
    // this.sprite = this.add.sprite(50, 300, 'card', 1).setOrigin(0, 0);
  }

  update() {
    this.players.forEach(player => {
      if (player.isClient()) {
        this.playersDeckRenderer[player.id].initDeck(player.deck).render(this);
      }
    });
  }
}
