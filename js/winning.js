class Winning extends Phaser.Scene{
    constructor(){
        super('winning'); 
    }

    init = function (data){
        this.point = data.point;
    }

    preload = function() {
        this.load.image("player",'../assets/image/player.png');
        this.load.image("restart", '../assets/image/restart.png');
        this.load.image("back", '../assets/image/gameoverbg.webp');
    }
    
    create = function() {
        this.back = this.physics.add.image(1000,400,"back").setImmovable().setScale(0.95).setDepth(-1);
        this.player = this.physics.add.image(300,266,"player").setScale(0.7);

        // Use user_player.state.username to get player's username
        this.gameOverText = this.add.text(450,266, `${user_player.state.username}, You won! 🎊`, {fontSize : '65px', fill : '#39ff14', fontFamily : 'Arial',FontStyle : 'bold', align : 'center', stroke : '#000', strokeThickness : 5, wordWrap : true, wordWrapWidth : 800 ,textTransform : 'uppercase'})
        this.gameOverText.setOrigin(0, 0.5);
        this.score = this.add.text(630,350, 'Your score '+ this.point, {fontSize : '30px', fill : '#3C4043', fontFamily : 'Arial' ,fontStyle : 'bold',textTransform : 'uppercase'})

        this.startBtn = this.add.sprite(750, 450, 'restart').setInteractive().setScale(0.4);

        this.startBtn.on('pointerdown', function(){
            location.reload();
        }); 
    }


    update = function() {

    }
}