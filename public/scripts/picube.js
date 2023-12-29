// get random digits to relate to the random scramble moves? or have a certain scramble?

// test WR - STATIC CONST: D U F2 L2 U' B2 F2 D L2 U R' F' D R' F' U L D' F' D R2
const wr_scramble = [3, -1, 2, 6, 6, 5, 5, 2, 7, 7, 6, 6, -1, 3, 5, 5, -1, 2, 10, 4, 10, 6, -1, 3, 10, 4, 10, 6, -1, 2, 5, 3, 10, 6, -1, 3, 4, 4];


var random_digits = [];
for (let iran = 0; iran < 15; iran++) {
    var r = Math.floor(Math.random() * (9) + 1);
    if (r != random_digits[iran - 1] && r != random_digits[iran - 2]) { // if not duplicate to last number
        random_digits.push(r);
    }
}
console.log("random: ", random_digits);




// setup for the vectors and 3d array(matrix)
let dim;
let cube;
let move;
let bool = true;
let start = 3;
// let end = 1;
let is_solving = true;  // start as solving
let prev_pit = 0;
let repeat = false;
let scramble = true;


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
// GET PI NUMBERS 
let get_pits = '---314159265358979323846264338327950';
// 314159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460

// start = 3;
// end = 4;

// document.querySelector('#digit_queue').innerHTML = `| ${get_pits.substring(start - 3, end - 3)} | ${get_pits.substring(start - 2, end - 2)} | ${get_pits.substring(start - 1, end - 1)} | ${get_pits.substring(start, end)} | ${get_pits.substring(start + 1, end + 1)} | ${get_pits.substring(start + 2, end + 2)} | ${get_pits.substring(start + 3, end + 3)} |`;

