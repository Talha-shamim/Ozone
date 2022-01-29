function myGame(){
    let config = {
        type : Phaser.AUTO,
        width : window.innerWidth,
        height : window.innerHeight,
        backgroundColor : 0x96DED1,
        physics : {
            default : 'arcade',
        },
        parent : 'phaser-game',
        pixelArt : true,
        scene : [SceneMain, GameOver],
    }

    let game = new Phaser.Game(config);
}


window.onload = function(){
    let start_btn = document.getElementById("start_btn")
    let initial_screen = document.getElementById("initial_screen")
    
    // // call for init    
    init();

    // //start the game
    start_btn.addEventListener('click' , function(){
        initial_screen.remove();
        myGame();
    })
}


