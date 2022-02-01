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

function isValidUsername(name) {
    if(name === "" || name === undefined || name === null || name.includes(" "))
        return false
    return true
}

window.onload = function(){
    let start_btn = document.getElementById("start_btn")
    let initial_screen = document.getElementById("initial_screen")
    let guide1 = document.getElementById("guide1");
    let guide2 = document.getElementById("guide2");
    let msg = document.getElementById("msg");
    let wizard = document.getElementById("wizard");
    let arrow = document.getElementById("arrow");
    let startGame = document.getElementById("startGame");

    let username_warning_msg = document.getElementById("username-warning-msg");
    username_warning_msg.style.display = "none";

    // // call for init    
    init();

    // //start the game
    start_btn.addEventListener('click' , function(event) {
        event.preventDefault()
        const username = document.getElementById("username").value
        console.log(username)
        if(isValidUsername(username)) {
            username_warning_msg.style.display = "none";
            initial_screen.remove();
            myGame();
        }
        else {
            username_warning_msg.style.display = "block";
        }
    })

    let one = true;
    let two = true;

    arrow.addEventListener('click', function(){
        if(one){
            one = false;
            guide1.remove();
            guide2.style.display = "block"
        }
        else if(two){
            two = false;
            guide2.remove();
            rules.style.display = "block";
        }

        else{
            rules.remove();
            wizard.remove();
            startGame.style.display = "block";
            arrow.remove();
        }
    })
}


