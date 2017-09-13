import kontra from '../../lib/kontra'
import BaseClass from "../base"

export default class Player extends BaseClass {

    constructor() {
        super();
        this.speed = 2;
    }

    init() {
        this.spritesheet = kontra.spriteSheet({
            image: kontra.assets.images['img/character'],
            frameWidth: 32,
            frameHeight: 32,
            animations: {
              walk_left: {
                frames: '0..2',
                frameRate: 12,
                width: - 32
              },
              walk_right: {
                frames: '0..2',
                frameRate: 12,
              }
            }
        });

        this.player = kontra.sprite({
            startX: 32,
            startY: 32,
            speed: 2,
            x: 32,
            y:32, 
            animations:this.spritesheet.animations,
            update: this.onUpdate.bind(this)
        })
    }

    onUpdate(dt) {
        var bbox = {
            x:this.player.x + 5,
            y: this.player.y + 10,
            width:18,
            height:18
        };
        var x = 0, y = 0;

        if(kontra.keys.pressed('up')) {
            this.player.advance();
            y = -this.player.speed;
        }

        if(kontra.keys.pressed('down')) {
            this.player.advance();
            y = this.player.speed;
        }

        if(kontra.keys.pressed('left')) {
            this.player.playAnimation('walk_left');
            this.player.advance();
            x = -this.player.speed;
        }

        if(kontra.keys.pressed('right')) {
            this.player.playAnimation('walk_right');
            this.player.advance();
            x = this.player.speed;
        }

        bbox.y += y;
        bbox.x += x;
        var collision = this.room.tileEngine.layerCollidesWith('collision', bbox);
        if(collision) {


            if(collision.data == 4) {
                this.room.collision[collision.row][collision.col] = 0;
                this.emit('reachedExit');
            }
            return;
        }

        this.player.x += x;
        this.player.y += y;

        if(0 <= this.room.tileEngine.sx + x  && this.room.tileEngine.mapWidth > this.room.tileEngine.sx + x) {
            this.room.tileEngine.sx += x;
        }
        if(0 <= this.room.tileEngine.sy + y && this.room.tileEngine.mapHeight > this.room.tileEngine.sy + y) {
            this.room.tileEngine.sy += y;
        }

        if(this.player.y < 16) {
            this.emit('moveUpRoom');
        }

        if(this.player.y > this.room.tileEngine.mapHeight - 48) {
            this.emit('moveDownRoom');
        }


    }

    setPosition(x, y) {
        this.player.startX = x;
        this.player.startY = y;
       this.player.x = x;
       this.player.y = y;
    }

    set room(val) {
        this._room = val;
    }

    get room() {
        return this._room;
    }
    update() {
        this.player.update();
    }

    render() {
        this.player.render();
    }
}