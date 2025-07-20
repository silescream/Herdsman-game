import { Application } from 'pixi.js';

import { SceneManager } from './utils/SceneManager';
import { StartScene } from './scenes/StartScene';
import { eventBus } from './utils/EventBus';
import { GameScene } from './scenes/GameScene';

async function main() {
  const app = new Application();
  await app.init({ background: '0x006400', resizeTo: window });
  document.body.appendChild(app.canvas);
  const appWidth = app.screen.width;
  const appHeight = app.screen.height;

  SceneManager.init(app);
  SceneManager.changeScene(new StartScene());

  eventBus.on('gameStart', () => {
    SceneManager.changeScene(new GameScene(appWidth, appHeight));
  });

  eventBus.on('restartGame', () => {
    SceneManager.changeScene(new StartScene());
  });
}

main();
