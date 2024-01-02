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