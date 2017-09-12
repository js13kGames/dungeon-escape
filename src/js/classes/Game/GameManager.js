import BaseClass from "../base";
import kontra from "../../lib/kontra";
import RoomGenerator from './RoomGenerator';
import {randi} from '../../utils/dom';
import Player from './Player'

export default class GameManager extends BaseClass {
    constructor(canvas) {
        super();
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.kontra = kontra.init(canvas);
        this.rooms = [];
    }

    GenerateRooms() {
        let roomCount = 2 + randi(4);
        this.playerStart = randi(roomCount) - 1;
        this.exitRoom = randi(roomCount) - 1;
        for(let i = 0; i <= roomCount; i++) {
            this.rooms[i] = new RoomGenerator(10,10, this.context);
            this.rooms[i].GenerateRoom();
            if(i > 0) {
                this.rooms[i -1].CreateConnection(this.rooms[i], true)
                this.rooms[i].CreateConnection(this.rooms[i - 1], false)
            }
            
        }
        this.currentRoom = this.rooms[this.playerStart];
        this.currentRoom.collision[1][1] = 0;
        this.currentRoom.ClearPath(1,1,this.currentRoom.sizeX,this.currentRoom.sizeY);

        
        this.rooms[this.exitRoom].createExit();
        
        this.currentRoom.finalize();

    }
    init() {
        kontra.assets.load('img/MapTiles.png', 'img/character.png')
        .then(() => {
            this.player = new Player();
            this.movingRoom = false;
            this.player.on('moveUpRoom', () => {
                if(this.movingRoom) return;
                this.movingRoom = true;
                this.playerStart +=1;
                this.currentRoom = this.rooms[this.playerStart];
                this.currentRoom.finalize();
                this.player.setPosition(Math.floor(((this.currentRoom.sizeX) * 32) / 2) - 64, (this.currentRoom.sizeY * 32) -60);
                this.player.room = this.currentRoom;
                this.currentRoom.tileEngine.sx = (this.currentRoom.sizeX * 32) / 2;
                this.currentRoom.tileEngine.sy =  (this.currentRoom.sizeY * 32) -32;
                this.movingRoom = false;
                
            });

            this.player.on('moveDownRoom', () => {
                if(this.movingRoom) return;
                this.movingRoom = true;
                this.playerStart -=1;
                this.currentRoom = this.rooms[this.playerStart];
                this.currentRoom.finalize();
                this.player.setPosition((this.currentRoom.sizeX * 32) / 2, 32);
                this.player.room = this.currentRoom;
                this.currentRoom.tileEngine.sy = 0;
                
                this.movingRoom = false;
            });

            this.player.on('reachedExit', () => {
                this.emit('success');
            })
            this.GenerateRooms();
            this.player.room = this.currentRoom;

            var loop = kontra.gameLoop({
                fps: 30,
                clearCanvas: false,
                update: (dt) => {
                    if(!this.movingRoom) {
                        this.player.update();
                    }
                    
                },
                render: () => {
                  kontra.context.clearRect(0, 0, kontra.canvas.width, kontra.canvas.height);
              
                  this.currentRoom.render();
                  this.player.render();
                }
              });
              loop.start();
        });
        
    }
}