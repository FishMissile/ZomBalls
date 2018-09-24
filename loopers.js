var gunloop;
var spawninterval;
var magnumspawnloop;
var medloop;
var magnumspawnloop;
var speedboostloop;
var arspawnloop;
var grenadeloop;
var phase = 1;
var spawntiming = 2500;
var smgtime;
var speedtime;
var magnumtime;
var medtime;
var grenadetime;
var artime;

function MainLoop() {
  spawninterval = setInterval(IntervalSpawner, spawntiming);
}

var Countdown = (time)=>{
    if (time = smgtime){
        console.log("yuuup")
    }
    time -= 1000
}

function IntervalSpawner() {
    smgtime = random(21000,32000)
    speedtime = random(40000, 55000)
    magnumtime = random(27000, 35000)
    medtime = random(47000, 56000)
    grenadetime = random(25000, 36000)
    artime = random(40000, 45000)

    console.log("Spawn Tick: " + spawntiming);
    counter++; //count every spawn tick
    SpawnZed();
    if (counter >= 10 && counter < 20) {
      if (counter == 10) {
        phase = 2; //set next phase
        clearInterval(spawninterval); //Stop previous wave

        smgcountdown = setInterval(Countdown, 1000, smgtime)

        spawntiming = 1900; //Set zed spawn interval timing
        spawninterval = setInterval(IntervalSpawner, spawntiming); //start new spawn loop for next phase
      }
    }
    if (counter >= 20 && counter < 50) {
      if (counter == 20) {
        phase = 3;
        clearInterval(spawninterval);
        gunloop = setInterval(GunSpawner, smgtime);
        
        spawntiming = 1700;
        spawninterval = setInterval(IntervalSpawner, spawntiming);
      }
    }
    if (counter >= 50 && counter < 70) {
      if (random() < 0.1) {
        SpawnBigZed();
      }
      if (counter == 50) {
        phase = 4;
        clearInterval(spawninterval);
        speedboostloop = setInterval(SpeedBoostSpawner, speedtime);
        spawntiming = 2200;
        spawninterval = setInterval(IntervalSpawner, spawntiming);
      }
    }
    if (counter >= 70 && counter < 100) {
      if (random() < 0.3) {
        SpawnBigZed();
      }
      if (counter == 70) {
        phase = 5;
        clearInterval(spawninterval);
        magnumspawnloop = setInterval(MagnumSpawner, magnumtime);
        spawntiming = 2250;
        spawninterval = setInterval(IntervalSpawner, spawntiming);
      }
    }
    if (counter >= 100 && counter < 130) {
      if (random() < 0.4) {
        SpawnBigZed();
      }
      if (counter == 100) {
        phase = 6;
        clearInterval(spawninterval);
        medloop = setInterval(MedSpawner, medtime);
        grenadeloop = setInterval(GrenadeSpawner, grenadetime);
        spawntiming = 2200;
        spawninterval = setInterval(IntervalSpawner, spawntiming);
      }
    }
    if (counter >= 130) {
      if (random() < 0.8) {
        SpawnBigZed();
      }
      if (counter == 130) {
        arspawnloop = setInterval(ArSpawner, artime);
        phase = 7;
        clearInterval(spawninterval);

        spawntiming = 2200;
        spawninterval = setInterval(IntervalSpawner, spawntiming);
      }
    }
  }
//Trigger Game Over scene
function GameOver() {
  if (playerHealth < 1) {
    phase = 1;
    clearInterval(spawninterval);
    clearInterval(gunloop);
    clearInterval(medloop);
    clearInterval(speedboostloop);
    clearInterval(arspawnloop);
    clearInterval(magnumspawnloop);
    clearInterval(grenadeloop);
    mgr.showScene(Outro);
  }
}

