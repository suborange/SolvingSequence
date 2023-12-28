for (let i =0; i < 4; i++) {
    var s1 = function( sketch ) {
      sketch.setup = function() {
        let canvas1 = sketch.createCanvas(100, 100, sketch.WEBGL);
        if ( i <2){
        canvas1.position(0 + (i*105),0);}
        else if (i==2) {
          let j = i-2;
          let k=i-1;
          canvas1.position(0 + (j*105),0 + (k*105));
        }
        else {
          let j = i-2;
          canvas1.position(0 + (j*105),0 + (j*105));
        }
      }
      sketch.draw = function() {
        //for canvas 1
        sketch.background(100);
        sketch.rotateX((sketch.frameCount+i*20) * 0.01);
        sketch.rotateZ((sketch.frameCount+i*20) * 0.01);
        sketch.cone(30, 50);
      }
    };
      // create a new instance of p5 and pass in the function for sketch 1
    new p5(s1);
    }
    
    
    
    // var s2 = function( sketch ) {
    
    //    sketch.setup = function() {
    //     let canvas2 = sketch.createCanvas(100, 100, sketch.WEBGL);
    //     canvas2.position(100,0);
    //   }
    //   sketch.draw = function() {
    //     //for canvas 2
    //     sketch.background(100);
    //     sketch.rotateX(sketch.frameCount * 0.01);
    //     sketch.rotateZ(sketch.frameCount * 0.02);
    //     sketch.cone(30, 50);
    //   }
    // };
    
    // // create the second instance of p5 and pass in the function for sketch 2
    // new p5(s1);