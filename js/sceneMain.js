class SceneMain extends Phaser.Scene{
    constructor(){
        super(); 
    }

    preload = function() {
        this.load.image("player",'../assets/image/player.png');
        this.load.image("tiles",'../assets/image/ozone.png');
        this.load.image("laser",'../assets/image/laser.png');  
        this.load.image("factory", '../assets/image/factory.png');
        this.load.image("ozone", '../assets/image/ozone.jpg');
        this.load.image("gas", '../assets/image/gases.png');
        this.load.tilemapTiledJSON('map', '../assets/maps/ozoneMap2.json');
        this.load.audio('gdestroy', '../assets/audio/gasdestroy.wav');
    }
    
    create = function() {
        //=============================add player==============================
        this.player = this.physics.add.image(500,566,"player");
        this.factory = this.physics.add.image(1000,500,"factory").setImmovable().setScale(0.7);
        this.ozone = this.physics.add.image(1000,-1300,"ozone").setImmovable().setScale(15).setDepth(-1);
        this.factory2 = this.physics.add.image(200,540,"factory").setImmovable().setScale(0.5);
        this.player.displayHeight = 60;
        this.player.displayWidth = 60
        this.gdestroy = this.sound.add('gdestroy');

        this.score = 100;
        this.scoreText = this.add.text(30,10,'', 'score : 0', {fontSize : '32px', fill : '#000'});

        
        //==============================create tile===============================
        const map = this.make.tilemap({key : 'map'});
        const tileset = map.addTilesetImage('ozone2','tiles');
        const worldLayer = map.createLayer('world', tileset,-390,-205);


        worldLayer.setCollisionByProperty({ collide : true });
        this.physics.add.collider(this.player,worldLayer);
        this.physics.add.collider(this.player,this.factory);
        // this.cameras.main.startFollow(this.player, true, 0.8, 0.8);
        this.cursor = this.input.keyboard.createCursorKeys();
        this.input.on('pointerdown', this.shoot, this);
        this.gas = this.physics.add.image(this.factory.x, this.factory.y, 'gas').setScale(0.2).setOrigin(0, 0.5);
        SceneMain.setObjectVelocity(this.gas);
       
    }
    shoot()
    {
        this.laser = this.physics.add.image(this.player.x, this.player.y, 'laser').setScale(0.2).setOrigin(0, 0.5);

        this.physics.moveTo(this.laser, this.game.input.mousePointer.x, this.game.input.mousePointer.y, 600);
        this.physics.add.collider(this.laser, this.gas, this.destroyGas, null, this);
        this.physics.add.collider(this.laser, this.factory, this.destroyLaser, null, this);
        // this.ammo.setVelocityY(-300);
    }
    destroyLaser(laser, factory) {
        laser.disableBody(true, true);
    }

    destroyGas(laser, gas) {
        this.gdestroy.play();
        gas.disableBody(true, true);
        laser.disableBody(true, true);

        gas.enableBody(true, this.factory.x, this.factory.y, true, true);
        SceneMain.setObjectVelocity(gas);

    }
    update = function() {

        // ===================================movement of player==========================
        this.player.setVelocityX(0);
        this.player.setVelocityY(0);
       

        
        if(this.cursor.right.isDown == true){
            this.player.setVelocityX(500);
        }

        if(this.cursor.left.isDown == true){
            this.player.setVelocityX(-500);
        }
        this.checkRepositionForObject(this.gas, this.score,this.scoreText);
        
    }
    
    

     // give random velocity to the group object
     static setObjectsVelocity(objects) {
         objects.children.iterate((objcet) => {
             SceneMain.setObjectVelocity(objcet);
         });
     }

     // give random velocity to singal object
     static setObjectVelocity(object) {
         const xVel = Phaser.Math.Between(-100, 100);
         const yVel = Phaser.Math.Between(-150, -200);
         object.setVelocity(xVel, yVel);
    }

   checkRepositionForObject(object,score,scoreText) {
       if (object.y < 0) {
            this.score -= 10;
            if(this.score == 0){
                this.destroy();
            }
            scoreText.setText('score : '+this.score);
            object.y = this.factory.y;
           object.x = this.factory.x;
        }
    }
    // reset position of the object
     
}

