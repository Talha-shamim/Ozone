class GameOver extends Phaser.Scene{
    constructor(){
        super('gameOver'); 
    }

    preload = function() {
        this.load.image("player",'../assets/image/player.png');
        this.load.image("ozone", '../assets/image/ozone.jpg');
    }
    
    create = function() {
        this.ozone = this.physics.add.image(1000,100,"ozone").setImmovable().setScale(15).setDepth(-1);
        this.player = this.physics.add.image(300,366,"player").setScale(0.7);
        this.gameOverText = this.add.text(550,366, 'game over', {fontSize : '72px', fill : '#000'})
    }

    update = function() {

    }
}