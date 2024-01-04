import express, {Express, Request, Response} from "express";
import fileo from 'fs';

const port: number = 3000;
const app: Express = express();
app.set('view engine','ejs');
app.use(express.static('public'));
let start = 1;

app.get("/", (req: Request, res: Response): void => {
    res.render('index');
});

app.get("/pi", (req: Request, res: Response): void => {
    let temp = {
        "code": 1};
    console.log("getting digit... ");  
    try {
        var stream = fileo.createWriteStream("files/moves.txt", {flags: 'a'});
        console.log("appending move: ", req.params.move);    
        stream.write(req.params.move);
        temp.code = 0;
    }
    catch (err) {
        temp.code = 1;
        console.log('something went wrong in get request', err);
    }
   
    res.send(temp);
});

app.get("/write/:move", (req: Request, res: Response): void => {
    let temp = {
        "code": 1};
        let full_move;
        if (start % 100 == 0) { // every 100 add a newline
            full_move = req.params.move.concat('\n');
        }
        else {
            full_move = req.params.move.concat(' ');
        }
        start++;
    try {
        var stream = fileo.createWriteStream("public/files/moves.txt", {flags: 'a'});
        console.log("appending move: ", full_move);    
        stream.write(full_move);
        temp.code = 0;
    }
    catch (err) {
        temp.code = 1;
        console.log('something went wrong in get request', err);
    }
   
    res.send(temp); 
});

app.listen(port, (): void => {
    console.log(`listening on port ${port}`);
});


// *** FUNCTIONS ***
// should get the arguments from the event listener?
function appendToFile(event: any): void {
    var stream = fileo.createWriteStream("files/moves.txt", {flags: 'a'});
    console.log("appending move: ", event.currentTarget.move, "  | -", event.currentTarget.spacer, "- ");
    let temp = event.currentTarget.move.concat(event.currentTarget.spacer);
    stream.write(temp);
}