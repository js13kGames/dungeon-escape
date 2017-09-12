import Kontra from './lib/kontra.js';
import ScreenManager from "./classes/Screen/ScreenManager";
import Screens from "./classes/Screen/screen.js";

document.addEventListener("DOMContentLoaded", function() {
    const screenManager = new ScreenManager('game-container');
    const Menu = new Screens.Menu();
    const Main = new Screens.Main();
    const Success = new Screens.Success();
    screenManager.AddScreen('menu', Menu);
    screenManager.AddScreen('main', Main);
    screenManager.AddScreen('success', Success);
    screenManager.ChangeScreen('menu');

    Menu.on('start-game', () => {
        screenManager.ChangeScreen('main');
    });

    Main.on('success', () => {
        screenManager.ChangeScreen('success');
    })
    
}, false);

