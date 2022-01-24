function myGame(){

    let config = {
        width : window.innerWidth,
        height : window.innerHeight,
        type : Phaser.AUTO,
        parent : 'phaser-game',
        scene : [SceneMain],
    }

    let game = new Phaser.Game(config);
}


window.onload = function(){
    // call for init
    init();
    // bring the game   
    setTimeout(() => {
        myGame();
    },3000)
}


