function init(){
    // starting animation
    var canvas = document.getElementById("myCanvas");
    var phaser_game = document.getElementById("phaser-game");
    H = 700;
    W = 1200;
    canvas.width = W;
    canvas.height = H;
    var img = document.createElement("img");
    img.src = "./assets/image/start_animation.gif";
    img.className = "animation"
    var src = document.getElementById("myCanvas");
    src.appendChild(img);

    // remove the animation
    setTimeout(() => {
        canvas.remove();
    },2950)

}