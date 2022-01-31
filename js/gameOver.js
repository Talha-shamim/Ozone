class GameOver extends Phaser.Scene{
    constructor(){
        super('gameOver'); 
    }

    init = function (data){
        this.point = data.point;
    }

    preload = function() {
        this.load.image("player",'../assets/image/player.png');
        this.load.image("restart", '../assets/image/restart.png');
        this.load.image("ozone", '../assets/image/ozone.png');
    }
    
    create = function() {
        this.ozone = this.physics.add.image(1000,100,"ozone").setImmovable().setScale(15).setDepth(-1);
        this.player = this.physics.add.image(300,266,"player").setScale(0.7);
        this.gameOverText = this.add.text(550,266, 'game over', {fontSize : '72px', fill : '#000'})

        this.score = this.add.text(630,330, 'Your score '+ this.point, {fontSize : '30px', fill : '#000'})

        this.startBtn = this.add.sprite(750, 400, 'restart').setInteractive().setScale(0.4);

        this.startBtn.on('pointerdown', function(){
            location.reload();
        }); 
    }


    update = function() {

    }
}