// const fileo = requiure ('fs');
// get random digits to relate to the random scramble moves? or have a certain scramble?
const write_button = document.getElementById('write_digit');
write_button.addEventListener('click', WriteToFile);
write_button.move = '';

const read_button = document.getElementById('read_digit');
read_button.addEventListener('click', ReadDigit);

const img_swap = document.getElementById('notation_img');



// test WR - STATIC CONST: D U F2 L2 U' B2 F2 D L2 U R' F' D R' F' U L D' F' D R2
// const wr_scramble = [3, -1, 2, 6, 6, 5, 5, 2, 7, 7, 6, 6, -1, 3, 5, 5, -1, 2, 10, 4, 10, 6, -1, 3, 10, 4, 10, 6, -1, 2, 5, 3, 10, 6, -1, 3, 4, 4];


// var rand_scramble1 = ['-', '-', '-']; // 6 seconds delay to start
// for (let iran = 0; iran < 2; iran++) {
//     var r = Math.floor(Math.random() * (9) + 1);
//     if (r != rand_scramble1[iran - 1] && r != rand_scramble1[iran - 2]) { // if not duplicate to last number
//         rand_scramble1.push(r);
//     }
// }
// // rand_scramble1 = wr_scramble;
// console.log("random: ", rand_scramble1);

// var rand_scramble2 = ['-', '-', '-']; // 6 seconds delay to start
// for (let iran = 0; iran < 2; iran++) {
//     var r = Math.floor(Math.random() * (9) + 1);
//     if (r != rand_scramble2[iran - 1] && r != rand_scramble2[iran - 2]) { // if not duplicate to last number
//         rand_scramble2.push(r);
//     }
// }
// // rand_scramble1 = wr_scramble;
// console.log("random: ", rand_scramble2);




// setup for the vectors and 3d array(matrix)
let dim;
let cube;
let SOLVED_CUBE;
let move;
let moves = [];
let bool = true;
let iswap = true;
let start = 3;
let curr_pit;
// let end = 1;
let is_solving = true;  // start as solving
let prev_pit = 0;
// let scramble = false; // never scramble
let cam1;
let cam2;
let cam3;
let cam4;
let cam_move = 1;
let cube_size = 40;
let trans_size = cube_size / 2;
let sketchs = [];
let full_move;
// for file positon and reading
let file_position_counter = 0;
// should be able to use this to start, reset, start in the middle, etc.
// safety net for any reason

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

// TODO add all the normals
const FRONT_NORMAL = 1; // Z
const FRONT_FACES = [2, 11, 20, 5, 14, 23, 8, 17, 26];
const RIGHT_NORMAL = 1; // X
const RIGHT_FACES = [20, 19, 18, 23, 22, 21, 26, 25, 24];
const UP_NORMAL = -1; // Y
const UP_FACES = [0, 9, 18, 1, 10, 19, 2, 11, 20];
const BACK_NORMAL = -1; // Z
const BACK_FACES = [18, 9, 0, 21, 12, 3, 24, 15, 6];
const LEFT_NORMAL = -1; // X
const LEFT_FACES = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const DOWN_NORMAL = 1; // Y
const DOWN_FACES = [8, 17, ,26, 7, 16, 25, 6, 15, 24];

const audio_file = new Audio();
const audio_path = [
    "audio/good_01.m4a",
    "audio/good_02.m4a",
    "audio/good_03.m4a",
    "audio/good_04.m4a",
    "audio/good_05.m4a",
    "audio/good_06.m4a",
    "audio/good_07.m4a",
    "audio/good_09.m4a",
    "audio/good_10.m4a",
    "audio/okay_01.m4a",
    "audio/okay_02.m4a",
    "audio/okay_03.m4a",
    "audio/okay_04.m4a",
    "audio/okay_05.m4a",
    "audio/okay_07.m4a",
    "audio/okay_08.m4a",
    "audio/short_02.m4a",
    "audio/short_04.m4a",
    "audio/short_06.m4a"];

// GET PI NUMBERS 
let get_pits = '---------3820';
// 314159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460

