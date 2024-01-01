// get random digits to relate to the random scramble moves? or have a certain scramble?

// test WR - STATIC CONST: D U F2 L2 U' B2 F2 D L2 U R' F' D R' F' U L D' F' D R2
const wr_scramble = [3, -1, 2, 6, 6, 5, 5, 2, 7, 7, 6, 6, -1, 3, 5, 5, -1, 2, 10, 4, 10, 6, -1, 3, 10, 4, 10, 6, -1, 2, 5, 3, 10, 6, -1, 3, 4, 4];


var random_digits = [];
for (let iran = 0; iran < 1; iran++) {
    var r = Math.floor(Math.random() * (9) + 1);
    if (r != random_digits[iran - 1] && r != random_digits[iran - 2]) { // if not duplicate to last number
        random_digits.push(r);
    }
}
// random_digits = wr_scramble;
console.log("random: ", random_digits);




// setup for the vectors and 3d array(matrix)
let dim;
let cube;
let move;
let moves = [];
let bool = true;
let start = 3;
let curr_pit;
// let end = 1;
let is_solving = true;  // start as solving
let prev_pit = 0;
let repeat = false;
let scramble = true;
let cam1;
let cam2;

// CONSTANTS 
const BACK = -1;
const FRONT = 1;
const LEFT = -1;
const RIGHT = 1;
const UP = -1;
const DOWN = 1;
const S_SLICE = 0;
const M_SLICE = 0;
const E_SLICE = 0;
const CLOCKWISE = 1;
const COUNTER_CLOCKWISE = -1;
const X_PLANE = 0;
const Y_PLANE = 1;
const Z_PLANE = 2;


// GET PI NUMBERS 
let get_pits = '---314';
// 314159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460

// start = 3;
// end = 4;

// document.querySelector('#digit_queue').innerHTML = `| ${get_pits.substring(start - 3, end - 3)} | ${get_pits.substring(start - 2, end - 2)} | ${get_pits.substring(start - 1, end - 1)} | ${get_pits.substring(start, end)} | ${get_pits.substring(start + 1, end + 1)} | ${get_pits.substring(start + 2, end + 2)} | ${get_pits.substring(start + 3, end + 3)} |`;

// FUNCTIONS
function displayPi(start, end) {
    // find the pi digit, and adjust it as it runs. 
    // console.log("start: ", start, " | end: ", end);
    document.querySelector("#curr_digit").innerHTML = `${start - 2}`;
    document.querySelector('#digit_queue').innerHTML = `| ${get_pits.substring(start - 3, end - 3)} | ${get_pits.substring(start - 2, end - 2)} | ${get_pits.substring(start - 1, end - 1)} | <span class="current">${get_pits.substring(start, end)}</span> | ${get_pits.substring(start + 1, end + 1)} | ${get_pits.substring(start + 2, end + 2)} | ${get_pits.substring(start + 3, end + 3)} |`;


}


// SETUP AND DRAW
// CREATE FACE AND CUBIE CLASSES TO DRAW
// CREATE TURNING FUNCTIONS FOR EACH FACE

const canvas_id = ['canvastl', 'canvastr', 'canvasbl', 'canvasbr'];
const scramble_id = ['scramble1', 'scramble2', 'scramble3', 'scramble4']; // make an object?
let canvases = [];

