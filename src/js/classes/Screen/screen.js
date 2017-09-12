import BaseClass from '../base';
import {gid} from "../../utils/dom";
import GameManager from "../Game/GameManager";
export class MenuScreen extends BaseClass {

    ready() {
        this.start = gid('start');
        this.start.addEventListener('click', (e) => {
            this.emit('start-game');
        }, false);
    }

    getContent() {
        return "<div class=\"menu\">" + 
               "<div class=\"title-logo\">Dungeon <br/>Escape</div>" +
               "<div class=\"button\" id=\"start\">New Game</div>" +
               "</div>"
    } 
}

export class SuccessScreen extends BaseClass {
    ready() {

    }

    getContent() {
        return "<div><div class=\"title-logo\">You Made<br/>It!</div></div>";
    }
}
export class MainScreen extends BaseClass {
    
    ready() {
        this.gameCanvas = gid('game-canvas');
        this.gameManager = new GameManager(this.gameCanvas);

        this.gameManager.on('success', () => {
            this.emit('success');
        });
    }

    getContent() {
        return "<div class=\"title-logo\">Dungeon <br/>Escape</div>" +
        "<canvas class=\"game\" id=\"game-canvas\" width=\"320px\" height=\"320px\" />"
    } 
}

export default {
    Menu: MenuScreen,
    Main: MainScreen,
    Success: SuccessScreen
}