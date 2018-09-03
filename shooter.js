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
var arbulletinterval;
var smgloop;
var magnumloop;
var arloop;
var ars = [];
var arbullets = [];
var magnumcooldown = 1;
var pistolcooldown = 1;
var smgcooldown = 1;
var arcooldown = 1;
window.addEventListener("contextmenu", function (e) { e.preventDefault(); })

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
    //remove bullet after 1 second
    setTimeout(remover, 1000)
  }
  BulletCooldown()
  function BulletCooldown() {
    //Prevent auto-clicking
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
    //Remove bullet after 2 seconds
    setTimeout(remover, 2000)
  }
  BulletCooldown()
  function BulletCooldown() {
    //prevent auto-clicking
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

function ArFire() {
  var arbullet = createSprite(player1.position.x, player1.position.y);
  arbullet.draw = function () {
    fill(255, 255, 255);
    rotate(atan2(pmouseY - player1.position.y, pmouseX - player1.position.x));
    rect(0, 0, 5, 2)
  }

  arbullet.setSpeed(10, player1.rotation - random(5, -5));
  arbullet.debug = false;
  arbullet.setCollider("rectangle", 0, 0, 5, 5);
  arbullet.mass = 0.1;
  arbullet.addToGroup(arbullets);
  removeBullet();

  function removeBullet() {
    setTimeout(remover, 2000)
  }
  BulletCooldown()
  function BulletCooldown() {
    setTimeout(CoolIt, 300)
  }
  function remover() {
    arbullet.remove()
  }
  function CoolIt() {
    arcooldown = 1;
  }
  return arbullet;
}
//Player walks on an SMG
function SmgPickup(player1, smg) {
  if (currentgun = 1) {
    clearInterval(smgloop)
  }
  currentgun = 1
  smg.remove();
  smgloop = setInterval(SmgLoop, 20000);
  clearInterval(arbulletinterval)
}
//Player walks on a Magnum
function MagnumPickup(player1, magnum) {
  if (currentgun = 3) {
    clearInterval(magnumloop)
  }
  currentgun = 3
  magnum.remove();
  clearInterval(smgbulletinterval)
  clearInterval(arbulletinterval)
  magnumloop = setInterval(MagnumLoop, 20000);
}
//Player walks on an AssaultRifle
function ArPickup(player1, ar) {
  if (currentgun = 4) {
    clearInterval(arloop)
  }
  currentgun = 4
  ar.remove();
  arloop = setInterval(ArLoop, 20000);
  clearInterval(smgbulletinterval)
}

//SMG runs out after 20 seconds
function SmgLoop() {
  if (currentgun == 1) {
    currentgun = 0;
    clearInterval(smgloop)
    clearInterval(smgbulletinterval)
  }
}

//Magnum runs out after 20 seconds
function MagnumLoop() {
  if (currentgun == 3) {
    currentgun = 0;
    clearInterval(magnumloop)
  }
}
//SMG runs out after 20 seconds
function ArLoop() {
  if (currentgun == 4) {
    currentgun = 0;
    clearInterval(arloop)
    clearInterval(arbulletinterval)
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
//Spawns random Assault Rifles
function ArSpawner() {
  var ar = createSprite(random(100, 800), random(100, 500));
  var arImg = loadImage("img/ar.png");
  ar.addImage(arImg);
  ar.scale = 0.65
  ar.debug = false;
  ar.setCollider("rectangle", 0, 0, 60, 40);
  ar.addToGroup(ars);

  ardespawn = setInterval(ArDespawn, 15000)
  function ArDespawn() {
    ars.removeSprites();
    clearInterval(ardespawn)
  }
  return ar;
}
//Check to see wich weapon is active before firing

function MouseControls() {

  mouseClicked = function () {
    switch (currentgun) {
      case 1:
        clearInterval(smgbulletinterval)
        clearInterval(arbulletinterval)
        break;
      default:
        clearInterval(smgbulletinterval)
        clearInterval(arbulletinterval)
    }
  }
  mousePressed = function () {
    switch (currentgun) {
      case 1:
        if (mouseButton == LEFT) {
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
      case 4:
        if (mouseButton == LEFT) {
          if (arcooldown == 1) {
            arcooldown = 0
            ArFire();
          }
          arbulletinterval = setInterval(ArFire, 100)
        }
        break;
      default:
        clearInterval(smgbulletinterval)
        clearInterval(arbulletinterval)
    }

  }



  mouseReleased = function () {
    switch (currentgun) {
      case 1:
        clearInterval(smgbulletinterval)
        break;
      case 4:
        clearInterval(arbulletinterval)
        break;
      default:
        clearInterval(smgbulletinterval)
    }
    //Clear bullet intervals to stop firing
    mouseReleased = function () {
      switch (currentgun) {
        case 1:
          clearInterval(smgbulletinterval)
          break;
        case 4:
          clearInterval(arbulletinterval)
          break;
        default:
          clearInterval(smgbulletinterval)
          clearInterval(arbulletinterval)
      }

    }

  }
};




