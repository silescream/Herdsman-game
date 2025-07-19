import { Application } from 'pixi.js';

import { Game } from './core/Game';

async function main() {
  const app = new Application();

  await app.init({ background: '#1099bb', resizeTo: window });

  document.body.appendChild(app.canvas);

  new Game(app);
}

main();
