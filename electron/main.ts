import { ElectronEgg } from 'ee-core';
import { Lifecycle } from './preload/lifecycle';
import { preload } from './preload';
const path = require('path');

require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
    hardResetMethod: 'exit'
  });
// New app
const app = new ElectronEgg();

// Register lifecycle
const life = new Lifecycle();
app.register("ready", life.ready);
app.register("electron-app-ready", life.electronAppReady);
app.register("window-ready", life.windowReady);
app.register("before-close", life.beforeClose);

// Register preload
app.register("preload", preload);

// Run
app.run();