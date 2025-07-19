import { Graphics } from 'pixi.js';

export class Yard {
  public view: Graphics;
  public x: number;
  public y: number;
  public radius: number;

  constructor(x: number, y: number, radius: number = 60) {
    this.x = x;
    this.y = y;
    this.radius = radius;

    this.view = new Graphics();
    this.view.fill(0xffff33)
      .circle(0, 0, radius)
      .fill();
    this.view.x = x;
    this.view.y = y;
  }

  public contains(px: number, py: number): boolean {
    const dx = px - this.x;
    const dy = py - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    return dist < this.radius;
  }
}
