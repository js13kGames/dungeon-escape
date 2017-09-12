import screen from "./screen.js";
import {gid} from "../../utils/dom"
export default class ScreenManager {
    
    constructor(container) {
        this.gameContainer = gid(container);
        this.screens = {};
    }

    AddScreen(name, screen) {
        this.screens[name] = screen; 
    }

    ChangeScreen(name) {
        this.gameContainer.innerHTML = "";
        this.gameContainer.innerHTML = this.screens[name].getContent();
        this.screens[name].ready();
    }
}