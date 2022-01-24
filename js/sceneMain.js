class SceneMain extends Phaser.Scene{
    constructor(){
        super("SceneMain")
    }

    preload = function() {
        this.load.image("player",'../assets/image/player.png');
    }
    
    create = function() {
        this.player = this.physics.add.image(200,200,"player");
        this.player.displayHeight = 110;
        this.player.displayWidth = 110;

        this.cursor = this.input.keyboard.createCursorKeys();
    }
    
    update = function() {
        this.player.setVelocityX(0);
        this.player.setVelocityY(0);

        if(this.cursor.up.isDown == true){
            this.player.setVelocityY(-300);
        }

        if(this.cursor.down.isDown == true){
            this.player.setVelocityY(300);
        }

        if(this.cursor.right.isDown == true){
            this.player.setVelocityX(300);
        }

        if(this.cursor.left.isDown == true){
            this.player.setVelocityX(-300);
        }

    }
}
