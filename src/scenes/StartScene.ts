import { Container, Graphics, Text } from 'pixi.js';

import type { IScene } from '../utils/SceneManager';
import { eventBus } from '../utils/EventBus';

export class StartScene extends Container implements IScene {
  constructor() {
    super();
    const background = new Graphics()
      .fill({ color: 0x111133, alpha: 0.8 })
      .roundRect(0, 0, 400, 250, 30)
      .fill();
    this.addChild(background);

    const title = new Text({
      text: 'Herdsman',
      style : { fontSize: 36, fill: 0xffffff },
    });
    title.x = 200 - title.width / 2;
    title.y = 50;
    this.addChild(title);

    const description = new Text({
      text: 'You have 60 sec, gather as many as possible!!',
      style: { fontSize: 18, fill: 0xffffff },
    });
    description.x = 200 - description.width / 2;
    description.y = 120;
    this.addChild(description);

    const startButton = new Graphics()
      .fill(0x44ff44)
      .roundRect(120, 180, 160, 44, 16)
      .fill();
    startButton.eventMode = 'static';
    startButton.cursor = 'pointer';
    this.addChild(startButton);
    
    const buttonText = new Text({
      text: 'Start',
      style: { fontSize: 24, fill: 0x222233 },
    });
    buttonText.x = 200 - buttonText.width / 2;
    buttonText.y = 192;
    this.addChild(buttonText);

    startButton.on('pointerdown', () => {
      eventBus.emit('gameStart');
    })
  }
}