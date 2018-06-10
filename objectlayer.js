function ObjectLayer(){
    this.children = [];
    this.enemies = [];
    this.bullets = [];
    this.Draw = function(){
    //    for (var i = 0;i < this.children.length; i++){
     //       this.children[i].Draw();
     //       
      //  }
        for (var i = 0;i < this.bullets.length; i++){
            this.bullets[i].Draw();
            
        }
        for (var i = 0;i < this.enemies.length; i++){
            
        }
    }
    this.Update = function(){
        for (var i = 0;i < this.children.length; i++){
            this.children[i].Update();
        }
    }
    this.LateUpdate = function(){
        for (var i = 0;i < this.enemies.length; i++){
        }
    }
}