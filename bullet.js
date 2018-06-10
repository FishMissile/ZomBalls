function Bullet(layer){
    this.bxpos = xpos
    this.bypos = ypos;
    this.triggerPulled = false;
    this.updateCheck = true;
    this.angle = 0
    this.bulletMove = this.bxpos += 3
    this.state = "MoveState";

    layer.bullets.push(this);

    this.Draw = function () {
        push();
        translate(this.bxpos, this.bypos);
        noStroke()
        rotate(this.angle);
        fill(255);
        rect(30, 20, 20, 20);
        pop();
           
    
    }
    this.Update = function(){
        if (this.updateCheck){
           this[this.state]();
        }
    }
    this.Fire = function(){
        push();
        translate(xpos, ypos);
        noStroke()
        rotate(this.angle);
        fill(255);
        rect(10, 10, 10, 10);
        pop();
        console.log("bullet fired")
    }
    this.Update = function(){
        if (this.updateCheck){
           this[this.state]();
        }
    }
    this.MoveState = function(){
        this.angle = atan2(mouseY - this.ypos, mouseX - this.xpos);
        this.bxpos += 4
}
}