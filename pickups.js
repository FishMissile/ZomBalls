var med;
var meds = [];
function MedSpawner() {
    var med = createSprite(random(100, 900), random(100, 600));
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
    return med;
}

function MedPickup(player1, med) {
    med.remove();
    playerHealth += 10
}

var speedboost;
var speedboosts = [];

function SpeedBoostSpawner() {
    var speedboost = createSprite(random(100, 900), random(100, 600));
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

    return speedboost;
}

function SpeedBoostPickup(player1, speedboost) {
    speedboost.remove();
    player1.currentSpeed += 5;
    resetspeedboost = setInterval(ClearBoost, 9000)
    function ClearBoost() {
        player1.currentSpeed -= 5;
        clearInterval(resetspeedboost)
    }
}