import { Graphics } from 'pixi.js';

export type AnimalState = 'idle' | 'following' | 'inYard';

export class Animal {
  public view: Graphics;
  public state: AnimalState = 'idle';
  public speed: number = 3;

  private targetX: number;
  private targetY: number;

  private patrolX?: number;
  private patrolY?: number;

  constructor(x: number, y: number, color: number = 0xffffff) {
    this.view = new Graphics();
    this.view.fill(color).circle(0, 0, 14).fill();
    this.view.x = x;
    this.view.y = y;
    this.targetX = x;
    this.targetY = y;
  }

  public followTo(x: number, y: number) {
    this.state = 'following';
    this.targetX = x;
    this.targetY = y;
  }

  public setRandomPatrolTarget(width: number, height: number) {
    this.patrolX = 50 + Math.random() * (width - 100);
    this.patrolY = 50 + Math.random() * (height - 100);
  }

  public update(dt: number, fieldW = 800, fieldH = 600) {
    if (this.state === 'idle') {
      if (this.patrolX === undefined || this.patrolY === undefined) {
        this.setRandomPatrolTarget(fieldW, fieldH);
      }

      const dx = this.patrolX! - this.view.x;
      const dy = this.patrolY! - this.view.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 1) {
        const moveX = (dx / dist) * this.speed * dt * 0.5;
        const moveY = (dy / dist) * this.speed * dt * 0.5;
        this.view.x += moveX;
        this.view.y += moveY;
      } else {
        this.setRandomPatrolTarget(fieldW, fieldH);
      }
    }

    if (this.state === 'following') {
      const dx = this.targetX - this.view.x;
      const dy = this.targetY - this.view.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 1) {
        const moveX = (dx / dist) * this.speed * dt;
        const moveY = (dy / dist) * this.speed * dt;
        this.view.x += moveX;
        this.view.y += moveY;
      }
    }
  }

  public idle() {
    this.state = 'idle';
    this.patrolX = undefined;
    this.patrolY = undefined;
  }

  public tryFollow(
    heroX: number,
    heroY: number,
    groupSize: number,
    maxInGroup: number,
  ): boolean {
    if (this.state === 'idle' && groupSize < maxInGroup) {
      const dx = heroX - this.view.x;
      const dy = heroY - this.view.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 60) {
        this.state = 'following';
        this.patrolX = undefined;
        this.patrolY = undefined;
        return true;
      }
    }
    return false;
  }
}
