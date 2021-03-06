class SceneMain extends Phaser.Scene{
    constructor(){
        super('gameStart'); 
    }

    preload = function() {
        // this.load.image("player",'../../assets/image/player.png');
        this.load.spritesheet("dude", 
			"../../assets/image/dude.png",
			{ frameWidth: 32, frameHeight: 48 }
		)
        this.load.image("tiles",'../../assets/image/ozone.png');
        this.load.image("laser",'../../assets/image/laser.png');  
        this.load.image("brahmos",'../../assets/image/brahmos.png');  
        this.load.image("factory", '../../assets/image/factory.png');
        this.load.image("ozone", '../../assets/image/ozone.jpg');
        this.load.image("tree", '../../assets/image/tree.png');
        this.load.image("tree2", '../../assets/image/tree2.png');
        this.load.image("tree3", '../../assets/image/tree3.png');
        this.load.image("ozone2", '../../assets/image/ozone2.jpg');
        this.load.image("gas", '../../assets/image/gases.png');
        this.load.image("back2", '../../assets/image/back2.webp');
        this.load.tilemapTiledJSON('map', '../../assets/maps/ozoneMap2.json');
        this.load.audio('gdestroy', '../../assets/audio/gasdestroy.wav');
       
    }
    
    create = function() {
        // Cursor
        this.input.setDefaultCursor('url(../../assets/image/aim_assistant.png), pointer');

        //=============================add player==============================
        // this.player = this.physics.add.image(500,566,"player");
        this.player = this.physics.add.sprite(500, 566, "dude");
        this.addPlayerAnimations();
        
        this.factory = this.physics.add.image(1000,500,"factory").setImmovable().setScale(0.7);
        this.ozone = this.physics.add.image(1000,-1200,"ozone").setImmovable().setScale(15).setDepth(-1);
        this.tree = this.physics.add.image(40,500,"tree").setImmovable().setScale(1).setDepth(-1);
        this.tree2 = this.physics.add.image(700,460,"tree2").setImmovable().setScale(0.6).setDepth(-1);
        this.tree3 = this.physics.add.image(1300,510,"tree3").setImmovable().setScale(1).setDepth(-1);
        this.factory2 = this.physics.add.image(200,540,"factory").setImmovable().setScale(0.5);
        // this.player.displayHeight = 60;
        // this.player.displayWidth = 60;
        this.gdestroy = this.sound.add('gdestroy');

        this.score = 100;
        this.point = 0;
        this.count = 0;
        this.activateBrahmos = false;
        this.scoreText = this.add.text(30,10, 'Ozone Level : 100', {fontSize : '18px', fill : '#fff'});
        this.pointText = this.add.text(30,50, 'points : ' + this.point, {fontSize : '18px', fill : '#fff'});

        
        //==============================create tile===============================
        const map = this.make.tilemap({key : 'map'});
        const tileset = map.addTilesetImage('ozone2','tiles');
        const worldLayer = map.createLayer('world', tileset,-390,-205);


        worldLayer.setCollisionByProperty({ collide : true });
        this.physics.add.collider(this.player,worldLayer);
        this.physics.add.collider(this.player,this.factory);
        this.physics.add.collider(this.player,this.factory2);
        // this.cameras.main.startFollow(this.player, true, 0.8, 0.8);
        this.cursor = this.input.keyboard.createCursorKeys();
        
        this.input.on('pointerdown', this.shoot, this);
        
        this.gas = this.physics.add.image(this.factory.x, this.factory.y, 'gas').setScale(0.1).setOrigin(0, 0.5);
        this.gas1=this.physics.add.image(this.factory2.x, this.factory2.y, 'gas').setScale(0.1).setOrigin(0, 0.5);
        
        SceneMain.setObjectVelocity(this.gas);
        SceneMain.setObjectVelocity(this.gas1);
    }

    // Add left and right animation to the player
    addPlayerAnimations() {
        this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
			frameRate: 10,
			repeat: -1
		});
		this.anims.create({
			key: 'turn',
			frames: [ { key: "dude", frame: 4 } ],
			frameRate: 20
		});
		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
			frameRate: 10,
			repeat: -1
		});
    }

    // Shoot laser or brahmos when mouse is clicked
    shoot() {
        if(this.activateBrahmos){
            this.laser = this.physics.add.image(this.player.x, this.player.y, 'brahmos').setScale(0.15).setOrigin(0, 0.5);

            this.physics.moveTo(this.laser, this.game.input.mousePointer.x, this.game.input.mousePointer.y, 600);
            this.physics.add.collider(this.laser, this.gas, this.destroyGas, null, this);
            this.physics.add.collider(this.laser, this.gas1, this.destroyGas1, null, this);
            if(this.activateBrahmos == false){
                this.physics.add.collider(this.laser, this.factory, this.destroyLaser, null, this);
                this.physics.add.collider(this.laser, this.factory2, this.destroyLaser, null, this);
            }
            else{
                this.physics.add.collider(this.laser, this.factory, this.destroyFactory1, null, this);
                this.physics.add.collider(this.laser, this.factory2, this.destroyFactory1, null, this);
            }
        }
        else{
            this.laser = this.physics.add.image(this.player.x, this.player.y, 'laser').setScale(0.1).setOrigin(0, 0.5);

            this.physics.moveTo(this.laser, this.game.input.mousePointer.x, this.game.input.mousePointer.y, 600);
            this.physics.add.collider(this.laser, this.gas, this.destroyGas, null, this);
            this.physics.add.collider(this.laser, this.gas1, this.destroyGas1, null, this);
            if(this.activateBrahmos == false){
                this.physics.add.collider(this.laser, this.factory, this.destroyLaser, null, this);
                this.physics.add.collider(this.laser, this.factory2, this.destroyLaser, null, this);
            }
            else{
                this.physics.add.collider(this.laser, this.factory, this.destroyFactory1, null, this);
                this.physics.add.collider(this.laser, this.factory2, this.destroyFactory2, null, this);
            }

            if(this.point == 2500 && this.activateBrahmos == false){
                this.activateBrahmos = true;
                this.brahmosText = this.add.text(500,10, 'Bombs Activated', {fontSize : '28px', fill : '#66ff66', fontFamily: 'Architectural',});
                
                this.time.addEvent({ delay: 1500, callback: this.brahmosTextRemove, callbackScope: this, loop: false });
            }
        }
    }

    // Remove Brahmos text
    brahmosTextRemove(){
        this.brahmosText.destroy();
    }

    // Destroy laser when it collides with a factory
    destroyLaser(laser, factory) {
        laser.disableBody(true, true);
    }

    // Destroy factory1 when Brahmos hits it
    destroyFactory1(laser, factory) {
        factory.disableBody(true, true);
        laser.disableBody(true, true);
        this.gdestroy.play();
        if (this.activateBrahmos == true) {
            this.gas1.disableBody(true, true);
        };
            
        this.count++;
        if(this.count == 2){
            this.scene.start('winning', {point : this.point});
        }
    }

    // Destroy factory2 when Brahmos hits it
    destroyFactory2(laser, factory) {
        factory.disableBody(true, true);
        laser.disableBody(true, true);
        this.gdestroy.play();
        if (this.activateBrahmos == true) {
            this.gas.disableBody(true, true);
        }
        this.count++;
        if (this.count == 2) {
            this.scene.start('winning', { point: this.point });
        }
    }

    // Destroy gas when it collides with a laser
    destroyGas(laser, gas) {
        this.gdestroy.play();
        gas.disableBody(true, true);
        laser.disableBody(true, true);  
        this.point += 100;
        this.pointText.setText('points : '+this.point);
        gas.enableBody(true, this.factory.x, this.factory.y, true, true);
        SceneMain.setObjectVelocity(gas);
    }

    // Destroy gas1 when it collides with a laser
    destroyGas1(laser, gas) {
        this.gdestroy.play();
        gas.disableBody(true, true);
        laser.disableBody(true, true);
        this.point += 100;
        this.pointText.setText('points : ' + this.point);
        gas.enableBody(true, this.factory2.x, this.factory2.y, true, true);
        SceneMain.setObjectVelocity(gas);
    }

    update = function() {
        // ===================================movement of player==========================
        this.player.setVelocityY(0);
        // this.player.anims.play('turn')
        
        if(this.cursor.right.isDown == true){
            this.player.setVelocityX(500);
            this.player.anims.play('right', true)
        }

        else if(this.cursor.left.isDown == true){
            this.player.setVelocityX(-500);
            this.player.anims.play('left', true)
        }
        else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn')
        }

        this.checkRepositionForObject(this.gas, this.score, this.scoreText);
        this.checkRepositionForObject1(this.gas1, this.score, this.scoreText);
    }

    // Launch Brahmos
    launchBrahmos(){
        this.point += 1000;
        this.pointText.setText('points : ' + this.point);
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

    // Check for new position of gas 
    checkRepositionForObject(object,score,scoreText) {
        if(this.score < 70)this.tree.disableBody(true,true);
        if(this.score < 40)this.tree2.disableBody(true,true);
        if(this.score < 20)this.tree3.disableBody(true,true);

        if(object.y < 0) {
            this.score -= 10;
            if (this.score >= 70) {
                this.cameras.main.setBackgroundColor('#E0FFFF');
                
            }
            else if (this.score >= 40) {
                this.cameras.main.setBackgroundColor('#ccff33');
            }
            else if (this.score >= 20) {
                this.cameras.main.setBackgroundColor('#cc9900');
            }
            else{
                this.cameras.main.setBackgroundColor('#999966');
            }

                
            if(this.score == 70){
                this.ozone.y -= 50;
                
            }
            if(this.score == 40){
                this.ozone.y -= 50;
            }

            if(this.score <= 0){
                this.scene.start('gameOver', {point : this.point});
            }
            scoreText.setText('Ozone Level : '+this.score);
            object.y = this.factory.y;
            object.x = this.factory.x;
        }
    }
    
    // Check for new position of gas1
    checkRepositionForObject1(object, score, scoreText) {
        if(this.ozone.y == 70){
            this.tree.disableBody(true,true);
        }

        if (object.y < 0) {
            this.score -= 10;
            if (this.score == 70) {
                this.ozone.y -= 50;
            }
            if (this.score == 40) {
                this.ozone.y -= 50;
            }
            if(this.score <= 0){
                this.scene.start('gameOver', {point : this.point});
            }
            scoreText.setText('Ozone Level : ' + this.score);
            object.y = this.factory2.y;
            object.x = this.factory2.x;
        }
    }
}

