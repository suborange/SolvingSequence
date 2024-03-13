"use strict";
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
let start = 1;
app.get("/", (req, res) => {
    res.render('index');
});
app.post("/pi", (req, res) => {
    var position = req.body.position;
    // let temp:number = -1;
    const pi = {
        "digit": -1
    };
    console.log("getting digit... ");
    try {
        // need to make the "iterator" type thing forsaving file thing
        let stream = fs_1.default.createReadStream("public/files/pi.txt", { flags: 'r', encoding: 'utf8' });
        stream.on('readable', (temp) => {
            temp = stream.read(1);
            // console.log(":) ");
            pi.digit = temp;
            console.log("value INSIDE try:", pi.digit);
            stream.close();
            console.log("CLOSED AND READY TO SEND");
            // res.send(pi); 
        });
        stream.on('closed', () => {
            console.log("ending...");
            res.send(pi);
        });
    }
    catch (err) {
        pi.digit = -1;
        console.log('something went wrong in get request', err);
        // res.send(temp);
    }
    console.log("value OUTSIDE try:", pi.digit);
});
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
        var stream = fs_1.default.createWriteStream("public/files/moves.txt", { flags: 'a' });
        console.log("GET: appending move: ", full_move);
        stream.write(full_move);
        temp.code = 0;
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
// should get the arguments from the event listener?
function appendToFile(event) {
    var stream = fs_1.default.createWriteStream("files/moves.txt", { flags: 'a' });
    console.log("appending move: ", event.currentTarget.move, "  | -", event.currentTarget.spacer, "- ");
    let temp = event.currentTarget.move.concat(event.currentTarget.spacer);
    stream.write(temp);
}
// OLD 
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