// let trya = numberWithCommas(1090000);
// console.log("number with comma: ", trya)

// FUNCTIONS
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayPi(start, end) {
    // find the pi digit, and adjust it as it runs. 
    let current_digit = numberWithCommas(start - 8); // convert with commas

    document.querySelector("#curr_digit").innerHTML = `${current_digit}`;
    document.querySelector('#digit_queue').innerHTML = `| ${get_pits.substring(start - 3, end - 3)} | ${get_pits.substring(start - 2, end - 2)} | ${get_pits.substring(start - 1, end - 1)} | <span class="current">${get_pits.substring(start, end)}</span> | ${get_pits.substring(start + 1, end + 1)} | ${get_pits.substring(start + 2, end + 2)} | ${get_pits.substring(start + 3, end + 3)} |`;

}
// fetch from https://pi.delivery/#apifetch
async function ReadDigit() {
    let data;
    try {
        let url = `pi`;
        let response = await fetch(url, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                position: file_position_counter 
            })
        });
        data = await response.json();
        // console.log("fetched data: ", data);

    }
    catch (err) {
        console.log('something went wrong at fetching', err.stack);
    }
    if (data.digit >= 0) {
        AddDigit(data.digit);
    }
    else {
        console.log('response returned bad value');
    }
}

function AddDigit(new_digit) {
    // find the next digit, then return it to be added to the line. 
    get_pits = get_pits.concat(new_digit);
    // console.log('added new digit:', get_pits);

}

async function WriteToFile(event) {
    let data;
    // console.log("write:", event.currentTarget.move);
    try {
        let url = `write/${event.currentTarget.move}`;
        let response = await fetch(url);
        data = await response.json();
        //  console.log("URL:",url, " | moves: ", event.currentTarget.move, "- || data:",data.code);
    }
    catch (err) {
        console.log('something went wrong at fetching', err.stack);
    }
    if (data.code != 0) {
        console.log('response returned bad value');
    }
}

function PlaySound() {
    // need to start a sound here. i guess just start asap? last around half a second?
    const r_index = Math.floor(Math.random() * (audio_path.length));
    audio_file.src = audio_path[r_index];
    audio_file.play();
    //    console.log("audio: ", audio_path[r_index]);
}

function CubeIsSolved() {
    console.log('checking solve');
    // but need to compare the cubes and the face normals for the correct colors for all 54 faces and normals..
    // for 6 potential orientations

    const cube_indexes = [];
    const face_indexes =[];

    // check each block first, then check each face
    let solve_i = 0;
    // TODO check how this lines up with the cube cubes
    // dynamic - find all the positions, then just go around and check each aroundit. and find all the colors
    // check the center position and its color, then find and check the next position and its color
    for (let static_index = 0; static_index < cube.length-1; ) {
        // with every iteration, find one position and its index, then reset to find the next position?
        // if none of the positions match, skip to next position
        if (cube[solve_i].xi != SOLVED_CUBE[static_index].xi) { solve_i++; continue;}
        if (cube[solve_i].yi != SOLVED_CUBE[static_index].yi) { solve_i++; continue;}
        if (cube[solve_i].zi != SOLVED_CUBE[static_index].zi) { solve_i++; continue;}

        // if it does match all three axis, then one correct position found for this index
        // somehow have to check if this was already added, or have two different indexs
        cube_indexes.push(solve_i);
        // console.log("one piece has been matched");
        solve_i=0; // start over with the cube
        static_index++; // go to the next static position
    }
    

    // i have the indexes for the correct order. now find the center pieces, and check the neighbors for their colors.

    // the loopt goes through each colors, which color is facing the front? grab that index

    // FRONT FACE CHECK - Z NORMAL = 1
    let front_i = 0;
    // for the first 9 cubes, these should be in the order to match the front face.
    for (let static_face_index = 0; static_face_index < 9; ) {
        // if any of the faces normals do not match, then move on
        if (cube[cube_indexes[static_face_index]].faces[front_i].normal.z != FRONT_NORMAL) {front_i++; continue;}
        // else, there is a match for the normal, grab this index which should match with the cube indexes.
        face_indexes.push(front_i); // at this index, compared to the cube is this color.
        static_face_index++;
        front_i=0;
    }
    // after this should have the first 9 faces in order, in relation to the correct order of indexes

     // LEFT FACE CHECK - 

    // BACK FACE CHECK - 

     // RIGHT FACE CHECK - 
     
     // UP FACE CHECK - 

     // DOWN FACE CHECK - 

    // now having both the cubes in correct order, parellel to the correct faces
    // check these cubes and their face index against the solved cube. 
    // if the indexs are equal, then it is the same cube and color facing the right direction as the solved orientation
    // but i think its better to check against itself, look up and down and left, right, and then all corners. 
    // do all these first 9 cubes and the first 9 color faces match with eachother? if so then it should be a solved face
    // MAYBE THIS ONE \/
    //grab the centers, the first face is 0-8, so 4. then check 0-8 against the number at 4. this is a solved face
    
    // then check if its solved. 
    // if not then return
    return false;
    // if so, then solved cube!
    // skip cube 13?

    // after each move, reshuffle thecube to the correct positions. so one move, a few indexes change

    // go through each color, find the middle piece 
}

