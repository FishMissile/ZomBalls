var player1;

function SpawnPlayer() {
    player1 = createSprite(width /2, height /2 - 100);
    var zombieImg = loadImage("img/zombie2.png");
    player1.addImage(survivorImg);
    player1.debug = false;
    player1.friction = 0.1
    player1.maxSpeed = player1.currentSpeed
    player1.currentSpeed = 2.2;
    player1.setCollider("circle", 0, 0, 25);
    player1.position.y = constrain(player1.position.y, 20, height - 20)
    player1.position.x = constrain(player1.position.x, 20, width - 20)
    player1.mass = 500;
    player1.addToGroup(player1)
    return player;
}

function PlayerUpdate() {
    //rotate player to mouse

    player1.rotation = atan2(pmouseY - player1.position.y, pmouseX - player1.position.x) * 180 / Math.PI;;
    //block players walls of canvas
    if (player1.position.x > width - 30)
        player1.position.x = width - 30;
    if (player1.position.y > height - 30)
        player1.position.y = height - 30;
    if (player1.position.x < 30)
        player1.position.x = 30;
    if (player1.position.y < 30)
        player1.position.y = 30;

    zeds.bounce(zeds)
    zeds.displace(player1)
    zeds.bounce(bullets, BulletHit)
    smgbullets.bounce(zeds, SmgHit)
    zeds.bounce(magnumbullets, MagnumHit)
    arbullets.bounce(zeds, ArHit)
    player1.collide(smgs, SmgPickup)
    player1.collide(magnums, MagnumPickup)
    player1.collide(ars, ArPickup)
    player1.collide(meds, MedPickup)
    player1.collide(speedboosts, SpeedBoostPickup)
   // player1.overlap(guns, GunSwitch)

}
//Keyboard controls for WASD
function Controls() {
    if (keyIsDown(87)) {
        //move up
        player1.addSpeed(.6, 270);
    } if (keyIsDown(83)) {
        //move down
        player1.addSpeed(.6, 90);
    } if (keyIsDown(65)) {
        //move right
        player1.addSpeed(.6, 180);
    } if (keyIsDown(68)) {
        //move left
        player1.addSpeed(.6, 0);
    }
  
}
//Handle the HealthBar and Hud
function Hud() {
    fill(200, 200, 255);
    stroke(10)
    switch (currentgun) {
        case 1:
            push();
            scale(.75);
            image(smgImg, 20, 85);
            pop();
            break;
        case 0:
            break;
        case 3:
            push();
            scale(.5);
            image(magnumImg, 20, 130);
            pop();
            break;
        case 4:
            push();
            scale(.7);
            image(arImg, 20, 130);
            pop();
            break;
        default:
    }
}
function HandleHealthbar() {
    if (playerHealth > 0) {
        if (contact === true) {
            push()
            fill(255, 0, 0);
            text(Math.round(playerHealth), 30, 30);
            pop()
        } else {
            push()
            fill(200, 200, 255);            
            text(Math.round(playerHealth), 30, 30);
            pop()
        }
    }

}


