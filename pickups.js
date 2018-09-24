function MedSpawner() {
    var med = createSprite(random(100, width - 100), random(100, height - 100));
    var medImg = loadImage("img/med.png");
    med.addImage(medImg);
    med.debug = false;
    med.setCollider("rectangle", 0, 0, 20, 20);
    med.addToGroup(meds);

    meddespawn = setInterval(MedDespawn, 15000)
    function MedDespawn() {
        meds.removeSprites();
        clearInterval(meddespawn)
    }

}

function MedPickup(player1, med) {
    med.remove();
    playerHealth += 10
}

function SpeedBoostSpawner() {
    var speedboost = createSprite(random(100, width - 100), random(100, height - 100));
    var speedboostImg = loadImage("img/speedboost.png");
    speedboost.addImage(speedboostImg);
    speedboost.debug = false;
    speedboost.setCollider("rectangle", 0, 0, 20, 20);
    speedboost.addToGroup(speedboosts);
    speedboostdespawn = setInterval(SpeedBoostDespawn, 13000)
    function SpeedBoostDespawn() {
        speedboosts.removeSprites();
        clearInterval(speedboostdespawn)
    }


}

function SpeedBoostPickup(player1, speedboost) {
    speedboost.remove();
    player1.currentSpeed += 5;
    resetspeedboost = setInterval(ClearBoost, 12000)
    function ClearBoost() {
        player1.currentSpeed -= 5;
        clearInterval(resetspeedboost)
    }
}

//Spawns random SMGs
function MagnumSpawner() {
    var magnum = createSprite(
      random(100, width - 100),
      random(100, height - 100)
    );
    var magnumImg = loadImage("img/magnum.png");
    magnum.addImage(magnumImg);
    magnum.scale = 0.65;
    magnum.debug = false;
    magnum.setCollider("rectangle", 0, 0, 60, 40);
    magnum.addToGroup(magnums);
  
    magnumdespawn = setTimeout(Remover, 15000, magnum);

  }
  //Spawns random Magnums
  function GunSpawner() {
    var smg = createSprite(random(100, width - 100), random(100, height - 100));
    var smgImg = loadImage("img/smg.png");
    smg.addImage(smgImg);
    smg.debug = false;
    smg.setCollider("rectangle", 0, 0, 20, 20);
    smg.addToGroup(smgs);
  
    smgdespawn = setTimeout(Remover, 15000, smg);

  }
  //Spawns random Assault Rifles
  function ArSpawner() {
    var ar = createSprite(random(100, width - 100), random(100, height - 100));
    var arImg = loadImage("img/ar.png");
    ar.addImage(arImg);
    ar.scale = 0.65;
    ar.debug = false;
    ar.setCollider("rectangle", 0, 0, 60, 40);
    ar.addToGroup(ars);
  
    ardespawn = setTimeout(Remover, 15000, ar);

  }
  
  function GrenadeSpawner() {
    var grenadeitem = createSprite(
      random(100, width - 100),
      random(100, height - 100)
    );
    var grenadeimg = loadImage("img/grenade.png");
    grenadeitem.addImage(grenadeimg);
    grenadeitem.scale = 0.1;
    grenadeitem.debug = false;
    grenadeitem.setCollider("rectangle", 0, 0, 60, 40);
    grenadeitem.addToGroup(grenadeitems);
  
    grenadeitem = setTimeout(Remover, 15000, grenadeitem);
  
  }