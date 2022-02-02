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
        this.load.image("back", '../assets/image/back.webp');
    }
    
    create = function() {
        this.back = this.physics.add.image(1000,400,"back").setImmovable().setScale(2).setDepth(-1);
        this.player = this.physics.add.image(300,266,"player").setScale(0.7);

        // Use player.state.username to get player's username
        this.gameOverText = this.add.text(550,266, `${player.state.username} game over`, {fontSize : '72px', fill : '#fff', fontFamily : 'Arial',FontStyle : 'bold', align : 'center', stroke : '#000', strokeThickness : 5, wordWrap : true, wordWrapWidth : 800 ,textTransform : 'uppercase'});

        this.score = this.add.text(630,330, 'Your score '+ this.point, {fontSize : '30px', fill : '#fff', fontFamily : 'Arial', padding : 10});

        this.startBtn = this.add.sprite(750, 400, 'restart').setInteractive().setScale(0.4);

        this.startBtn.on('pointerdown', function(){
            location.reload();
        }); 
    }


    update = function() {

    }
}