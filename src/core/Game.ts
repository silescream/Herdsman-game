import { Application, Container } from 'pixi.js';
import { Hero } from '../entities/Hero';
import { Animal } from '../entities/Animal';
import { Yard } from '../entities/Yard';
import { ScoreBoard } from '../ui/Scoreboard';

export class Game {
  private app: Application;
  private scene: Container;
  private hero: Hero;
  private animals: Animal[] = [];
  private yard: Yard;
  private score: number = 0;
  private scoreBoard: ScoreBoard;

  constructor(app: Application) {
    this.app = app;
    this.scene = new Container();
    this.app.stage.addChild(this.scene);

    this.hero = new Hero(100, 100);
    this.scene.addChild(this.hero.view);
    
    this.app.canvas.addEventListener('pointerdown', this.onPointerDown);
    this.app.ticker.add((ticker) => this.update(ticker.deltaTime));
    this.spawnAnimals(10);
    this.yard = new Yard(700, 500, 60);
    this.scene.addChild(this.yard.view);

    this.scoreBoard = new ScoreBoard(0);
    this.app.stage.addChild(this.scoreBoard.view);
  }

  private spawnAnimals(count: number) {
    for (let i = 0; i < count; i++) {
      const x = Math.random() * 800;
      const y = Math.random() * 600;
      const animal = new Animal(x, y);
      this.animals.push(animal);
      this.scene.addChild(animal.view);
    }
  }

  private onPointerDown = (e: PointerEvent) => {
    const rect = this.app.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    this.hero.moveTo(x, y);
  };

  private update = (deltaTime: number) => {
    this.hero.update(deltaTime);

    const followers = this.animals.filter(a => a.state === 'following');
    const radius = 60;
    const heroX = this.hero.view.x;
    const heroY = this.hero.view.y;
    const animalsToRemove: Animal[] = [];

    followers.forEach((animal, i) => {
      const angle = (2 * Math.PI / followers.length) * i;
      const targetX = heroX + Math.cos(angle) * radius;
      const targetY = heroY + Math.sin(angle) * radius;
      animal.followTo(targetX, targetY);
      animal.update(deltaTime, 800, 600);

      if (this.yard.contains(animal.view.x, animal.view.y)) {
        animal.state = 'inYard';
        this.score += 1;
        this.scoreBoard.setScore(this.score);
        this.scene.removeChild(animal.view);
        animalsToRemove.push(animal);
      }
    });

    if (animalsToRemove.length > 0) {
      for (const animal of animalsToRemove) {
        const idx = this.animals.indexOf(animal);
        if (idx !== -1) {
          this.animals.splice(idx, 1);
          const x = Math.random() * 800;
          const y = Math.random() * 600;
          const newAnimal = new Animal(x, y);
          this.animals.push(newAnimal);
          this.scene.addChild(newAnimal.view);
        }
      }
    }

    let currentFollowers = followers.length;
    for (const animal of this.animals) {
      if (animal.state === 'idle') {
        animal.update(deltaTime, 800, 600);
        const added = animal.tryFollow(this.hero.view.x, this.hero.view.y, currentFollowers, 5);
        if (added) currentFollowers++;
      }
    }
  };
}