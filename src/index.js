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
app.get("/", (req, res) => {
    res.render('index');
});
app.get("/pi", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("hBYYYEEEE");
}));
app.get("/write/:move", (req, res) => {
    let temp = 1;
    try {
        var stream = fs_1.default.createWriteStream("files/moves.txt", { flags: 'a' });
        console.log("appending move: ", req.params.move);
        stream.write(req.params.move);
        temp = 0;
    }
    catch (err) {
        temp = 1;
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
