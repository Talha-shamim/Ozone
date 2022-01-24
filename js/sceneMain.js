class SceneMain extends Phaser.Scene{
    constructor(){
        super("SceneMain")
    }

    preload = function() {
        this.load.image("player",'../assets/player.png');
    }
    
    create = function() {
        var text = this.add.text(390,200,"Work in progress...",{fontSize:'32px'});
        this.player = this.add.image(200,200,"player");
        this.player.displayHeight = 110;
        this.player.displayWidth = 110;
    }
    
    update = function() {
        
    }
}