// FUNCTIONS
function displayPi(start, end) {
    // find the pi digit, and adjust it as it runs. 
    // console.log("start: ", start, " | end: ", end);
    document.querySelector("#curr_digit").innerHTML = `${start-2}`;
    document.querySelector('#digit_queue').innerHTML = `| ${get_pits.substring(start - 3, end - 3)} | ${get_pits.substring(start - 2, end - 2)} | ${get_pits.substring(start - 1, end - 1)} | ${get_pits.substring(start, end)} | ${get_pits.substring(start + 1, end + 1)} | ${get_pits.substring(start + 2, end + 2)} | ${get_pits.substring(start + 3, end + 3)} |`;
   

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
                faces = Array(6); // array for the 6 total faces
                r = 255;
                g = 255;
                b = 255;

                // **** CONSTRUCTOR **** 
                constructor(m, l, x, y, z) {
                    this.matrix = m;
                    this.length = l;
                    this.xi = x;
                    this.yi = y;
                    this.zi = z;

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
                animate = false;

                constructor(x, y, z, dir) {
                    this.x = x;
                    this.y = y;
                    this.z = z;
                    this.dir = dir;

                }

                // ***** FUNCTIONS *****
                start() {
                    this.animate = true;
                }

                update() {
                    if (this.animate) {
                        this.angle += this.dir * 0.1;
                        if (sketch.abs(this.angle) > sketch.HALF_PI) {
                            this.angle = 0;
                            this.animate = false;
                            console.log("animating", this.angle);
                            // FIGURE OUT THIS ANGLE AND DIRECTION SHIT
                            rotateZaxis(this.angle, this.z);

                        }
                    }
                }

            }// END MOVE CLASS

            // *** END CLASSES  ****

            // *** PRECANVAS ***




            // **** START CANVAS AND SETUP ****

            let canvas = sketch.createCanvas(430, 230, sketch.WEBGL);
            canvas.parent(canvas_id[0]); //  "canvastl"
            sketch.frameRate(60);


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

                        cube[index] = new Cubie(m, _len, xx, yy, zz);
                        // console.log("x: ", cube[index].xi, "y: ", cube[index].yi, "z: ", cube[index].zi);
                        index++;
                    }
                }
            }
            index = 0;
            // z face, clockwise
            // move = new Move(0,0,1,-1); 
            // // if (sketch.frameCount > 200 && sketch.frameCount % 200 == 0){
            //   move.start();
            //   console.log("starting", sketch.frameCount);
            // // }





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

            // console.log("starting rotation Z", sketch.frameCount);
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
            sketch.orbitControl(1.5, 1.5, 1, { freeRotation: true }); //ez pz

            sketch.rotateX(sketch.frameCount * 0.002);
            sketch.rotateZ(sketch.frameCount * 0.0022);
            // move.update();


            // ATTEMPT 2
            for (let i = 0; i < cube.length; i++) {
                sketch.push();
                // if (cube[i].zi == move.z){
                //   rotateZ(move.angle);
                // }
                cube[i].show();
                sketch.pop();
            }

            // before all of this, scramble. then start

            // is_solving = false;
            // scramble
            if (sketch.frameCount % 60 == 0 && scramble) {



                // if finished scrambling, do it
                if (index >= random_digits.length - 1) {
                    scramble = false;
                    prev_pit = 0; // reset for "solve"
                }
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
                            rotateXaxis(sketch.HALF_PI, M_SLICE);
                            repeat = false;
                            break;
                        case 2:
                            // UP 
                            console.log("UP MOVE");
                            document.querySelector(`#${scramble_text}`).innerHTML += "U";
                            rotateYaxis(sketch.HALF_PI, UP);
                            repeat = false;
                            break;
                        case 3:
                            // DOWN 
                            console.log("DOWN MOVE");
                            document.querySelector(`#${scramble_text}`).innerHTML += "D";
                            rotateYaxis(-1 * sketch.HALF_PI, DOWN);
                            repeat = false;
                            break;
                        case 4:
                            // RIGHT
                            console.log("RIGHT MOVE");
                            document.querySelector(`#${scramble_text}`).innerHTML += "R";
                            rotateXaxis(sketch.HALF_PI, RIGHT);
                            repeat = false;
                            break;
                        case 5:
                            // LEFT
                            console.log("LEFT MOVE");
                            document.querySelector(`#${scramble_text}`).innerHTML += "L";
                            rotateXaxis(sketch.HALF_PI, LEFT);
                            repeat = false;
                            break;
                        case 6:
                            // FRONT
                            console.log("FRONT MOVE");
                            document.querySelector(`#${scramble_text}`).innerHTML += "F";
                            rotateZaxis(sketch.HALF_PI, FRONT);
                            repeat = false;
                            break;
                        case 7:
                            // BACK 
                            console.log("BACK MOVE");
                            document.querySelector(`#${scramble_text}`).innerHTML += "B";
                            rotateZaxis(-1 * sketch.HALF_PI, BACK);
                            repeat = false;
                            break;
                        case 8:
                            // E-SLICE 
                            console.log("E-SLICE MOVE");
                            document.querySelector(`#${scramble_text}`).innerHTML += "E";
                            rotateYaxis(-1 * sketch.HALF_PI, E_SLICE);
                            repeat = false;
                            break;
                        case 9:
                            // FRONT
                            console.log("FRONT MOVE");
                            document.querySelector(`#${scramble_text}`).innerHTML += "S";
                            rotateZaxis(sketch.HALF_PI, S_SLICE);
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
                    console.log("repeat move: ", random_digits[index]);
                    // }        
                    // get ready for next move
                    prev_pit = random_digits[index];
                } // END CLOCKWISE
                else { // INVERSE, COUNTER-CLOCKWISE MOVES
                    // if (repeat) {
                    //   curr_digit = get_pits.substring(start-1,start);
                    //   console.log("repeat move: ", curr_digit);
                    // }
                    switch (random_digits[index]) {
                        case 1:
                            // M SLICE INVERSE
                            console.log("M-SLICE MOVE");
                            document.querySelector(`#${scramble_text}`).innerHTML += "M\'";
                            rotateXaxis(-1 * sketch.HALF_PI, M_SLICE);
                            repeat = false;
                            break;
                        case 2:
                            // UP INVERSE
                            console.log("UP INVERTED MOVE");
                            document.querySelector(`#${scramble_text}`).innerHTML += "U\'";
                            rotateYaxis(-1 * sketch.HALF_PI, UP);
                            repeat = false;
                            break;
                        case 3:
                            // DOWN INVERSE
                            console.log("DOWN INVERTED MOVE");
                            document.querySelector(`#${scramble_text}`).innerHTML += "D\'";
                            rotateYaxis(sketch.HALF_PI, DOWN);
                            repeat = false;
                            break;
                        case 4:
                            // RIGHT INVERSE
                            console.log("RIGHT INVERTED MOVE");
                            document.querySelector(`#${scramble_text}`).innerHTML += "R\'";
                            rotateXaxis(-1 * sketch.HALF_PI, RIGHT);
                            repeat = false;
                            break;
                        case 5:
                            // LEFT INVERSE
                            console.log("LEFT INVERTED MOVE");
                            document.querySelector(`#${scramble_text}`).innerHTML += "L\'";
                            rotateXaxis(-1 * sketch.HALF_PI, LEFT);
                            repeat = false;
                            break;
                        case 6:
                            // FRONT INVERSE 
                            console.log("FRONT INVERTED MOVE");
                            document.querySelector(`#${scramble_text}`).innerHTML += "F\'";
                            rotateZaxis(-1 * sketch.HALF_PI, FRONT);
                            repeat = false;
                            break;
                        case 7:
                            // BACK INVERSE
                            console.log("BACK INVERTED MOVE");
                            document.querySelector(`#${scramble_text}`).innerHTML += "B\'";
                            rotateZaxis(sketch.HALF_PI, BACK);
                            repeat = false;
                            break;
                        case 8:
                            // E-SLICE  INVERSE
                            console.log("E-SLICE INVERTED MOVE");
                            document.querySelector(`#${scramble_text}`).innerHTML += "E\'";
                            rotateYaxis(sketch.HALF_PI, E_SLICE);
                            repeat = false;
                            break;
                        case 9:
                            // S-SLICE INVERSE 
                            console.log("S-SLICE INVERTED MOVE");
                            document.querySelector(`#${scramble_text}`).innerHTML += "S\'";
                            rotateZaxis(-1 * sketch.HALF_PI, S_SLICE);
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
                document.querySelector(`#${scramble_text}`).innerHTML += " ";


            }// end scramble

            // sketch.frameCount
            // right now every 2 seconds. 
            // do {
            if (sketch.frameCount % 100 == 0 && is_solving && !scramble) {

                // get the pis and numbers and do the switching for each rotation and angle.'


                let curr_pit = get_pits.substring(start, start + 1);

                displayPi(start, start +1);

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
                            rotateXaxis(sketch.HALF_PI, M_SLICE);
                            repeat = false;
                            break;
                        case "2":
                            // UP 
                            console.log("UP MOVE");
                            document.querySelector("#curr_move").innerHTML = "U ";
                            rotateYaxis(sketch.HALF_PI, UP);
                            repeat = false;
                            break;
                        case "3":
                            // DOWN 
                            console.log("DOWN MOVE");
                            document.querySelector("#curr_move").innerHTML = "D ";
                            rotateYaxis(-1 * sketch.HALF_PI, DOWN);
                            repeat = false;
                            break;
                        case "4":
                            // RIGHT
                            console.log("RIGHT MOVE");
                            document.querySelector("#curr_move").innerHTML = "R ";
                            rotateXaxis(sketch.HALF_PI, RIGHT);
                            repeat = false;
                            break;
                        case "5":
                            // LEFT
                            console.log("LEFT MOVE");
                            document.querySelector("#curr_move").innerHTML = "L ";
                            rotateXaxis(sketch.HALF_PI, LEFT);
                            repeat = false;
                            break;
                        case "6":
                            // FRONT
                            console.log("FRONT MOVE");
                            document.querySelector("#curr_move").innerHTML = "F ";
                            rotateZaxis(sketch.HALF_PI, FRONT);
                            repeat = false;
                            break;
                        case "7":
                            // BACK 
                            console.log("BACK MOVE");
                            document.querySelector("#curr_move").innerHTML = "B ";
                            rotateZaxis(-1 * sketch.HALF_PI, BACK);
                            repeat = false;
                            break;
                        case "8":
                            // E-SLICE 
                            console.log("E-SLICE MOVE");
                            document.querySelector("#curr_move").innerHTML = "E ";
                            rotateYaxis(-1 * sketch.HALF_PI, E_SLICE);
                            repeat = false;
                            break;
                        case "9":
                            // FRONT
                            console.log("FRONT MOVE");
                            document.querySelector("#curr_move").innerHTML = "S ";
                            rotateZaxis(sketch.HALF_PI, S_SLICE);
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
                            console.log("M-SLICE MOVE");
                            document.querySelector("#curr_move").innerHTML = "M\'";
                            rotateXaxis(-1 * sketch.HALF_PI, M_SLICE);
                            repeat = false;
                            break;
                        case "2":
                            // UP INVERSE
                            console.log("UP INVERTED MOVE");
                            document.querySelector("#curr_move").innerHTML = "U\'";
                            rotateYaxis(-1 * sketch.HALF_PI, UP);
                            repeat = false;
                            break;
                        case "3":
                            // DOWN INVERSE
                            console.log("DOWN INVERTED MOVE");
                            document.querySelector("#curr_move").innerHTML = "D\'";
                            rotateYaxis(sketch.HALF_PI, DOWN);
                            repeat = false;
                            break;
                        case "4":
                            // RIGHT INVERSE
                            console.log("RIGHT INVERTED MOVE");
                            document.querySelector("#curr_move").innerHTML = "R\'";
                            rotateXaxis(-1 * sketch.HALF_PI, RIGHT);
                            repeat = false;
                            break;
                        case "5":
                            // LEFT INVERSE
                            console.log("LEFT INVERTED MOVE");
                            document.querySelector("#curr_move").innerHTML = "L\'";
                            rotateXaxis(-1 * sketch.HALF_PI, LEFT);
                            repeat = false;
                            break;
                        case "6":
                            // FRONT INVERSE 
                            console.log("FRONT INVERTED MOVE");
                            document.querySelector("#curr_move").innerHTML = "F\'";
                            rotateZaxis(-1 * sketch.HALF_PI, FRONT);
                            repeat = false;
                            break;
                        case "7":
                            // BACK INVERSE
                            console.log("BACK INVERTED MOVE");
                            document.querySelector("#curr_move").innerHTML = "B\'";
                            rotateZaxis(sketch.HALF_PI, BACK);
                            repeat = false;
                            break;
                        case "8":
                            // E-SLICE  INVERSE
                            console.log("E-SLICE INVERTED MOVE");
                            document.querySelector("#curr_move").innerHTML = "E\'";
                            rotateYaxis(sketch.HALF_PI, E_SLICE);
                            repeat = false;
                            break;
                        case "9":
                            // S-SLICE INVERSE 
                            console.log("S-SLICE INVERTED MOVE");
                            document.querySelector("#curr_move").innerHTML = "S\'";
                            rotateZaxis(-1 * sketch.HALF_PI, S_SLICE);
                            repeat = false;
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
                    document.querySelector('#digit_queue').innerHTML = `| ${get_pits.substring(start - 3, end - 3)} | ${get_pits.substring(start - 2, end - 2)} | ${get_pits.substring(start - 1, end - 1)} | ${get_pits.substring(start, end)} | - | - | - |`;
                    is_solving = false;
                }
            }

        }

    }

    new p5(sketch1);
}



