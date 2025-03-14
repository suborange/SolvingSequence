import express, { Express, Request, Response } from "express";
import fileo from 'fs';


const port: number = 3000;
const app: Express = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
let start = 1;

app.get("/", (_: Request, res: Response): void => {
    res.render('index');
});


app.get("/status", (_: Request, res: Response): void => {
    const status = {
        "code": -1
    }
    
    const stream_offline = "OFF";
    const stream_on = "ON";    
    
    const fd = fileo.openSync('public/files/stream.txt', 'r');
    try {        
        const status_string = fileo.readFileSync(fd).toString().trim();
        
        // compare the upper casses
       if(status_string.toUpperCase() === stream_offline.toUpperCase()) {
        status.code = -1; // OFFLINE
       }
       else if(status_string.toUpperCase() === stream_on.toUpperCase()){
        status.code = 0; // ONLINE - continue
       }
       else   {
        // shouldnt happen hopefully
        status.code = -1; // pause if something went wrong anyway
       }
       fileo.close(fd);
       res.send(status);
    }
    catch (err) {
        console.log('something went wrong in get request', err);
        status.code = -1; 
        fileo.close(fd);
        res.send(status); // should default to OFF, stopping it if bad read request
    }
});

app.post("/pi", async (req: Request, res: Response): Promise<void> => {
    const fd: number = fileo.openSync('public/files/pi.txt', 'r'); // file descriptor for read
    // const fd: number = fileo.openSync('public/files/test.txt', 'r'); // TEST 
    
    let position: fileo.ReadPosition = req.body.position;   
 
    
    try {
        const get_digit = await GetPiDigit(fd, position);
        fileo.close(fd); // close file, to reopen later
        res.send(get_digit); // success
    }
    catch (err) {
        console.log('something went wrong in get request', err);
        fileo.close(fd);
        res.status(400).send({
            status: 400, 
            message: `BAD PI READ:: ${err}`
        });
    }
});

app.post("/write", async (req: Request, res: Response): Promise<void> => {
    
    let position: number = req.body.position; // get the single position number. write this first   
    let cube_state = JSON.stringify(req.body.state); 
    let pi_digits: string = req.body.pits;

    position = position - 6; // should align with the current state
    const new_positions: string = position.toString() + " " + pi_digits;
    try {
        // write the position over the file
        fileo.writeFileSync('public/files/position.txt', new_positions, {flag: 'w'});
        // then append the file with the rest of the cube
        fileo.writeFileSync('public/files/state.json', cube_state, {flag: 'w'});
        
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
});


app.get("/reset", async (_: Request, res: Response): Promise<void> => {
    const reset_data = {
        "position": "0",
        "state": "F",
        "pits": "0"
    }
    try {        
        const reset_position: string = await GetPosition();
        const pos_pits: string[] = reset_position.split(" ");
        const state: string = await GetNewPiDigit();
        
        // reset_data.position = reset_position;
        reset_data.position = pos_pits[0];
        reset_data.pits = pos_pits[1];
        reset_data.state = state;
        // console.log(`someshit ${reset_data.pits}`);
    //    res.write(reset_position);
       res.send(reset_data);   // try as as a string, for copy then json it? 
    }
    catch (err) {
        console.log('something went wrong in get resetting', err);      
    }
});

app.listen(port, (): void => {
    console.log(`listening on port ${port}`);
});


// *** FUNCTIONS ***
function GetPiDigit(fd: number, position: fileo.ReadPosition): Promise<string> {
    return new Promise((resolve, reject) => {
        const buffer = Buffer.alloc(1);
        fileo.read(fd, buffer, 0, 1, position, function(err, bytes_read, buffer_read){
            if (err){
                console.log('READ ERROR', err);
                throw err;
            }
            // console.log('position: ', position,'READING DATA=> ', buffer_read.toString());
            resolve(buffer_read.toString());
        });
    });
}

function GetPosition(): Promise<string> {
    return new Promise((resolve, rej) => {
        const pos_pits = fileo.readFileSync('public/files/position.txt').toString();
        resolve(pos_pits);
    });
}

function GetNewPiDigit(): Promise<string> {
    return new Promise((resolve, rej) => {
        const new_pi = fileo.readFileSync('public/files/state.json').toString();
        resolve(new_pi);
    });
}
