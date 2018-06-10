var gunloop;
var interval;
var interval2;
var interval3;
var interval4;
var interval5;
var magnumspawnloop;
var medloop;
var magnumspawnloop;
var speedboostloop;

//Trigger Game Over scene
function GameOver() {
    if (playerHealth < 1) {
        clearInterval(interval)
        clearInterval(interval2)
        clearInterval(interval3)
        clearInterval(interval4)
        clearInterval(interval5)
        clearInterval(gunloop)
        clearInterval(medloop)
        clearInterval(speedboostloop)
        clearInterval(magnumspawnloop)
        mgr.showScene(Outro);
    }
}

//Loops begining a new game
function BeginLoop() {
    interval = setInterval(Looper, 2500);
    gunloop = setInterval(GunSpawner, random(23000, 33000))
}


//Loops for increasing zed spawns and gun spawners

function Looper() {
    if (counter > 10) {
        clearInterval(interval)
        interval2 = setInterval(Looper2, 2300);
    }
    SpawnZed()
    counter++
}

function Looper2() {
    if (counter > 20) {
        clearInterval(interval2)
        interval3 = setInterval(Looper3, 1950);
        magnumspawnloop = setInterval(MagnumSpawner, random(27000, 35000));
    }
    SpawnZed()
    counter++
}

function Looper3() {
    if (counter > 40) {
        clearInterval(interval3)
        interval4 = setInterval(Looper4, 1600);
    }
    SpawnZed()
    counter++
}
function Looper4() {
    if (counter > 60) {
        clearInterval(interval4)
        interval5 = setInterval(Looper5, 950);
        medloop = setInterval(MedSpawner, random(36000, 50000))
        speedboostloop = setInterval(SpeedBoostSpawner, random(36000, 55000))
    }
    SpawnZed()
    counter++
}
function Looper5() {
    SpawnZed()
    counter++
}