for (let i = 0; i < 1; i++) {
    let sketch1 = function (sketch) {
        // console.log(canvases);
        sketch.setup = function () {
            // *** FACE ***
            class Face {
                normal; // normal vector
                // COLORS FOR FILL (color type did not work)
                red;
                green;
                blue;

                // **** CONSTRUCTOR ****
                constructor(n, r, g, b) {
                    this.normal = n;
                    this.red = r;
                    this.green = g;
                    this.blue = b;
                }

                // **** FUNCTIONS *****  
                // TURN FACES
                turnZ(angle) {
                    let vz = sketch.createVector();
                    vz.x = sketch.round(this.normal.x * sketch.cos(angle) - this.normal.y * sketch.sin(angle));
                    vz.y = sketch.round(this.normal.x * sketch.sin(angle) + this.normal.y * sketch.cos(angle));
                    vz.z = sketch.round(this.normal.z);
                    this.normal = vz;
                }

                turnY(angle) {
                    let vy = sketch.createVector();
                    vy.x = sketch.round(this.normal.x * sketch.cos(angle) - this.normal.z * sketch.sin(angle));
                    vy.z = sketch.round(this.normal.x * sketch.sin(angle) + this.normal.z * sketch.cos(angle));
                    vy.y = sketch.round(this.normal.y);
                    this.normal = vy;
                }

                turnX(angle) {
                    let vx = sketch.createVector();
                    vx.y = sketch.round(this.normal.y * sketch.cos(angle) - this.normal.z * sketch.sin(angle));
                    vx.z = sketch.round(this.normal.y * sketch.sin(angle) + this.normal.z * sketch.cos(angle));
                    vx.x = sketch.round(this.normal.x);
                    this.normal = vx;
                }

                // DISPLAY COLORS ON CUBE - these params work correctly for me
                showColor() {
                    sketch.push();
                    sketch.noStroke();
                    sketch.fill(Number(this.red), Number(this.green), Number(this.blue));
                    sketch.rectMode(sketch.CENTER);
                    sketch.translate(20 * this.normal.x, 20 * this.normal.y, 20 * this.normal.z);
                    if (sketch.abs(this.normal.x)) {
                        sketch.rotateY(sketch.HALF_PI);
                    }
                    else if (this.normal.y) {
                        sketch.rotateX(sketch.HALF_PI);
                    }
                    // console.log(this.normal.x , this.normal.y, this.normal.z); seems to be working fine.. 
                    sketch.square(0, 0, 40);
                    sketch.pop();
                }
            } // end face

            // *** CUBIE ***
            class Cubie {
                vector3; // to store vector positions hopefully
                matrix; // to store transformation matrix
                matrix_next;
                // index of each axis
                xi;
                yi;
                zi;
                length;
                plane;
                faces = Array(6); // array for the 6 total faces
                r = 255;
                g = 255;
                b = 255;

                // **** CONSTRUCTOR **** 
                constructor(m, l, x, y, z, p) {
                    this.matrix = m;
                    this.length = l;
                    this.xi = x;
                    this.yi = y;
                    this.zi = z;
                    this.plane = p;

                    // each cubie will have information for all 6 faces
                    this.faces[0] = new Face(sketch.createVector(0, 0, -1), 0, 0, 255); // BACK - pass a new vector? and blue
                    this.faces[1] = new Face(sketch.createVector(0, 0, 1), 0, 255, 0); // FRONT - green
                    this.faces[2] = new Face(sketch.createVector(0, 1, 0), 255, 255, 255); // UP - white
                    this.faces[3] = new Face(sketch.createVector(0, -1, 0), 255, 255, 0); // DOWN - yellow
                    this.faces[4] = new Face(sketch.createVector(1, 0, 0), 255, 140, 0); // LEFT - orange
                    this.faces[5] = new Face(sketch.createVector(-1, 0, 0), 255, 0, 0); // RIGHT - red      
                }

                // show the cubie, translate to center, and show face colors
                show() {
                    sketch.noFill();
                    sketch.stroke(0);
                    sketch.strokeWeight(5);

                    sketch.push();
                    sketch.translate(this.matrix.x, this.matrix.y, this.matrix.z);
                    sketch.box(this.length);
                    for (let f of this.faces) {
                        f.showColor();
                    }
                    sketch.pop();
                }

                // **** FUNCTIONS *****  
                update(newx, newy, newz) {
                    this.xi = newx;
                    this.yi = newy;
                    this.zi = newz;
                }

                turnZfaces(angle) {
                    for (let f of this.faces) {
                        f.turnZ(angle);
                    }
                }

                turnYfaces(angle) {
                    for (let f of this.faces) {
                        f.turnY(angle);
                    }
                }

                turnXfaces(angle) {
                    for (let f of this.faces) {
                        f.turnX(angle);
                    }
                }


            } // end cubie

            // **** MOVE ****
            class Move {
                angle = 0;
                x = 0;
                y = 0;
                z = 0;
                dir;
                plane;
                animate = false;

                constructor(x, y, z, dir, p) {
                    this.x = x;
                    this.y = y;
                    this.z = z;
                    this.dir = dir;
                    this.plane = p;

                }

                // ***** FUNCTIONS *****
                start() {
                    this.animate = true;
                    this.angle = 0;
                }

                update() {
                    if (this.animate) {
                        this.angle += this.dir * 0.1;
                        // console.log("animating", this.dir, "z thing:", this.z, " pi", sketch.HALF_PI);
                        if (sketch.abs(this.angle) > sketch.HALF_PI) {
                            this.angle = 0;
                            this.animate = false;

                            // this does not work with slicing, because it IS 0!
                            if (this.plane == Z_PLANE) { // Z axis animation
                                rotateZaxis(this.dir * sketch.HALF_PI, this.z);
                                console.log("dir:", this.dir, "z-animation", this.z);
                            }
                            else if (this.plane == X_PLANE) { // X axis animation
                                
                                // if (this.x == LEFT) {
                                //     rotateXaxis(this.dir  * -1 * sketch.HALF_PI, this.x);
                                // }
                                // else {
                                    rotateXaxis(this.dir *  sketch.HALF_PI, this.x);
                                // }
                                console.log("dir:", this.dir, "x-animation", this.x);
                            }
                            else if (this.plane == Y_PLANE) { // Y axis animation
                                rotateYaxis(this.dir * -1 * sketch.HALF_PI, this.y);
                                console.log("dir:", this.dir, "y-animation", this.y);
                            }

                        }
                    }
                }

            }// END MOVE CLASS

            // *** END CLASSES  ****

            // *** PRECANVAS ***




            // **** START CANVAS AND SETUP ****

            let canvas = sketch.createCanvas(430, 250, sketch.WEBGL);
            canvas.parent(canvas_id[0]); //  "canvastl"
            sketch.frameRate(60);


            cam1 = sketch.createCamera();
            cam2 = sketch.createCamera();
            cam1.setPosition(180,200,180);
            cam1.lookAt(0,0,0);

            // SETUP VARIABLES 

            dim = Number(3);
            cube = Array(dim * dim * dim).fill(); // 1D array of matrices
            index = 0;
            // ATTEMPT 1
            // for every cubie, make a cube with correct length and offset to center
            for (let _X = 0, xx = -1; _X < dim; _X++, xx++) {
                for (let _Y = 0, yy = -1; _Y < dim; _Y++, yy++) {
                    for (let _Z = 0, zz = -1; _Z < dim; _Z++, zz++) {
                        let _len = 40;
                        let offset = (dim - 1) * _len * 0.5;
                        let x = _X * _len - offset;
                        let y = _Y * _len - offset;
                        let z = _Z * _len - offset;
                        let m = sketch.createVector(x, y, z);
                        // let p;
                        // if () {
                        //     p = X_PLANE;
                        // }
                        // else if () {
                        //     p = Y_PLANE;
                        // }
                        // else if () {
                        //     p = Z_PLANE;
                        // }

                        cube[index] = new Cubie(m, _len, xx, yy, zz);
                        // console.log("x: ", cube[index].xi, "y: ", cube[index].yi, "z: ", cube[index].zi);
                        index++;
                    }
                }
            }
            index = 0;
            // z face, clockwise
            move = null;
            moves[0] = new Move(M_SLICE, -2, -2, CLOCKWISE, X_PLANE); //0
            moves.push(new Move(-2, UP, -2, CLOCKWISE, Y_PLANE)); // 1
            moves.push(new Move( -2, DOWN,  -2, CLOCKWISE, Y_PLANE)); // 2
            moves.push(new Move(RIGHT,  -2,  -2, CLOCKWISE, X_PLANE)); // 3 - !
            moves.push(new Move(LEFT,  -2,  -2, CLOCKWISE, X_PLANE)); // 4 - 
            moves.push(new Move( -2,  -2, FRONT, CLOCKWISE, Z_PLANE)); // 5
            moves.push(new Move( -2,  -2, BACK, CLOCKWISE, Z_PLANE)); // 6
            moves.push(new Move( -2, E_SLICE,  -2, CLOCKWISE, Y_PLANE)); // 7
            moves.push(new Move( -2,  -2, S_SLICE, CLOCKWISE, Z_PLANE)); // 8
            moves.push(new Move(M_SLICE,  -2,  -2, COUNTER_CLOCKWISE, X_PLANE)); // 9 
            moves.push(new Move( -2, UP,  -2, COUNTER_CLOCKWISE, Y_PLANE)); // 10 
            moves.push(new Move( -2, DOWN,  -2, COUNTER_CLOCKWISE, Y_PLANE)); // 11
            moves.push(new Move(RIGHT,  -2,  -2, COUNTER_CLOCKWISE, X_PLANE)); // 12
            moves.push(new Move(LEFT,  -2,  -2, COUNTER_CLOCKWISE, X_PLANE)); // 13
            moves.push(new Move( -2,  -2, FRONT, COUNTER_CLOCKWISE, Z_PLANE)); // 14
            moves.push(new Move( -2,  -2, BACK, COUNTER_CLOCKWISE, Z_PLANE)); // 15
            moves.push(new Move( -2, E_SLICE,  -2, COUNTER_CLOCKWISE, Y_PLANE)); // 16
            moves.push(new Move( -2,  -2, S_SLICE, COUNTER_CLOCKWISE, Z_PLANE)); // 17


            // // if (sketch.frameCount > 200 && sketch.frameCount % 200 == 0){
            // move.start(); // goes into the switch statement based off digits


            // }





        } // end setup

        // X AXIS ONLY
        function rotateXaxis(angle, axis_index) {

            for (let i = 0; i < cube.length; i++) {
                // in z axis plane, the front?  
                qb = cube[i];
                if (qb.xi == axis_index) { // 0 == back, 1 = middle, 2 == front 


                    qb.matrix_next = sketch.createVector();
                    // rotate?
                    qb.matrix_next.y = sketch.round(qb.matrix.y * sketch.cos(angle) - qb.matrix.z * sketch.sin(angle));
                    qb.matrix_next.z = sketch.round(qb.matrix.y * sketch.sin(angle) + qb.matrix.z * sketch.cos(angle));
                    qb.matrix_next.x = sketch.round(qb.matrix.x);
                    // translate?
                    qb.matrix = qb.matrix_next;

                    qb.update((qb.matrix.x / 40), (qb.matrix.y / 40), (qb.matrix.z / 40));
                    qb.turnXfaces(angle);
                } // end if axis    

            }
        } // end X turn  


        // Y AXIS ONLY
        function rotateYaxis(angle, axis_index) {

            for (let i = 0; i < cube.length; i++) {
                // in z axis plane, the front?  
                qb = cube[i];
                if (qb.yi == axis_index) { // 0 == back, 1 = middle, 2 == front 


                    qb.matrix_next = sketch.createVector();
                    qb.matrix_next.x = sketch.round(qb.matrix.x * sketch.cos(angle) - qb.matrix.z * sketch.sin(angle));
                    qb.matrix_next.z = sketch.round(qb.matrix.x * sketch.sin(angle) + qb.matrix.z * sketch.cos(angle));
                    qb.matrix_next.y = sketch.round(qb.matrix.y);
                    qb.matrix = qb.matrix_next;

                    qb.update((qb.matrix.x / 40), (qb.matrix.y / 40), (qb.matrix.z / 40));
                    qb.turnYfaces(angle);
                } // end if axis     

            }
        } // end Y turn


        // Z AXIS ONLY
        function rotateZaxis(angle, axis_index) {
            for (let i = 0; i < cube.length; i++) {
                // in z axis plane, the front?  
                qb = cube[i];
                if (qb.zi == axis_index) { // 0 == back, 1 = middle, 2 == front 
                    qb.matrix_next = sketch.createVector();
                    qb.matrix_next.x = sketch.round(qb.matrix.x * sketch.cos(angle) - qb.matrix.y * sketch.sin(angle));
                    qb.matrix_next.y = sketch.round(qb.matrix.x * sketch.sin(angle) + qb.matrix.y * sketch.cos(angle));
                    qb.matrix_next.z = sketch.round(qb.matrix.z);
                    qb.matrix = qb.matrix_next;

                    qb.update((qb.matrix.x / 40), (qb.matrix.y / 40), (qb.matrix.z / 40));
                    qb.turnZfaces(angle);
                } // end if axis

            }
        } // end Z turn




        // **** DRAW ****


        sketch.draw = function () {


            sketch.background(34, 49, 78); // #22314E
            // camera controls for free rotation
            // sketch.orbitControl(1.5, 1.5, 1, { freeRotation: true }); //ez pz
            sketch.setCamera(cam1);

            // sketch.rotateX(sketch.frameCount * 0.002);
            // sketch.rotateY(sketch.frameCount * 0.002);
            // sketch.rotateZ(sketch.frameCount * 0.002);

            // if () {
              
            // }

            if (move != null) {

                move.update();
                for (let i = 0; i < cube.length; i++) {
                    sketch.push();
                    // Z ANIMATION
                    if (sketch.abs(cube[i].zi) >= 0 && cube[i].zi == move.z) {
                        sketch.rotateZ(move.angle);
                    } // X ANIMATION
                    else if (sketch.abs(cube[i].xi) >= 0 && cube[i].xi == move.x) {
                        sketch.rotateX(move.angle);
                    } // Y ANIMATION
                    else if (sketch.abs(cube[i].yi) >= 0 && cube[i].yi == move.y) {
                        sketch.rotateY(move.angle);
                    }
                    cube[i].show();
                    sketch.pop();
                }
            }

            // sketch.frameCount
            // right now every 2 seconds. 
            // do {
            if (sketch.frameCount % 120 == 0 && is_solving && !scramble) {

                // get the pis and numbers and do the switching for each rotation and angle.'


                curr_pit = get_pits.substring(start, start + 1);

                displayPi(start, start + 1);

                // repeat last digit?
                if (curr_pit == 0) {
                    // repeat last digit?
                    curr_pit = prev_pit;
                }


                // console.log("pits:", get_pits, "length: ", get_pits.length);
                // runPi(start, start + 1); // from pi.js

                if (curr_pit >= prev_pit) {
                    switch (curr_pit) {
                        // REGULAR CLOCKWISE MOVES
                        case "1":
                            // M SLICE 
                            console.log("M-SLICE MOVE");
                            document.querySelector("#curr_move").innerHTML = "M ";
                            // rotateXaxis(sketch.HALF_PI, M_SLICE);
                            move = moves[9];
                            move.start();
                            repeat = false;
                            break;
                        case "2":
                            // UP 
                            console.log("UP MOVE");
                            document.querySelector("#curr_move").innerHTML = "U ";
                            // rotateYaxis(sketch.HALF_PI, UP);
                            move = moves[10];
                            move.start();
                            repeat = false;
                            break;
                        case "3":
                            // DOWN 
                            console.log("DOWN MOVE");
                            document.querySelector("#curr_move").innerHTML = "D ";
                            // rotateYaxis(-1 * sketch.HALF_PI, DOWN);
                            move = moves[2];
                            move.start();
                            repeat = false;
                            break;
                        case "4":
                            // RIGHT
                            console.log("RIGHT MOVE");
                            document.querySelector("#curr_move").innerHTML = "R ";
                            // rotateXaxis(sketch.HALF_PI, RIGHT);
                            move = moves[3];
                            move.start();
                            repeat = false;
                            break;
                        case "5":
                            // LEFT
                            console.log("LEFT MOVE");
                            document.querySelector("#curr_move").innerHTML = "L ";
                            // rotateXaxis(sketch.HALF_PI, LEFT);
                            move = moves[13];
                            move.start();
                            repeat = false;
                            break;
                        case "6":
                            // FRONT
                            console.log("FRONT MOVE");
                            document.querySelector("#curr_move").innerHTML = "F ";
                            // rotateZaxis(sketch.HALF_PI, FRONT);
                            move = moves[5];
                            move.start();
                            repeat = false;
                            break;
                        case "7":
                            // BACK 
                            console.log("BACK MOVE");
                            document.querySelector("#curr_move").innerHTML = "B ";
                            // rotateZaxis(-1 * sketch.HALF_PI, BACK);
                            move = moves[15];
                            move.start();
                            repeat = false;
                            break;
                        case "8":
                            // E-SLICE 
                            console.log("E-SLICE MOVE");
                            document.querySelector("#curr_move").innerHTML = "E ";
                            // rotateYaxis(-1 * sketch.HALF_PI, E_SLICE);
                            move = moves[7];
                            move.start();
                            repeat = false;
                            break;
                        case "9":
                            // FRONT
                            console.log("FRONT MOVE");
                            document.querySelector("#curr_move").innerHTML = "S ";
                            // rotateZaxis(sketch.HALF_PI, S_SLICE);
                            move = moves[8];
                            move.start();
                            repeat = false;
                            break;
                        default:
                            // console.log("something went wrong here, #: ", curr_pit);                      
                            break;
                    }
                    // get ready for next move
                    prev_pit = curr_pit;
                } // END CLOCKWISE
                else { // INVERSE, COUNTER-CLOCKWISE MOVES                   
                    switch (curr_pit) {
                        // COUNTER CLOCKWISE - INVERSE ROTATIONS

                        case "1":
                            // M SLICE INVERSE
                            console.log("M-SLICE INVERTED MOVE");
                            document.querySelector("#curr_move").innerHTML = "M\'";
                            // rotateXaxis(-1 * sketch.HALF_PI, M_SLICE);
                            move = moves[0];
                            move.start();
                            repeat = false;
                            break;
                        case "2":
                            // UP INVERSE
                            console.log("UP INVERTED MOVE");
                            document.querySelector("#curr_move").innerHTML = "U\'";
                            // rotateYaxis(-1 * sketch.HALF_PI, UP);
                            move = moves[1];
                            move.start();
                            repeat = false;
                            break;
                        case "3":
                            // DOWN INVERSE
                            console.log("DOWN INVERTED MOVE");
                            document.querySelector("#curr_move").innerHTML = "D\'";
                            // rotateYaxis(sketch.HALF_PI, DOWN);
                            move = moves[11];
                            move.start();
                            break;
                        case "4":
                            // RIGHT INVERSE
                            console.log("RIGHT INVERTED MOVE");
                            document.querySelector("#curr_move").innerHTML = "R\'";
                            // rotateXaxis(-1 * sketch.HALF_PI, RIGHT);
                            move = moves[12];
                            move.start();
                            break;
                        case "5":
                            // LEFT INVERSE
                            console.log("LEFT INVERTED MOVE");
                            document.querySelector("#curr_move").innerHTML = "L\'";
                            // rotateXaxis(-1 * sketch.HALF_PI, LEFT);
                            move = moves[4];
                            move.start();
                            break;
                        case "6":
                            // FRONT INVERSE 
                            console.log("FRONT INVERTED MOVE");
                            document.querySelector("#curr_move").innerHTML = "F\'";
                            // rotateZaxis(-1 * sketch.HALF_PI, FRONT);
                            move = moves[14];
                            move.start();
                            break;
                        case "7":
                            // BACK INVERSE
                            console.log("BACK INVERTED MOVE");
                            document.querySelector("#curr_move").innerHTML = "B\'";
                            // rotateZaxis(sketch.HALF_PI, BACK);                            
                            move = moves[6];
                            move.start();
                            break;
                        case "8":
                            // E-SLICE  INVERSE
                            console.log("E-SLICE INVERTED MOVE");
                            document.querySelector("#curr_move").innerHTML = "E\'";
                            // rotateYaxis(sketch.HALF_PI, E_SLICE);
                            move = moves[16];
                            move.start();
                            break;
                        case "9":
                            // S-SLICE INVERSE 
                            console.log("S-SLICE INVERTED MOVE");
                            document.querySelector("#curr_move").innerHTML = "S\'";
                            // rotateZaxis(-1 * sketch.HALF_PI, S_SLICE);
                            move = moves[17];
                            move.start();
                            break;
                        default:
                            break;
                    }
                    // get ready for next move
                    prev_pit = curr_pit;
                }

                console.log(`pit: ${curr_pit}`)
                start++; // go to next digit
                if (start > get_pits.length) {
                    document.querySelector('#digit_queue').innerHTML = `| ${get_pits.substring(start - 5, start - 4)} | ${get_pits.substring(start - 4, start - 3)} | ${get_pits.substring(start - 3, start - 2)} | <span class="current">${get_pits.substring(start - 2, start - 1)}</span> | - | - | - |`;
                    console.log("STOPPED");
                    is_solving = false;
                    scramble = false;
                }
            }


            // before all of this, scramble. then start

            // is_solving = false;
            // scramble
            else if (sketch.frameCount % 120 == 0 && scramble) {



              
                // console.log("random_digits", random_digits);

                // pass the scramble id correctly here. 
                // JUST DISPLAY ALL THE SCRAMBLES FIRST, AND LET THEM SCRAMBLE ON THEIR OWN. 
                // NO POINT IN ALL THIS.
                let scramble_text = scramble_id[2];
                if (random_digits[index] >= prev_pit) {
                    // if (repeat) {
                    //   curr_digit = get_pits.substring(start-1,start);
                    //   console.log("repeat move: ", curr_digit);
                    // }
                    switch (random_digits[index]) {
                        // 
                        case 1:
                            // M SLICE 
                            console.log("M-SLICE MOVE");
                            document.querySelector(`#${scramble_text}`).innerHTML += "M";
                            // rotateXaxis(sketch.HALF_PI, M_SLICE);
                            move = moves[9];
                            move.start();
                            repeat = false;
                            break;
                        case 2:
                            // UP 
                            console.log("UP MOVE");
                            document.querySelector(`#${scramble_text}`).innerHTML += "U";
                            // rotateYaxis(sketch.HALF_PI, UP);
                            move = moves[10];
                            move.start();

                            repeat = false;
                            break;
                        case 3:
                            // DOWN 
                            console.log("DOWN MOVE");
                            document.querySelector(`#${scramble_text}`).innerHTML += "D";
                            // rotateYaxis(-1 * sketch.HALF_PI, DOWN);
                            move = moves[2];
                            move.start();
                            repeat = false;
                            break;
                        case 4:
                            // RIGHT
                            console.log("RIGHT MOVE");
                            document.querySelector(`#${scramble_text}`).innerHTML += "R";
                            // rotateXaxis(sketch.HALF_PI, RIGHT);
                            move = moves[3];
                            move.start();

                            repeat = false;
                            break;
                        case 5:
                            // LEFT
                            console.log("LEFT MOVE");
                            document.querySelector(`#${scramble_text}`).innerHTML += "L";
                            // rotateXaxis(sketch.HALF_PI, LEFT);
                            move = moves[4];
                            move.start();
                            repeat = false;
                            break;
                        case 6:
                            // FRONT
                            console.log("FRONT MOVE");
                            document.querySelector(`#${scramble_text}`).innerHTML += "F";
                            // rotateZaxis(sketch.HALF_PI, FRONT);
                            move = moves[5];
                            move.start();
                            repeat = false;
                            break;
                        case 7:
                            // BACK 
                            console.log("BACK MOVE");
                            document.querySelector(`#${scramble_text}`).innerHTML += "B";
                            // rotateZaxis(-1 * sketch.HALF_PI, BACK);
                            move = moves[15];
                            move.start();
                            repeat = false;
                            break;
                        case 8:
                            // E-SLICE 
                            console.log("E-SLICE MOVE");
                            document.querySelector(`#${scramble_text}`).innerHTML += "E";
                            // rotateYaxis(-1 * sketch.HALF_PI, E_SLICE);
                            move = moves[7];
                            move.start();
                            repeat = false;
                            break;
                        case 9:
                            // S-SLICE
                            console.log("S-SLICE MOVE");
                            document.querySelector(`#${scramble_text}`).innerHTML += "S";
                            // rotateZaxis(sketch.HALF_PI, S_SLICE);
                            move = moves[8];
                            move.start();
                            repeat = false;
                            break;
                        default:
                            // console.log("something went wrong here, #: ", curr_pit);
                            // is_solving = false;
                            console.log("index:", index, "repeat, #: ", random_digits[index]);
                            repeat = true;
                            break;
                    }
                    // if (repeat) {
                    //   curr_digit = get_pits.substring(start,start+1);
                    console.log(" move: ", random_digits[index]);
                    // }        
                    // get ready for next move
                    prev_pit = random_digits[index];
                } // END CLOCKWISE
                else { // INVERSE, COUNTER-CLOCKWISE MOVES           
                    switch (random_digits[index]) {
                        case 1:
                            // M SLICE INVERSE
                            console.log("M-SLICE INVERTED MOVE");
                            document.querySelector(`#${scramble_text}`).innerHTML += "M\'";
                            // rotateXaxis(-1 * sketch.HALF_PI, M_SLICE);
                            move = moves[0];
                            move.start();
                            repeat = false;
                            break;
                        case 2:
                            // UP INVERSE
                            console.log("UP INVERTED MOVE");
                            document.querySelector(`#${scramble_text}`).innerHTML += "U\'";
                            // rotateYaxis(-1 * sketch.HALF_PI, UP);
                            move = moves[1];
                            move.start();
                            repeat = false;
                            break;
                        case 3:
                            // DOWN INVERSE
                            console.log("DOWN INVERTED MOVE");
                            document.querySelector(`#${scramble_text}`).innerHTML += "D\'";
                            // rotateYaxis(sketch.HALF_PI, DOWN);
                            move = moves[11];
                            move.start();
                            repeat = false;
                            break;
                        case 4:
                            // RIGHT INVERSE
                            console.log("RIGHT INVERTED MOVE");
                            document.querySelector(`#${scramble_text}`).innerHTML += "R\'";
                            // rotateXaxis(-1 * sketch.HALF_PI, RIGHT);
                            move = moves[12];
                            move.start();
                            repeat = false;
                            break;
                        case 5:
                            // LEFT INVERSE
                            console.log("LEFT INVERTED MOVE");
                            document.querySelector(`#${scramble_text}`).innerHTML += "L\'";
                            // rotateXaxis(-1 * sketch.HALF_PI, LEFT);
                            move = moves[13];
                            move.start();
                            repeat = false;
                            break;
                        case 6:
                            // FRONT INVERSE 
                            console.log("FRONT INVERTED MOVE");
                            document.querySelector(`#${scramble_text}`).innerHTML += "F\'";
                            // rotateZaxis(-1 * sketch.HALF_PI, FRONT);
                            move = moves[14];
                            move.start();
                            repeat = false;
                            break;
                        case 7:
                            // BACK INVERSE
                            console.log("BACK INVERTED MOVE");
                            document.querySelector(`#${scramble_text}`).innerHTML += "B\'";
                            // rotateZaxis(sketch.HALF_PI, BACK);
                            move = moves[6];                            
                            move.start();
                            repeat = false;
                            break;
                        case 8:
                            // E-SLICE  INVERSE
                            console.log("E-SLICE INVERTED MOVE");
                            document.querySelector(`#${scramble_text}`).innerHTML += "E\'";
                            // rotateYaxis(sketch.HALF_PI, E_SLICE);
                            move = moves[16];
                            move.start();
                            repeat = false;
                            break;
                        case 9:
                            // S-SLICE INVERSE 
                            console.log("S-SLICE INVERTED MOVE");
                            document.querySelector(`#${scramble_text}`).innerHTML += "S\'";
                            // rotateZaxis(-1 * sketch.HALF_PI, S_SLICE);
                            move = moves[17];
                            move.start();
                            repeat = false;
                            break;
                        default:
                            console.log("index:", index, "repeat, #: ", random_digits[index]);
                            repeat = true; // repeat once?
                            // is_solving = false;
                            break;
                    }
                    // if (repeat) {
                    //   curr_digit = get_pits.substring(start,start+1);
                    //   console.log("repeat move: ", curr_digit);
                    // }   
                    // get ready for next move
                    prev_pit = random_digits[index];
                }
                index++; // next scramble
                  // if finished scrambling, do it
                  if (index >= random_digits.length - 1) {
                    scramble = false;
                    prev_pit = 0; // reset for "solve"
                }
                document.querySelector(`#${scramble_text}`).innerHTML += " ";


            }// end scramble

        }

    }

    new p5(sketch1);
}



