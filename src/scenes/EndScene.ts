import { Container, Graphics, Text } from 'pixi.js';

import type { IScene } from '../utils/SceneManager';
import { eventBus } from '../utils/EventBus';

export class EndScene extends Container implements IScene {
  private restartButton: Graphics;

  constructor(finalScore: number, width: number = 800, height: number = 600) {
    super();

    const popup = new Container();
    const background = new Graphics()
      .fill({ color: 0x111133, alpha: 0.85 })
      .roundRect(0, 0, 400, 250, 30)
      .fill();
    popup.addChild(background);

    const title = new Text({
      text: 'Game Finished!',
      style: { fontSize: 36, fill: 0xffffa0, fontWeight: 'bold' },
    });
    title.x = 200 - title.width / 2;
    title.y = 38;
    popup.addChild(title);

    const scoreText = new Text({
      text: `Your Score: ${finalScore}`,
      style: { fontSize: 26, fill: 0xffffff, fontWeight: 'bold' },
    });
    scoreText.x = 200 - scoreText.width / 2;
    scoreText.y = 108;
    popup.addChild(scoreText);

    this.restartButton = new Graphics()
      .fill(0x44ff44)
      .roundRect(120, 180, 160, 44, 16)
      .fill();
    this.restartButton.eventMode = 'static';
    this.restartButton.cursor = 'pointer';
    popup.addChild(this.restartButton);

    const buttonText = new Text({
      text: 'Restart',
      style: { fontSize: 24, fill: 0x222233 },
    });
    buttonText.x = 200 - buttonText.width / 2;
    buttonText.y = 192;
    popup.addChild(buttonText);

    this.restartButton.on('pointerdown', this.onRestart);

    popup.x = (width - 400) / 2;
    popup.y = (height - 250) / 2;
    this.addChild(popup);
  }

  private onRestart = () => {
    eventBus.emit('restartGame');
  };

  public destroyScene(): void {
    this.restartButton.off('pointerdown', this.onRestart);
    super.destroy({ children: true });
  }
}