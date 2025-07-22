import { Container } from 'pixi.js';

import { Hero } from '../entities/Hero';
import { Yard } from '../entities/Yard';
import { ScoreBoard } from '../ui/Scoreboard';
import { Animal } from '../entities/Animal';

export class AnimalController {
  private animals: Animal[] = [];
  private container: Container;
  private hero: Hero;
  private yard: Yard;
  private scoreBoard: ScoreBoard;
  private sceneWidth: number;
  private sceneHeight: number;
  private maxFollowers: number;

  constructor(
    container: Container,
    hero: Hero,
    yard: Yard,
    scoreBoard: ScoreBoard,
    sceneWidth: number,
    sceneHeight: number,
    maxFollowers: number = 5,
  ) {
    this.container = container;
    this.hero = hero;
    this.yard = yard;
    this.scoreBoard = scoreBoard;
    this.sceneWidth = sceneWidth;
    this.sceneHeight = sceneHeight;
    this.maxFollowers = maxFollowers;
  }

  public spawnAnimals(count: number) {
    for (let i = 0; i < count; i++) {
      const x = Math.random() * this.sceneWidth;
      const y = Math.random() * this.sceneHeight;
      const animal = new Animal(x, y);
      this.animals.push(animal);
      this.container.addChild(animal.view);
    }
  }

  public updateAnimals(deltaTime: number) {
    const followers = this.animals.filter(
      (animal) => animal.state === 'following',
    );
    const radius = 60;
    const heroX = this.hero.view.x;
    const heroY = this.hero.view.y;
    const animalsToRemove: Animal[] = [];

    followers.forEach((animal, idx) => {
      const positionAngle = ((2 * Math.PI) / followers.length) * idx;
      const targetX = heroX + Math.cos(positionAngle) * radius;
      const targetY = heroY + Math.sin(positionAngle) * radius;
      animal.followTo(targetX, targetY);
      animal.update(deltaTime, this.sceneWidth, this.sceneHeight);

      if (this.yard.contains(animal.view.x, animal.view.y)) {
        animal.state = 'inYard';
        this.scoreBoard.setScore(this.scoreBoard.getScore() + 1);
        this.container.removeChild(animal.view);
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
          this.container.addChild(newAnimal.view);
        }
      }
    }

    let currentFollowers = followers.length;
    for (const animal of this.animals) {
      if (animal.state === 'idle') {
        animal.update(deltaTime, this.sceneWidth, this.sceneHeight);
        const added = animal.tryFollow(
          this.hero.view.x,
          this.hero.view.y,
          currentFollowers,
          this.maxFollowers,
        );
        if (added) currentFollowers++;
      }
    }
  }
}
