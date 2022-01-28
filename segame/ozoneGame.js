var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var game = new Phaser.Game(config);
var player, cursors, gases,laser,factory;
function preload()
{
    game.load.image('factory', 'assets/images/factory.jpg');
    game.load.image('player', 'assets/images/player.png');
    game.load.image('laser', 'assets/images/laser.png');

}
function create()
{
    factory=game.image.add(400,300,'factory');
    player=game.physics.add.image(400, 300, 'player').setScale(0.15).setOrigin(0.5, 0);
    player.setCollideWorldBounds(true);
    cursors = game.input.keyboard.createCursorKeys();
    // this.input.on('pointerdown',shoot,this)

}
function shoot()
{
    laser=game.physics.add.image(player.x,player.y,'laser').setScale(0.15).setOrigin(0.5, 0);
    laser.setVelocityX(0);
    laser.setVelocityY(-300);
}
function update()
{
    if (cursors.left.isDown)
    {
        player.setVelocityX(-150);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(150);
    }
    else
    {
        player.setVelocityX(0);
    }
    if (cursors.up.isDown) {
        player.setVelocityX(-150);
    }
    else if (cursors.down.isDown) {
        player.setVelocityX(150);
    }
    else {
        player.setVelocityX(0);
    }

}