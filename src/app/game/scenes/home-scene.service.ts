import { Injectable } from '@angular/core';
import * as Phaser from 'phaser';




@Injectable({
  providedIn: 'root'
})
export class HomeSceneService extends Phaser.Scene {

  //private square: Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
  private background;

  constructor() {
    const sceneConfig = {
      active: false,
      visible: false,
      key: 'Home',
    };
    super(sceneConfig);
  }

  preload() {
    // this.load.image('sky', 'assets/sky.png');
    // this.load.image('ground', 'assets/platform.png');
    // this.load.image('star', 'assets/star.png');
    // this.load.image('bomb', 'assets/bomb.png');
    // this.load.spritesheet('dude',
    //   'assets/dude.png',
    //   { frameWidth: 32, frameHeight: 48 }
    // );

    this.load.image('background', 'assets/board.png');
    // this.load.spritesheet('card', 'assets/cards2.png',
    //   { frameWidth: 61.5, frameHeight: 81 });
  }

  create() {
    console.log(this.game.canvas.width, this.game.canvas.height);

    this.background = this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2, 'background');
    this.background.setDisplaySize(this.game.canvas.width, this.game.canvas.height);
    // this.square = this.add.rectangle(400, 400, 100, 100, 0xFFFFFF) as any;
    // this.physics.add.existing(this.square);

    //let sprite = this.add.sprite(50, 300, 'card', 1).setOrigin(0, 0);
  }

  update() { }
}
