import express, {Express, Request, Response} from "express";
import fileo from 'fs';

const port: number = 3000;
const app: Express = express();
app.set('view engine','ejs');
app.use(express.static('public'));

app.get("/", (req: Request, res: Response): void => {
    res.render('index');
});

app.get("/pi", async (req: Request, res: Response): Promise<void> => {
    res.send("hBYYYEEEE");
});

app.get("/write/:move", (req: Request, res: Response): void => {
    let temp = 1;
    try {
        var stream = fileo.createWriteStream("files/moves.txt", {flags: 'a'});
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