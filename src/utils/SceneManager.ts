import { Application, Container, Ticker } from 'pixi.js';

export interface IScene extends Container {
  destroyScene?(): void;
}

export class SceneManager {
  private static app: Application;
  private static currentScene: IScene | null = null;

  public static init(app: Application) {
    SceneManager.app = app;
  }

  public static changeScene (scene: IScene) {
    if (SceneManager.currentScene) {
      if (SceneManager.currentScene.destroyScene) {
        SceneManager.currentScene.destroyScene();
      }

      SceneManager.app.stage.removeChild(SceneManager.currentScene);
    }
    SceneManager.currentScene = scene;
    SceneManager.app.stage.addChild(scene);
  }

  public getCurrentScene(): IScene | null {
    return SceneManager.currentScene;
  }

  public static addTicker(fn: (ticker: Ticker) => void) {
    SceneManager.app.ticker.add(fn);
  }

  public static removeTicker(fn: (ticker: Ticker) => void) {
    SceneManager.app.ticker.remove(fn);
  }
}
