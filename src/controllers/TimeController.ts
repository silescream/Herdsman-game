export class TimeController {
  private totalTime: number;
  private timeLeft: number;
  private onTick?: (timeLeft: number) => void;
  private onEnd?: () => void;
  private running: boolean = false;

  constructor(
    totalSeconds: number,
    onTick: (timeLeft: number) => void,
    onEnd?: () => void,
  ) {
    this.totalTime = totalSeconds;
    this.timeLeft = totalSeconds;
    this.onTick = onTick;
    this.onEnd = onEnd;
  }

  public start() {
    this.running = true;
    this.timeLeft = this.totalTime;
  }

  public update(deltaTime: number) {
    if (!this.running) return;

    this.timeLeft -= deltaTime / 60;

    if (this.timeLeft <= 0) {
      this.running = false;
      this.timeLeft = 0;
      this.onTick?.(0);
      this.onEnd?.();
    } else {
      this.onTick?.(Math.ceil(this.timeLeft));
    }
  }

  public getTimeLeft() {
    return Math.ceil(this.timeLeft);
  }

  public stop() {
    this.running = false;
  }
}