//Handle tab switching
function PauseControl() {
  window.onblur = function() {
    if (phase == 1) {
      clearInterval(spawninterval);
      clearInterval(gunloop);
      clearInterval(grenadeloop);
    }
    if (phase == 2) {
      clearInterval(spawninterval);
      clearInterval(gunloop);
      clearInterval(grenadeloop);
    }
    if (phase == 3) {
      clearInterval(spawninterval);
      clearInterval(gunloop);
      clearInterval(grenadeloop);
    }
    if (phase == 4) {
      clearInterval(spawninterval);
      clearInterval(speedboostloop);
      clearInterval(gunloop);
      clearInterval(grenadeloop);
    }
    if (phase == 5) {
      clearInterval(spawninterval);
      clearInterval(medloop);
      clearInterval(speedboostloop);
      clearInterval(magnumspawnloop);
      clearInterval(gunloop);
      clearInterval(grenadeloop);
    }
    if (phase == 6) {
      clearInterval(spawninterval);
      clearInterval(medloop);
      clearInterval(speedboostloop);
      clearInterval(magnumspawnloop);
      clearInterval(arspawnloop);
      clearInterval(gunloop);
      clearInterval(grenadeloop);
    }
    if (phase == 7) {
      clearInterval(spawninterval);
      clearInterval(medloop);
      clearInterval(speedboostloop);
      clearInterval(magnumspawnloop);
      clearInterval(arspawnloop);
      clearInterval(gunloop);
      clearInterval(grenadeloop);
    }
  };
  window.onfocus = function() {
    if (phase == 1) {
      spawninterval = setInterval(IntervalSpawner, spawntiming);
      gunloop = setInterval(GunSpawner, random(23000, 33000));
      grenadeloop = setInterval(GrenadeSpawner, random(23000, 33000));
    }
    if (phase == 2) {
      spawninterval = setInterval(IntervalSpawner, spawntiming);
      gunloop = setInterval(GunSpawner, random(23000, 33000));
      grenadeloop = setInterval(GrenadeSpawner, random(23000, 33000));
    }
    if (phase == 3) {
      spawninterval = setInterval(IntervalSpawner, spawntiming);
      magnumspawnloop = setInterval(MagnumSpawner, random(27000, 35000));
      gunloop = setInterval(GunSpawner, random(23000, 33000));
      grenadeloop = setInterval(GrenadeSpawner, random(23000, 33000));
    }
    if (phase == 4) {
      spawninterval = setInterval(IntervalSpawner, spawntiming);
      magnumspawnloop = setInterval(MagnumSpawner, random(27000, 35000));
      gunloop = setInterval(GunSpawner, random(23000, 33000));
      grenadeloop = setInterval(GrenadeSpawner, random(23000, 33000));
      speedboostloop = setInterval(SpeedBoostSpawner, random(36000, 55000));
    }
    if (phase == 5) {
      spawninterval = setInterval(IntervalSpawner, spawntiming);
      magnumspawnloop = setInterval(MagnumSpawner, random(27000, 35000));
      gunloop = setInterval(GunSpawner, random(23000, 33000));
      grenadeloop = setInterval(GrenadeSpawner, random(23000, 33000));
      medloop = setInterval(MedSpawner, random(36000, 50000));
      speedboostloop = setInterval(SpeedBoostSpawner, random(36000, 55000));
    }
    if (phase == 6) {
      spawninterval = setInterval(IntervalSpawner, spawntiming);
      magnumspawnloop = setInterval(MagnumSpawner, random(27000, 35000));
      gunloop = setInterval(GunSpawner, random(23000, 33000));
      grenadeloop = setInterval(GrenadeSpawner, random(23000, 33000));
      medloop = setInterval(MedSpawner, random(36000, 50000));
      speedboostloop = setInterval(SpeedBoostSpawner, random(36000, 55000));
      arspawnloop = setInterval(ArSpawner, random(35000, 40000));
    }
    if (phase == 7) {
      spawninterval = setInterval(IntervalSpawner, spawntiming);
      magnumspawnloop = setInterval(MagnumSpawner, random(27000, 35000));
      gunloop = setInterval(GunSpawner, random(23000, 33000));
      grenadeloop = setInterval(GrenadeSpawner, random(23000, 33000));
      medloop = setInterval(MedSpawner, random(36000, 50000));
      speedboostloop = setInterval(SpeedBoostSpawner, random(36000, 55000));
      arspawnloop = setInterval(ArSpawner, random(35000, 40000));
    }
  };
}
