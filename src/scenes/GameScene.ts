import { Container, FederatedPointerEvent, Graphics, Ticker } from 'pixi.js';

import { SceneManager, type IScene } from '../utils/SceneManager';
import { Hero } from '../entities/Hero';
import { Yard } from '../entities/Yard';
import { ScoreBoard } from '../ui/Scoreboard';
import { TimeController } from '../controllers/TimeController';
import { eventBus } from '../utils/EventBus';
import { AnimalController } from '../controllers/AnimalController';

export class GameScene extends Container implements IScene {
  private hero: Hero;
  private yard: Yard;
  private scoreBoard: ScoreBoard;
  private sceneWidth: number;
  private sceneHeight: number;
  private timer: TimeController;
  private animalController: AnimalController;

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

    this.animalController = new AnimalController(
      this, this.hero, this.yard, this.scoreBoard, this.sceneWidth, this.sceneHeight
    );

    this.animalController.spawnAnimals(10);

    this.eventMode = 'static';
    this.on('pointerdown', this.onPointerDown);
    SceneManager.addTicker(this.pixiUpdate);
  }

  private onPointerDown = (e: FederatedPointerEvent) => {
    const x = e.global.x
    const y = e.global.y;
    this.hero.moveTo(x, y);
  };

  public endGame() {
    eventBus.emit('gameEnd', this.scoreBoard.getScore());
  }

  private update = (deltaTime: number) => {
    this.timer.update(deltaTime);
    this.hero.update(deltaTime);
    this.animalController.updateAnimals(deltaTime);
  };

  private pixiUpdate = (ticker: Ticker) => {
    this.update(ticker.deltaTime);
  } 

  public destroyScene(): void {
    this.off('pointerdown', this.onPointerDown);
    SceneManager.removeTicker(this.pixiUpdate)
  }
}