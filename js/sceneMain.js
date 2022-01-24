class SceneMain extends Phaser.Scene{
    constructor(){
        super("SceneMain")
    }

    preload = function() {
        this.load.image("player",'../assets/image/player.png');
        this.load.image("tiles",'../assets/image/ozone.png');
        this.load.tilemapTiledJSON('map', '../assets/maps/ozoneMap.json');
    }
    
    create = function() {
        this.player = this.physics.add.image(200,200,"player");
        this.player.displayHeight = 110;
        this.player.displayWidth = 110;

        //create tile
        const map = this.make.tilemap({key : 'map'});
        const tileset = map.addTilesetImage('ozone','tiles');
        const worldLayer = map.createLayer('world', tileset, 0, 0);
        const belowLayer = map.createLayer('below player', tileset, 0, 0);
        const aboveLayer = map.createLayer('above player', tileset, 0, 0);

        worldLayer.setCollisionByProperty({ collides : true });
        // this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player,worldLayer);
        this.cameras.main.startFollow(this.player, true, 0.8, 0.8);

        this.cursor = this.input.keyboard.createCursorKeys();
    }
    
    update = function() {
        this.player.setVelocityX(0);
        this.player.setVelocityY(0);

        if(this.cursor.up.isDown == true){
            this.player.setVelocityY(-500);
        }

        if(this.cursor.down.isDown == true){
            this.player.setVelocityY(500);
        }

        if(this.cursor.right.isDown == true){
            this.player.setVelocityX(500);
        }

        if(this.cursor.left.isDown == true){
            this.player.setVelocityX(-500);
        }

    }
}
