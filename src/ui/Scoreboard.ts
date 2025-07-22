import { Container, Text } from 'pixi.js';

export class ScoreBoard extends Container {
  private score: number = 0;
  private scoreText: Text;
  private timeText: Text;

  constructor(initialScore: number = 0, initialTime: number = 60) {
    super();

    this.score = initialScore;

    this.scoreText = new Text({
      text: `Gathered: ${this.score}`,
      style: {
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 0xffffa0,
        align: 'center',
      },
    });
    this.scoreText.x = 32;
    this.scoreText.y = 24;
    this.addChild(this.scoreText);

    this.timeText = new Text({
      text: `Time left: ${initialTime}`,
      style: {
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 0xffffa0,
        align: 'center',
      },
    });
    this.timeText.x = 32;
    this.timeText.y = 56;
    this.addChild(this.timeText);
  }

  public setScore(score: number) {
    this.score = score;
    this.scoreText.text = `Gathered: ${this.score}`;
  }

  public getScore() {
    return this.score;
  }

  public setTime(timeLeft: number) {
    this.timeText.text = `Time left: ${timeLeft}`;
  }
}
