import express, {Express, Request, Response} from "express";
const port: number = 3000;
const app: Express = express();

app.get("/", (req: Request, res: Response): void => {
    res.send("this is something completLY! DIFF");
});

app.get("/hi", (req: Request, res: Response): void => {
    res.send("hBYYYEEEE");
});

app.listen(port, (): void => {
    console.log(`listening on port ${port}`);
});