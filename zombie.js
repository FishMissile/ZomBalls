//Spawns a random zombie
var zeds = [];

function SpawnZed() {
  //   Border zones

  // function CreateSprite(){
  var top = { x: random(-100, width + 100), y: random(-100, 0) }
  var left = { x: random(-100, 0), y: random(-100, height + 100) }
  var right = { x: random(width, width + 100), y: random(-100, height + 100) }
  var bottom = { x: random(-100, width + 100), y: random(height, height + 100) }

  var spots = [top, bottom, left, right]

  //  return random(spawn)
  // }
  var zed = createSprite(random(spots).x, random(spots).y)
  var zombieImg = loadImage("img/zombie2.png");

  zed.addImage(zombieImg);
  zed.debug = false;
  zed.setCollider("circle", 0, 0, 20);
  zed.maxSpeed = random(0.5, 2.5);
  zed.normalSpeed = zed.maxSpeed;
  zed.health = random(80, 150);
  zed.immovable = false;
  zed.mass = 1;

  zed.addToGroup(zeds)
  return zed;
}

//Zombie moves towards the player
function Attack() {
  for (i = 0; i < zeds.length; i++) {

    zeds[i].attractionPoint(random(.05, .5), player1.position.x, player1.position.y);
    zeds[i].rotateToDirection = true;

  }
}

//Zombie is hit by an SMG
function SmgHit(smgbullet, zed) {
  zed.health -= 20
  smgbullet.remove();
  if (zed.health < 1) {
    zed.remove();
  }
}
//Zombie is hit by a pistol
function BulletHit(zed, bullet) {
  zed.health -= 20
  bullet.remove();
  if (zed.health < 1) {
    zed.remove();
  }
}
//Zombie is hit by a Magnum
function MagnumHit(zed, magnumbullet) {
  zed.health -= 80
  magnumbullet.remove();
  if (zed.health < 1) {
    zed.remove();
  }
}
//Zombie is hit by an Assault Rifle
function ArHit(arbullet, zed) {
  zed.health -= 20
  arbullet.remove();
  if (zed.health < 1) {
    zed.remove();
  }
}
//zombie contacts a player
function HitDetection() {
  for (i = 0; i < zeds.length; i++) {
    if (player1.position.x - zeds[i].position.x <= 55 && player1.position.y - zeds[i].position.y <= 55 && player1.position.x - zeds[i].position.x >= -55 && player1.position.y - zeds[i].position.y >= -55) {
      player1.maxSpeed = 0.1
      playerHealth -= .07;
      zeds[i].maxSpeed = 0.1;
      contact = true;
    } else {
      player1.maxSpeed = player1.currentSpeed;
      zeds[i].maxSpeed = zeds[i].normalSpeed
      contact = false;
    }
  }
}