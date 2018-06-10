var gunloop;
var interval;
var interval2;
var interval3;
var interval4;
var interval5;
var interval6;
var magnumspawnloop;
var medloop;
var magnumspawnloop;
var speedboostloop;
var phase;

//Trigger Game Over scene
function GameOver() {
    if (playerHealth < 1) {
        clearInterval(interval)
        clearInterval(interval2)
        clearInterval(interval3)
        clearInterval(interval4)
        clearInterval(interval5)
        clearInterval(interval6)
        clearInterval(gunloop)
        clearInterval(medloop)
        clearInterval(speedboostloop)
        clearInterval(arspawnloop)
        clearInterval(magnumspawnloop)
        mgr.showScene(Outro);
    }
}

//Loops beginning a new game
function BeginLoop() {
    //Begin zed spawning loop
    interval = setInterval(Looper, 2500);
    //Begin spawning SMGs
    gunloop = setInterval(GunSpawner, random(23000, 33000))
    phase = 1;
}


//Loops for increasing zed spawns and gun spawners

function Looper() {
    if (counter > 10) {
        //end phase 1
        clearInterval(interval)
        //begin phase 2
        interval2 = setInterval(Looper2, 2300);
        phase = 2;
    }
    SpawnZed()
    counter++
}

function Looper2() {
    if (counter > 20) {
        //end phase 2
        clearInterval(interval2)
        //begin phase 3
        interval3 = setInterval(Looper3, 1950);
        magnumspawnloop = setInterval(MagnumSpawner, random(27000, 35000));
        phase = 3;
    }
    SpawnZed()
    counter++
}

function Looper3() {
    if (counter > 40) {
        //end phase 3
        clearInterval(interval3)
        //begin phase 4
        speedboostloop = setInterval(SpeedBoostSpawner, random(40000, 55000))
        interval4 = setInterval(Looper4, 1600);
        phase = 4;
    }
    SpawnZed()
    counter++
}
function Looper4() {
    if (counter > 60) {
        //end phae 4
        clearInterval(interval4)
        //begin phase 5
        interval5 = setInterval(Looper5, 1400);
        medloop = setInterval(MedSpawner, random(36000, 45000))
        
        phase = 5;
    }
    SpawnZed()
    counter++
}
function Looper5() {
    //phase 5
    if (counter > 85) {
        //end phae 4
        clearInterval(interval5)
        //begin phase 5
        interval6 = setInterval(Looper6, 1100);
        arspawnloop = setInterval(ArSpawner, random(35000, 40000))
        phase = 6;
    }
    SpawnZed()
    counter++
}

function Looper6() {
    //phase 6
    SpawnZed()
    counter++
}

//Handle tab switching
function PauseControl(){
window.onblur = function () {
    if (phase == 1) {
        clearInterval(interval)
    }
    if (phase == 2) {
        clearInterval(interval2)
    }
    if (phase == 3) {
        clearInterval(interval3)
    }
    if (phase == 4) {
        clearInterval(interval4)
        clearInterval(speedboostloop)
    }
    if (phase == 5) {
        clearInterval(interval5)
        clearInterval(medloop)
        clearInterval(speedboostloop)
        clearInterval(magnumspawnloop)
    }
    if (phase == 6) {
        clearInterval(interval5)
        clearInterval(medloop)
        clearInterval(speedboostloop)
        clearInterval(magnumspawnloop)
        clearInterval(arspawnloop)

    }
    clearInterval(gunloop)

}
window.onfocus = function () {
    if (phase == 1) {
        interval = setInterval(Looper, 2500);
    }
    if (phase == 2) {
        interval2 = setInterval(Looper2, 2300);
    }
    if (phase == 3) {
        magnumspawnloop = setInterval(MagnumSpawner, random(27000, 35000));
        interval3 = setInterval(Looper3, 1950);
    }
    if (phase == 4) {
        magnumspawnloop = setInterval(MagnumSpawner, random(27000, 35000));
        interval4 = setInterval(Looper4, 1600);
        speedboostloop = setInterval(SpeedBoostSpawner, random(36000, 55000))
    }
    if (phase == 5) {
        magnumspawnloop = setInterval(MagnumSpawner, random(27000, 35000));
        interval5 = setInterval(Looper5, 1400);
        medloop = setInterval(MedSpawner, random(36000, 50000))
        speedboostloop = setInterval(SpeedBoostSpawner, random(36000, 55000))
        
    }
    if (phase == 6) {
        magnumspawnloop = setInterval(MagnumSpawner, random(27000, 35000));
        interval5 = setInterval(Looper5, 1200);
        medloop = setInterval(MedSpawner, random(36000, 50000))
        speedboostloop = setInterval(SpeedBoostSpawner, random(36000, 55000))
        arspawnloop = setInterval(ArSpawner, random(35000, 40000))
    }

    gunloop = setInterval(GunSpawner, random(23000, 33000))
}
}