class SceneMain extends Phaser.Scene{
    constructor(){
        super("SceneMain")
    }

    preload = function() {

    }
    
    create = function() {
        var text = this.add.text(550,200,"Start the Game",{fontSize:'32px'});
        
    }
    
    update = function() {
        
    }
}