// SETUP AND DRAW
// CREATE FACE AND CUBIE CLASSES TO DRAW
// CREATE TURNING FUNCTIONS FOR EACH FACE

const canvas_id = ['canvastl', 'canvastr', 'canvasbl', 'canvasbr'];
// const scramble_id = ['scramble1', 'scramble2', 'scramble3', 'scramble4']; // make an object?
let canvases = [];


sketch1 = function (sketch) {
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
                sketch.translate(trans_size * this.normal.x, trans_size * this.normal.y, trans_size * this.normal.z);
                // to debug
                if (sketch.abs(this.normal.x)) {
                    sketch.rotateY(sketch.HALF_PI);
                }
                else if (this.normal.y) {
                    sketch.rotateX(sketch.HALF_PI);
                }
                // console.log(this.normal.x , this.normal.y, this.normal.z); seems to be working fine.. 
                sketch.square(0, 0, cube_size);
                sketch.pop();
            }
        } // end face

        // *** CUBIE ***
        class Cubie {
            // vector3; // to store vector positions hopefully
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
            highlight = false; // for debugging each cubie and its face. woopie!

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
                this.faces[2] = new Face(sketch.createVector(0, 1, 0), 255, 255, 255); // DOWN - white
                this.faces[3] = new Face(sketch.createVector(0, -1, 0), 255, 255, 0); // UP - yellow
                this.faces[4] = new Face(sketch.createVector(1, 0, 0), 255, 140, 0); // RIGHT - orange
                this.faces[5] = new Face(sketch.createVector(-1, 0, 0), 255, 0, 0); // LEFT - red      
            }

            // show the cubie, translate to center, and show face colors
            show() {
                sketch.noFill();
                sketch.stroke(0);
                sketch.strokeWeight(4);
                // debugging test here. find all 54 things great.
                if (this.highlight) {
                    sketch.fill(255, 0, 0);
                }

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
                    this.angle += this.dir * 0.06;
                    // console.log("animating", this.angle);



                    // after animation, change positions.
                    if (sketch.abs(this.angle) > sketch.HALF_PI) {
                        this.angle = 0;
                        this.animate = false;

                        // fixed to work with slicing by making default -2 // maybe this is where to add the change to a posiiton?(for solved or not)
                        if (this.plane == Z_PLANE) { // Z axis animation
                            rotateZaxis(this.dir * sketch.HALF_PI, this.z);
                            // console.log("current framecount: ", sketch.frameCount);
                            // console.log("dir:", this.dir, "z-animation", this.z);
                        }
                        else if (this.plane == X_PLANE) { // X axis animation
                            rotateXaxis(this.dir * sketch.HALF_PI, this.x);
                            // console.log("current framecount: ", sketch.frameCount);
                            // console.log("dir:", this.dir, "x-animation", this.x);
                        }
                        else if (this.plane == Y_PLANE) { // Y axis animation
                            rotateYaxis(this.dir * -1 * sketch.HALF_PI, this.y);
                            // console.log("current framecount: ", sketch.frameCount);
                            // console.log("dir:", this.dir, "y-animation", this.y);
                        }

                    }
                }
            }

        }// END MOVE CLASS

        // *** END CLASSES  ****

        // **** START CANVAS AND SETUP ****

        let canvas = sketch.createCanvas(650, 450, sketch.WEBGL);

        canvas.parent(canvas_id[0]);
        cam1 = sketch.createCamera();
        cam1.setPosition(0, 0, 230);
        // cam1.lookAt(0, 0, 0);
        sketch.setCamera(cam1);
        //  "canvastl"
        // canvas.parent(canvas_id[i]);
        sketch.frameRate(60);



        // SETUP VARIABLES 

        dim = Number(3);
        cube = Array(dim * dim * dim).fill(); // 1D array of matrices
        SOLVED_CUBE = Array(dim * dim * dim).fill(); // 1D array of matrices
        index = 0;
        // ATTEMPT 1
        // for every cubie, make a cube with correct length and offset to center
        for (let _X = 0, xx = -1; _X < dim; _X++, xx++) {
            for (let _Y = 0, yy = -1; _Y < dim; _Y++, yy++) {
                for (let _Z = 0, zz = -1; _Z < dim; _Z++, zz++) {
                    let _len = cube_size;
                    let offset = (dim - 1) * _len * 0.5; // can change this just to len? hmm
                    let x = _X * _len - offset;
                    let y = _Y * _len - offset;
                    let z = _Z * _len - offset;
                    let m = sketch.createVector(x, y, z);

                    cube[index] = new Cubie(m, _len, xx, yy, zz);
                    SOLVED_CUBE[index] = new Cubie(m, _len, xx, yy, zz);
                    // console.log("x: ", cube[index].xi, "y: ", cube[index].yi, "z: ", cube[index].zi);
                    index++;
                }
            }
        }
        // debugging 
        // cube[26].highlight = true;

        index = 0;
        move = null;
        moves[0] = new Move(M_SLICE, -2, -2, CLOCKWISE, X_PLANE); //0
        moves.push(new Move(-2, UP, -2, CLOCKWISE, Y_PLANE)); // 1
        moves.push(new Move(-2, DOWN, -2, CLOCKWISE, Y_PLANE)); // 2
        moves.push(new Move(RIGHT, -2, -2, CLOCKWISE, X_PLANE)); // 3 - !
        moves.push(new Move(LEFT, -2, -2, CLOCKWISE, X_PLANE)); // 4 - 
        moves.push(new Move(-2, -2, FRONT, CLOCKWISE, Z_PLANE)); // 5
        moves.push(new Move(-2, -2, BACK, CLOCKWISE, Z_PLANE)); // 6
        moves.push(new Move(-2, E_SLICE, -2, CLOCKWISE, Y_PLANE)); // 7
        moves.push(new Move(-2, -2, S_SLICE, CLOCKWISE, Z_PLANE)); // 8
        moves.push(new Move(M_SLICE, -2, -2, COUNTER_CLOCKWISE, X_PLANE)); // 9 
        moves.push(new Move(-2, UP, -2, COUNTER_CLOCKWISE, Y_PLANE)); // 10 
        moves.push(new Move(-2, DOWN, -2, COUNTER_CLOCKWISE, Y_PLANE)); // 11
        moves.push(new Move(RIGHT, -2, -2, COUNTER_CLOCKWISE, X_PLANE)); // 12
        moves.push(new Move(LEFT, -2, -2, COUNTER_CLOCKWISE, X_PLANE)); // 13
        moves.push(new Move(-2, -2, FRONT, COUNTER_CLOCKWISE, Z_PLANE)); // 14
        moves.push(new Move(-2, -2, BACK, COUNTER_CLOCKWISE, Z_PLANE)); // 15
        moves.push(new Move(-2, E_SLICE, -2, COUNTER_CLOCKWISE, Y_PLANE)); // 16
        moves.push(new Move(-2, -2, S_SLICE, COUNTER_CLOCKWISE, Z_PLANE)); // 17
        moves.push(new Move(-2, -2, -2, -2, -2)); // temnp no move?


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

                qb.update((qb.matrix.x / cube_size), (qb.matrix.y / cube_size), (qb.matrix.z / cube_size));
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

                qb.update((qb.matrix.x / cube_size), (qb.matrix.y / cube_size), (qb.matrix.z / cube_size));
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

                qb.update((qb.matrix.x / cube_size), (qb.matrix.y / cube_size), (qb.matrix.z / cube_size));
                qb.turnZfaces(angle);
            } // end if axis

        }
    } // end Z turn




    // **** DRAW ****
    sketch.draw = function () {


        // sketch.background(34, 49, 78); // #22314E
        sketch.background(62, 90, 142);// #3E5A8E
        // camera controls for free rotation
        sketch.orbitControl(1.5, 1.5, 1, { freeRotation: true }); //ez pz

        // if (sketch.frameCount % 1440 == 0) {
        //     cam_move *= -1; // flip direction every once in a while
        //     cam1.setPosition(0, 0, 230);
        //     cam1.lookAt(0, 0, 0);
        //     iswap = !iswap;

        //     // swap images between clockwise and counter clockwise, can be timed here?
        //     if (iswap) {
        //         img_swap.src = "imgs/clockwise_notations.png";
        //     }
        //     else {
        //         img_swap.src = "imgs/counterwise_notations.png";
        //     }
        //     // add if {cube_is_solved} here
        // }
        // sketch.rotateX(sketch.HALF_PI / 2);
        // sketch.rotateZ(sketch.HALF_PI / 2);

        // sketch.push();
        // cam1.move(cam_move, 0, 0);

        // cam1.lookAt(0, 0, 0);
        // sketch.pop();


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
        // right now every 2 seconds. (offset to not move while camera potentially resets? - 120 default)
        // do {
        if (sketch.frameCount % 120 == 0 && is_solving) {

            let temp_move;

            // debugging
            // is_solving=false;


            curr_pit = get_pits.substring(start, start + 1);

            // ReadDigit(); // read and append next digit
            displayPi(start, start + 1);

            // console.log(cube);

            // repeat last digit?
            if (curr_pit === 0) {
                curr_pit = prev_pit;
            }


            if (curr_pit >= prev_pit) {
                switch (curr_pit) {
                    // REGULAR CLOCKWISE MOVES
                    case "1":
                        // M SLICE 
                        // console.log("M-SLICE MOVE");
                        temp_move = "M";
                        move = moves[9];
                        move.start();
                        PlaySound();
                        break;
                    case "2":
                        // UP 
                        // console.log("UP MOVE");
                        temp_move = "U";
                        move = moves[10];
                        move.start();
                        PlaySound();
                        break;
                    case "3":
                        // DOWN 
                        // console.log("DOWN MOVE");
                        temp_move = "D";
                        move = moves[2];
                        move.start();
                        PlaySound();
                        break;
                    case "4":
                        // RIGHT
                        // console.log("RIGHT MOVE");
                        temp_move = "R";
                        move = moves[3];
                        move.start();
                        PlaySound();
                        break;
                    case "5":
                        // LEFT
                        // console.log("LEFT MOVE");
                        temp_move = "L";
                        move = moves[13];
                        move.start();
                        PlaySound();
                        break;
                    case "6":
                        // FRONT
                        // console.log("FRONT MOVE");
                        temp_move = "F";
                        move = moves[5];
                        move.start();
                        PlaySound();
                        break;
                    case "7":
                        // BACK 
                        // console.log("BACK MOVE");
                        temp_move = "B";
                        move = moves[15];
                        move.start();
                        PlaySound();
                        break;
                    case "8":
                        // E-SLICE 
                        // console.log("E-SLICE MOVE");
                        temp_move = "E";
                        move = moves[7];
                        move.start();
                        PlaySound();
                        break;
                    case "9":
                        // FRONT
                        // console.log("FRONT MOVE");
                        temp_move = "S";
                        move = moves[8];
                        move.start();
                        PlaySound();
                        break;
                    default:
                        temp_move = "-";
                        move = moves[moves.length - 1];
                        move.start();
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
                        // console.log("M-SLICE INVERTED MOVE");                        
                        temp_move = "M\'";
                        move = moves[0];
                        move.start();
                        PlaySound();
                        break;
                    case "2":
                        // UP INVERSE
                        // console.log("UP INVERTED MOVE");
                        temp_move = "U\'";
                        move = moves[1];
                        move.start();
                        PlaySound();
                        break;
                    case "3":
                        // DOWN INVERSE
                        // console.log("DOWN INVERTED MOVE");
                        temp_move = "D\'";
                        move = moves[11];
                        move.start();
                        PlaySound();
                        break;
                    case "4":
                        // RIGHT INVERSE
                        // console.log("RIGHT INVERTED MOVE");
                        temp_move = "R\'";
                        move = moves[12];
                        move.start();
                        PlaySound();
                        break;
                    case "5":
                        // LEFT INVERSE
                        // console.log("LEFT INVERTED MOVE");
                        temp_move = "L\'";
                        move = moves[4];
                        move.start();
                        PlaySound();
                        break;
                    case "6":
                        // FRONT INVERSE 
                        // console.log("FRONT INVERTED MOVE");
                        temp_move = "F\'";
                        move = moves[14];
                        move.start();
                        PlaySound();
                        break;
                    case "7":
                        // BACK INVERSE
                        // console.log("BACK INVERTED MOVE");
                        temp_move = "B\'";
                        move = moves[6];
                        move.start();
                        PlaySound();
                        break;
                    case "8":
                        // E-SLICE  INVERSE
                        // console.log("E-SLICE INVERTED MOVE");
                        temp_move = "E\'";
                        move = moves[16];
                        move.start();
                        PlaySound();
                        break;
                    case "9":
                        // S-SLICE INVERSE 
                        // console.log("S-SLICE INVERTED MOVE");
                        temp_move = "S\'";
                        move = moves[17];
                        move.start();
                        PlaySound();
                        break;
                    default:
                        temp_move = "-";
                        move = moves[moves.length - 1];
                        move.start();
                        break;
                }
                // get ready for next move
                prev_pit = curr_pit;
            }
            // update the current move only once, instead of within switch
            document.querySelector("#curr_move").innerHTML = temp_move;
            write_button.move = temp_move;

            // // ReadDigit();
            write_button.click();




            // console.log(`pit: ${curr_pit}`)
            start++; // go to next digit
            // check if move is any closer to solving a cube.

            // get the next digit in line, append the string with new digits
            // get digit
            // get_pits = get_pits.concat(); // should append one character to new string
            // if ((start - 8) % 100 == 0) {
            //     write_button.spacer = '\n'; // pass newline for every hundred moves
            // }
            // else {
            //     write_button.spacer = ' ';// pass a space for every new move
            // }
            // write_button.click();


            if (start > get_pits.length) {
                document.querySelector('#digit_queue').innerHTML = `| ${get_pits.substring(start - 5, start - 4)} | ${get_pits.substring(start - 4, start - 3)} | ${get_pits.substring(start - 3, start - 2)} | <span class="current">${get_pits.substring(start - 2, start - 1)}</span> | - | - | - |`;
                // console.log("STOPPED");
                is_solving = false;
                // scramble = false;
            }

            // ***************
            // * SOLVED CUBE *
            // ***************
            // if (start > 20) {                
                if (CubeIsSolved()) {
                    // what to do here when solved?                    
                    console.log("SOLVED!!!! WTF!!!");
                    document.querySelector('#digit_queue').innerHTML = `| ${get_pits.substring(start - 5, start - 4)} | ${get_pits.substring(start - 4, start - 3)} | ${get_pits.substring(start - 3, start - 2)} | <span class="current">${get_pits.substring(start - 2, start - 1)}</span> | - | - | - |`;
                    is_solving = false; // STOP ANY ROTATIONS AND STUFF. DREAM COMPLETE
                    
                }
            // }
            // else continue on for the next move
        }


    }

}

new p5(sketch1);