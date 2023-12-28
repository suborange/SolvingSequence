"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const port = 3000;
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.use(express_1.default.static('public'));
app.get("/", (req, res) => {
    res.render('index');
});
app.get("/hi", (req, res) => {
    res.send("hBYYYEEEE");
});
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
