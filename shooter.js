var bullets = [];
var smg;
var smgs = []
var smgbullets = [];
var smgbullet;
var gun;
var guns = [];
var magnums = [];
var magnumbullets = [];
var smgbulletinterval;
var smgloop;
var magnumloop

//Fires the pistol
function PistolFire() {
  var bullet = createSprite(player1.position.x, player1.position.y);

  bullet.draw = function () {
    fill(255, 255, 255);
    rotate(atan2(pmouseY - player1.position.y, pmouseX - player1.position.x));
    rect(0, 0, 5, 2)
  }

  bullet.setSpeed(10, player1.rotation - random(3, -3))
  bullet.debug = false;
  bullet.setCollider("rectangle", 0, 0, 5, 5);
  bullet.mass = 0;
  bullet.addToGroup(bullets);
  removeBullet();
  function removeBullet() {
    setTimeout(remover, 1000)
  }
  BulletCooldown()
  function BulletCooldown() {
    setTimeout(CoolIt, 200)
  }
  function remover() {
    bullet.remove()
  }
  function CoolIt() {
    pistolcooldown = 1;
  }
  return bullet;
}

//Fires the SMG
function SmgFire() {
  var smgbullet = createSprite(player1.position.x, player1.position.y);
  smgbullet.draw = function () {
    fill(255, 200, 200)
    ellipse(0, 0, 6, 6)
  }

  smgbullet.setSpeed(10, player1.rotation - random(10, -10));
  smgbullet.debug = false;
  smgbullet.setCollider("rectangle", 0, 0, 5, 5);
  smgbullet.mass = 0.1;
  smgbullet.addToGroup(smgbullets);
  removeBullet();

  function removeBullet() {
    setTimeout(remover, 2000)
  }
  BulletCooldown()
  function BulletCooldown() {
    setTimeout(CoolIt, 300)
  }
  function remover() {
    smgbullet.remove()
  }
  function CoolIt() {
    smgcooldown = 1;
  }
  return smgbullet;
}

//Fires the Magnum
function MagnumFire() {
  var magnumbullet = createSprite(player1.position.x, player1.position.y);
  magnumbullet.draw = function () {

    fill(255, 255, 255);
    rotate(atan2(pmouseY - player1.position.y, pmouseX - player1.position.x));
    rect(0, 0, 9, 6)

  }
  magnumbullet.setSpeed(10, player1.rotation - random(10, -10));
  magnumbullet.debug = false;
  magnumbullet.setCollider("rectangle", 0, 0, 10, 10);
  magnumbullet.mass = 7;
  magnumbullet.addToGroup(magnumbullets);
  removeBullet();
  function removeBullet() {
    setTimeout(remover, 1000)
  }
  BulletCooldown()
  function BulletCooldown() {
    setTimeout(CoolIt, 500)
  }
  function remover() {
    magnumbullet.remove()
  }
  function CoolIt() {
    magnumcooldown = 1;
  }
  return magnumbullet;
}

//Player walks on an SMG
function SmgPickup(player1, smg) {
  if (currentgun = 1) {
    clearInterval(smgloop)
  }
  currentgun = 1
  smg.remove();
  smgloop = setInterval(SmgLoop, 20000);

  //SMG runs out after 20 seconds
  function SmgLoop() {
    if (currentgun == 1) {
      currentgun = 0;
      clearInterval(smgloop)
      clearInterval(smgbulletinterval)
    }
  }
}
//Player walks on a Magnum
function MagnumPickup(player1, magnum) {
  if (currentgun = 3) {
    clearInterval(magnumloop)
  }
  currentgun = 3
  magnum.remove();
  clearInterval(smgbulletinterval)
  magnumloop = setInterval(MagnumLoop, 20000);

  //SMG runs out after 20 seconds
  function MagnumLoop() {
    if (currentgun == 3) {
      currentgun = 0;
      clearInterval(magnumloop)
    }
  }
}

//Spawns random SMGs
function MagnumSpawner() {
  var magnum = createSprite(random(100, 800), random(100, 500));
  var magnumImg = loadImage("img/magnum.png");
  magnum.addImage(magnumImg);
  magnum.scale = 0.65
  magnum.debug = false;
  magnum.setCollider("rectangle", 0, 0, 60, 40);
  magnum.addToGroup(magnums);

  magnumdespawn = setInterval(MagnumDespawn, 15000)
  function MagnumDespawn() {
    magnums.removeSprites();
    clearInterval(magnumdespawn)
  }
  return magnum;
}
//Spawns random Magnums
function GunSpawner() {
  var smg = createSprite(random(100, 800), random(100, 500));
  var smgImg = loadImage("img/smg.png");
  smg.addImage(smgImg);
  smg.debug = false;
  smg.setCollider("rectangle", 0, 0, 20, 20);
  smg.addToGroup(smgs);

  smgdespawn = setInterval(SmgDespawn, 15000)
  function SmgDespawn() {
    smgs.removeSprites();
    clearInterval(smgdespawn)
  }
  return smg;
}

//Check to see wich weapon is active before firing
var magnumcooldown = 1;
var pistolcooldown = 1;
var smgcooldown = 1;
window.addEventListener("contextmenu", function (e) { e.preventDefault(); })

function MouseControls() {

    mouseClicked = function () {
    switch (currentgun) {
      case 1:
          clearInterval(smgbulletinterval)
        break;
      default:
        clearInterval(smgbulletinterval)
    }
  }
  mousePressed = function () {
    switch (currentgun) {
      case 1:
       if (mouseButton == LEFT ){
        if (smgcooldown == 1) {
          smgcooldown = 0
          SmgFire();
        }
        smgbulletinterval = setInterval(SmgFire, 200)
      }
        break;
      case 0:
        if (pistolcooldown == 1) {
          pistolcooldown = 0
          PistolFire();
        }
        break;
      case 3:
        if (magnumcooldown == 1) {
          magnumcooldown = 0
          MagnumFire();
        }
        break;
      default:
        clearInterval(smgbulletinterval)

    }

  }



  mouseReleased = function () {
    switch (currentgun) {
      case 1:
        clearInterval(smgbulletinterval)
        clearInterval(smgbulletinterval)
        clearInterval(smgbulletinterval)
        break;
      default:
        clearInterval(smgbulletinterval)
    }
    //Clear bullet intervals to stop firing
    mouseReleased = function () {
      switch (currentgun) {
        case 1:
          clearInterval(smgbulletinterval)
          clearInterval(smgbulletinterval)
          clearInterval(smgbulletinterval)
          break;
        default:
          clearInterval(smgbulletinterval)

      }

    }

  }
};




