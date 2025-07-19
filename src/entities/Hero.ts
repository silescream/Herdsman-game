import { Graphics } from 'pixi.js';

export class Hero {
  public view: Graphics;
  private speed: number = 4;
  private targetX: number;
  private targetY: number;

  constructor(x: number, y: number) {
    this.view = new Graphics();
    this.view.fill(0xff3333)
      .circle(0, 0, 20)
      .fill();
    this.view.x = x;
    this.view.y = y;
    this.targetX = x;
    this.targetY = y;
  }

  moveTo(x: number, y: number) {
    this.targetX = x;
    this.targetY = y;
  }

  update(deltaTime: number) {
    const diffX = this.targetX - this.view.x;
    const diffY = this.targetY - this.view.y;
    const distance = Math.sqrt(diffX * diffX + diffY * diffY);
    if (distance > 1) {
      const moveX = (diffX / distance) * this.speed * deltaTime;
      const moveY = (diffY / distance) * this.speed * deltaTime;
      this.view.x += moveX;
      this.view.y += moveY;
    }
  }
}