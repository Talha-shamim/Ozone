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
    let start_btn = document.getElementById("start_btn")
    let initial_screen = document.getElementById("initial_screen")

    // call for init
    init();

    start_btn.addEventListener('click' , function(){
        initial_screen.remove();
        myGame();
    })
    
    // setTimeout(() => {
    // },3000)
}


