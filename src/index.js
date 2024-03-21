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
        // console.log("getting stream status: ", status_string);
        // compare the upper casses
        if (status_string.toUpperCase() === stream_offline.toUpperCase()) {
            status.code = -1; // OFFLINE
            // console.log("offline");
        }
        else if (status_string.toUpperCase() === stream_on.toUpperCase()) {
            status.code = 0; // ONLINE - continue
            // console.log("online");
        }
        else {
            // shouldnt happen hopefully
            status.code = -1; // pause if something went wrong anyway
            // console.log('bad stream status. 404 ERROR ');
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
    // console.log("BODY: ", req.body);
    let position = req.body.position;
    // console.log("getting digit... ");
    try {
        const get_digit = yield GetPieDigit(fd, position);
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
app.get("/write/:move", (req, res) => {
    let temp = {
        "code": 1
    };
    let full_move;
    if (start % 100 == 0) { // every 100 add a newline
        full_move = req.params.move.concat('\n');
    }
    else {
        full_move = req.params.move.concat(' ');
    }
    start++;
    try {
        let stream = fs_1.default.createWriteStream("public/files/moves.txt", { flags: 'a' });
        // console.log("GET: appending move: ", full_move);
        stream.write(full_move);
        temp.code = 0;
        stream.end(); // end stream. 
    }
    catch (err) {
        temp.code = 1;
        console.log('something went wrong in get request', err);
    }
    res.send(temp);
});
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
// *** FUNCTIONS ***
function GetPieDigit(fd, position) {
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
// DEPRECATED
// need to make the "iterator" type thing forsaving file thing
// let stream = fileo.createReadStream("public/files/pi.txt", { flags: 'r', encoding: 'utf8' });
// stream.on('readable', (temp: number) => {
//     temp = stream.read(1);
//     // console.log(":) ");
//     pi.digit = temp;
//     console.log("value INSIDE try:", pi.digit);
//     stream.close();
//     console.log("CLOSED AND READY TO SEND");
//     // res.send(pi); 
// });
// stream.on('closed', () => {
//     console.log("ending...");
//     res.send(pi);
// });
// fetch('files/pi.txt').
// then((response) => {
//     const reader = response.body.getReader();
//     //read returns promise when value has been recieved
//     reader.read(1).then(function pump({done, value }){
//         if (done) {
//             // do something with LAST CHUNK
//             console.log('inside done:', value);
//             return;
//         }
//         // otherwise deal with chunk of data here
//         AddDigit(value);
//         console.log('chunk:', value);
//         return reader.read().then(pump);
//     });
// }).
// catch((err) => console.log('error ', err));
// should get the arguments from the event listener?
// function appendToFile(event: any): void {
//     var stream = fileo.createWriteStream("files/moves.txt", { flags: 'a' });
//     console.log("appending move: ", event.currentTarget.move, "  | -", event.currentTarget.spacer, "- ");
//     let temp = event.currentTarget.move.concat(event.currentTarget.spacer);
//     stream.write(temp);
// }
