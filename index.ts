import express, {Express, Request, Response} from "express";

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

app.listen(port, (): void => {
    console.log(`listening on port ${port}`);
});