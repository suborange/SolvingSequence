"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const port = 3000;
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.use(express_1.default.static('public'));
app.use(express_1.default.json());
let start = 1;
app.get("/", (_, res) => {
    res.render('index');
});
app.get("/status", (_, res) => {
    const status = {
        "code": -1
    };
    const stream_offline = "OFF";
    const stream_on = "ON";
    const fd = fs_1.default.openSync('public/files/stream.txt', 'r');
    try {
        const status_string = fs_1.default.readFileSync(fd).toString().trim();
        // compare the upper casses
        if (status_string.toUpperCase() === stream_offline.toUpperCase()) {
            status.code = -1; // OFFLINE
        }
        else if (status_string.toUpperCase() === stream_on.toUpperCase()) {
            status.code = 0; // ONLINE - continue
        }
        else {
            // shouldnt happen hopefully
            status.code = -1; // pause if something went wrong anyway
        }
        fs_1.default.close(fd);
        res.send(status);
    }
    catch (err) {
        console.log('something went wrong in get request', err);
        status.code = -1;
        fs_1.default.close(fd);
        res.send(status); // should default to OFF, stopping it if bad read request
    }
});
app.post("/pi", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fd = fs_1.default.openSync('public/files/pi.txt', 'r'); // file descriptor for read
    // const fd: number = fileo.openSync('public/files/test.txt', 'r'); // TEST 
    let position = req.body.position;
    try {
        const get_digit = yield GetPiDigit(fd, position);
        fs_1.default.close(fd); // close file, to reopen later
        res.send(get_digit); // success
    }
    catch (err) {
        console.log('something went wrong in get request', err);
        fs_1.default.close(fd);
        res.status(400).send({
            status: 400,
            message: `BAD PI READ:: ${err}`
        });
    }
}));
app.post("/write", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let position = req.body.position; // get the single position number. write this first   
    let cube_state = JSON.stringify(req.body.state);
    let pi_digits = req.body.pits;
    position = position - 6; // should align with the current state
    const new_positions = position.toString() + " " + pi_digits;
    try {
        // write the position over the file
        fs_1.default.writeFileSync('public/files/position.txt', new_positions, { flag: 'w' });
        // then append the file with the rest of the cube
        fs_1.default.writeFileSync('public/files/state.json', cube_state, { flag: 'w' });
        res.status(200).send({
            status: 200,
            message: `good work!`
        });
    }
    catch (err) {
        console.log('something went wrong in get request', err);
        res.status(400).send({
            status: 400,
            message: `BAD WRITE ERROR:: ${err}`
        });
    }
}));
app.get("/reset", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reset_data = {
        "position": "0",
        "state": "F",
        "pits": "0"
    };
    try {
        const reset_position = yield GetPosition();
        const pos_pits = reset_position.split(" ");
        const state = yield GetNewPiDigit();
        // reset_data.position = reset_position;
        reset_data.position = pos_pits[0];
        reset_data.pits = pos_pits[1];
        reset_data.state = state;
        // console.log(`someshit ${reset_data.pits}`);
        //    res.write(reset_position);
        res.send(reset_data); // try as as a string, for copy then json it? 
    }
    catch (err) {
        console.log('something went wrong in get resetting', err);
    }
}));
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
// *** FUNCTIONS ***
function GetPiDigit(fd, position) {
    return new Promise((resolve, reject) => {
        const buffer = Buffer.alloc(1);
        fs_1.default.read(fd, buffer, 0, 1, position, function (err, bytes_read, buffer_read) {
            if (err) {
                console.log('READ ERROR', err);
                throw err;
            }
            // console.log('position: ', position,'READING DATA=> ', buffer_read.toString());
            resolve(buffer_read.toString());
        });
    });
}
function GetPosition() {
    return new Promise((resolve, rej) => {
        const pos_pits = fs_1.default.readFileSync('public/files/position.txt').toString();
        resolve(pos_pits);
    });
}
function GetNewPiDigit() {
    return new Promise((resolve, rej) => {
        const new_pi = fs_1.default.readFileSync('public/files/state.json').toString();
        resolve(new_pi);
    });
}
