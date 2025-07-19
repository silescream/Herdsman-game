import { Text } from 'pixi.js';

export class ScoreBoard {
  public view: Text;

  constructor(initialScore: number = 0) {
    this.view = new Text({
      text: `Собрано: ${initialScore}`,
      style: {
          fontFamily: 'Arial',
          fontSize: 24,
          fill: 0xff1010,
          align: 'center',
      }
    });
    this.view.x = 32;
    this.view.y = 24;
  }

  public setScore(score: number) {
    this.view.text = `Собрано: ${score}`;
  }
}
