import kontra from "../../lib/kontra";
import {randi} from "../../utils/dom";
const outerWall = 2;
const floor = 3;
const obs = 1;

export default class Room {
    constructor(SizeX, SizeY, context) {
        this.sizeX = SizeX;
        this.sizeY = SizeY;
        this.data = [];
        this.collision = [];
        this.context = context;
    }
    GenerateRoom() {
            for (let y = -1; y < this.sizeY + 1; y++)
            {
                for (let x = -1; x < this.sizeX + 1; x++)
                {
                    if(x == -1) {
                        this.data[y + 1] = [];
                        this.collision[y + 1] = [];
                    }

                    if (x == -1 || x == this.sizeX || y == -1 || y == this.sizeY)
                    {
                        this.data[y + 1][x + 1] = 0;
                        this.collision[y + 1][x + 1] = outerWall
                    } else {
                        this.data[y + 1][x + 1] = floor;
                        this.collision[y + 1][x + 1] = 0;
                    }
                }
            }
        this.GenerateObstacles()
    }

    createExit() {
        let x = randi(this.sizeX), y = randi(this.sizeY);
        let halfY = Math.floor(this.sizeY /2)
        this.collision[y][x] = 4;
        this.ClearPath(x,y,x,halfY);
    }

    ClearPath(fromX,fromY,toX,toY) {
        if (fromX >= toX)
        {
            for(var i = fromX + 1; i >=toX;i--) {
                this.collision[toY][i] = 0;
            }
        }

        if (fromX >= toX)
        {
            for(var i = fromX -1; i <=toX;i++) {
                this.collision[toY][i] = 0;
            }
        }

        if (fromY <= toY)
        {
            for(var i = fromY + 1; i <=toY;i++) {
                this.collision[i][fromX] = 0;
            }
        }

        if (fromY >= toY)
        {
            for(var i = fromY - 1; i >=toY;i--) {
                this.collision[i][fromX] = 0;
            }
        }
    }

    CreateConnection(adjoiningRoom, top) {
        let x = Math.floor(this.sizeX / 2);
        let halfY = Math.floor(this.sizeY /2)
        if(top) {
            this.collision[0][x] = 0;
            this.data[0][x] = 3;
            this.bottomRoom = adjoiningRoom;
            this.ClearPath(x,0,x, halfY);
        } else {
            this.collision[this.sizeY + 1][x] = 0;
            this.data[this.sizeY + 1][x] = 3;
            this.topRoom = adjoiningRoom;
            this.ClearPath(x,this.sizeY + 1,x, halfY);
        }
    }
    

    GenerateObstacles() {
        let noOfObstacles = randi((this.sizeX * this.sizeY) / 3);
        for(let i = 0; i < noOfObstacles; i++) {
            this.GenerateObstacle(randi(this.sizeX),randi(this.sizeY));
        }
    }

    GenerateObstacle(x, y) {
        this.collision[y][x] = 1;
    }

    get sx() {
        return this.tileEngine.sx;
    }

    set sx(v) {
        this.tileEngine.sx = v;
    }

    get sy() {
        return this.tileEngine.sy;
    }

    set sy(v) {
        this.tileEngine.sy = v; 
    }


    finalize() {
        this.tileEngine = kontra.tileEngine({
            tileWidth: 32,
            context: this.context,
            tileHeight: 32,
            width:this.sizeX + 2,
            height: this.sizeY + 2,
            
            layers: [
                {
                    name: 'lvl',
                    data: this.data
                },
                {
                    name: 'collision',
                    data: this.collision,
                }
            ],
            tilesets: [{
                image: 'img/MapTiles.png',
                firstGrid: 0
            }]

        });

        this.tileEngine.height = this.sizeY + 2;
        this.tileEngine.width = this.sizeX + 2;
    }
    render() {
        this.tileEngine.render();
    }
}