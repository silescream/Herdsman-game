import { Container, FederatedPointerEvent, Graphics } from 'pixi.js';

import { SceneManager, type IScene } from '../utils/SceneManager';
import { Hero } from '../entities/Hero';
import { Yard } from '../entities/Yard';
import { ScoreBoard } from '../ui/Scoreboard';
import { Animal } from '../entities/Animal';
import { TimeController } from '../controllers/TimeController';
import { eventBus } from '../utils/EventBus';

export class GameScene extends Container implements IScene {
  private hero: Hero;
  private yard: Yard;
  private score: number = 0;
  private scoreBoard: ScoreBoard;
  private animals: Animal[] = [];
  private sceneWidth: number;
  private sceneHeight: number;
  private timer: TimeController;

  constructor(width: number, height: number) {
    super();

    this.sceneHeight = height;
    this.sceneWidth = width;

    const background = new Graphics();
    background.fill(0x006400);
    background.roundRect(0, 0, this.sceneWidth, this.sceneHeight);
    background.fill();
    this.addChild(background);

    this.scoreBoard = new ScoreBoard(0);
    this.addChild(this.scoreBoard);
    
    this.timer = new TimeController(
      60,
      (timeLeft) => this.scoreBoard.setTime(timeLeft),
      () => this.endGame(),
    );
    this.timer.start();

    this.hero = new Hero(100, 100);
    this.addChild(this.hero.view);

    this.yard = new Yard(700, 500, 60);
    this.addChild(this.yard.view);

    this.spawnAnimals(10);

    this.eventMode = 'static';
    this.on('pointerdown', this.onPointerDown);
    SceneManager.addTicker((ticker) => this.update(ticker.deltaTime));
  }

  private spawnAnimals(count: number) {
    for (let i = 0; i < count; i++) {
      const x = Math.random() * this.sceneWidth;
      const y = Math.random() * this.sceneHeight;
      const animal = new Animal(x, y);
      this.animals.push(animal);
      this.addChild(animal.view);
    }
  }

  private onPointerDown = (e: FederatedPointerEvent) => {
    const x = e.global.x
    const y = e.global.y;
    this.hero.moveTo(x, y);
  };

  public endGame() {
    eventBus.emit('gameEnd', this.score);
  }

  private update = (deltaTime: number) => {
    this.timer.update(deltaTime);
    this.hero.update(deltaTime);

    const followers = this.animals.filter(animal => animal.state === 'following');
    const radius = 60;
    const heroX = this.hero.view.x;
    const heroY = this.hero.view.y;
    const animalsToRemove: Animal[] = [];

    followers.forEach((animal, i) => {
      const angle = (2 * Math.PI / followers.length) * i;
      const targetX = heroX + Math.cos(angle) * radius;
      const targetY = heroY + Math.sin(angle) * radius;
      animal.followTo(targetX, targetY);
      animal.update(deltaTime, this.sceneWidth, this.sceneHeight);

      if (this.yard.contains(animal.view.x, animal.view.y)) {
        animal.state = 'inYard';
        this.score += 1;
        this.scoreBoard.setScore(this.score);
        this.removeChild(animal.view);
        animalsToRemove.push(animal);
      }
    });

    if (animalsToRemove.length > 0) {
      for (const animal of animalsToRemove) {
        const idx = this.animals.indexOf(animal);
        if (idx !== -1) {
          this.animals.splice(idx, 1);
          const x = Math.random() * this.sceneWidth;
          const y = Math.random() * this.sceneHeight;
          const newAnimal = new Animal(x, y);
          this.animals.push(newAnimal);
          this.addChild(newAnimal.view);
        }
      }
    }

    let currentFollowers = followers.length;
    for (const animal of this.animals) {
      if (animal.state === 'idle') {
        animal.update(deltaTime, this.sceneWidth, this.sceneHeight);
        const added = animal.tryFollow(this.hero.view.x, this.hero.view.y, currentFollowers, 5);
        if (added) currentFollowers++;
      }
    }
  };
}