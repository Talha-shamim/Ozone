class Laser extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y){
        super(scene,x,y,'laser');
    }

    fire(x,y,pointer){
        this.body.reset(x,y);

        this.setActive(true);
        this.setVisible(true);
        this.displayHeight = 20;
        this.displayWidth = 20;

        // setting angle for laser
        let angle = Math.atan2(pointer.y - y,pointer.x - x); 
        this.setVelocityX(Math.cos(angle) * 1000);
        this.setVelocityY(Math.sin(angle) * 1000);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
    
        if (!this.scene.cameras.main.worldView.contains(this.x, this.y) || Math.abs(this.body.velocity.x) < 10 || Math.abs(this.body.velocity.y) < 10) {
            console.log(this.body.velocity.x, this.body.velocity.y)
            this.setActive(false);
            this.setVisible(false);
        }
    }
}

class LaserGroup extends Phaser.Physics.Arcade.Group{
    constructor(scene){
        super(scene.physics.world,scene);
        
        this.createMultiple({
            classType : Laser,
            frameQuantity : 30,
            active : false,
            visible : false,
            key : 'laser',
        })
    }

    fireLaser(x,y,pointer){
        const laser = this.getFirstDead(true);        
        if(laser){
            laser.fire(x,y,pointer);
        }
    }
}

class SceneMain extends Phaser.Scene{
    constructor(){
        super();
        this.LaserGroup;    
    }

    preload = function() {
        this.load.image("player",'../assets/image/player.png');
        this.load.image("tiles",'../assets/image/ozone.png');
        this.load.image("laser",'../assets/image/laser.jpg');  
        this.load.tilemapTiledJSON('map', '../assets/maps/ozoneMap.json');
    }
    
    create = function() {
        //=============================add player==============================
        this.player = this.physics.add.image(20,20,"player");
        this.player.displayHeight = 60;
        this.player.displayWidth = 60

        //laser
        this.laserGroup = new LaserGroup(this); 
        
        //==============================create tile===============================
        const map = this.make.tilemap({key : 'map'});
        const tileset = map.addTilesetImage('ozone','tiles');
        const worldLayer = map.createLayer('world', tileset, 0, 0);
        const belowLayer = map.createLayer('below player', tileset, 0, 0);
        const aboveLayer = map.createLayer('above player', tileset, 0, 0);

        worldLayer.setCollisionByProperty({ collides : true });
        this.physics.add.collider(this.player,worldLayer);
        this.physics.add.collider(this.laserGroup,worldLayer,this.destroyLaser);
        this.cameras.main.startFollow(this.player, true, 0.8, 0.8);

        this.cursor = this.input.keyboard.createCursorKeys();

        this.addEvents();
    }

    

    addEvents(){
        this.input.on('pointermove', pointer => {
            this.shootLaser(pointer);
        })
    }

    shootLaser(pointer){
        this.laserGroup.fireLaser(this.player.x,this.player.y,pointer);
    }
    


    
    update = function() {

        // ===================================movement of player==========================
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
