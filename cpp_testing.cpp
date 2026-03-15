// PiCube 2.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <iostream>
#include <fstream>
#include <vector>
#include <unordered_map>
#include <functional>
#include <algorithm>
#include <string>
#include <locale>
#include "Moves.h"

using std::cout;
using std::endl;
using std::string;

const bool UNSOLVED = false;
const bool SOLVED = true;
const int _64KB = 65536;
const short int test_bytes = 5;
const int test_1000_bytes = 1000;


/*
GREEN 0-3
ORANGE 4-7
BLUE 8-11
RED 12-15
YELLOW 16-19
WHITE 20-23
*/

//CUBE NOTATION
/* 
    center is *green*

                 *yellow*
               | 16 | 17 |
     *red*     | 18 | 19 |  *orange*   *blue* 
    | 12 | 13 || 0  | 1  || 4  | 5  || 8  | 9  |
    | 14 | 15 || 2  | 3  || 6  | 7  || 10 | 11 |
               | 20 | 21 | 
               | 22 | 23 |
                 *white*


                RIGHT TURN:
                 *yellow*
               | 16 | 1  |
     *red*     | 18 | 3  |  *orange*   *blue*
    | 12 | 13 || 0  | 21  || 6  | 4  || 19 | 9  |
    | 14 | 15 || 2  | 23  || 7  | 5  || 17 | 11 |
               | 20 | 10 |
               | 22 | 8 |
                 *white*

*/

int SetupCube() {
    short int cube[24];

    return 0;
}
short int GetNextPiDigit() {
    short int pi_digit=0;


    return pi_digit;
}
void PrintCube(short int* _cube) {
    string faces[6] = { "Front", "Right", "Back", "Left", "Up", "Down" };

    cout << endl << endl << "PRINTING CUBES STATE: ";

    for (short int index = 0, face = 0; index < 24; index++) {
        if (index % 4 == 0) {
            cout << endl << faces[face] << " face: ";
            face++; // go next face
        }
        cout << _cube[index] << ", ";
    }
    cout << endl;
}

bool IsCubeSolved(short int* _cube) {
    short int SolvedStates[24][24] = {
        // GREEN FRONT
        // Green Face Front, Yellow Face Up, Orange Face Right... - defualt green state
        { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23},
        // Green Face Front, Red Face Up, Yellow Face Right... 
        { 2, 0, 3, 1, 18, 16, 19, 17, 9, 11, 8, 10, 22, 20, 23, 21, 14, 12, 15, 13, 6, 4, 7, 5},
        // Green Face Front, White Face Up, Red Face Right... 
        { 3, 2, 1, 0, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 23, 22, 21, 20, 19, 18, 17, 16},
        // Green Face Front, Orange Face Up, White Face Right... 
        { 1, 3, 0, 2, 21, 23, 20, 22, 10, 8, 11, 9, 17, 19, 16, 18, 5, 7, 4, 6, 13, 15, 12, 14},
        // ORANGE FRONT
        // Orange Face Front, Yellow Face Up, Blue Face Right... - defualt orange state
        { 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0, 1, 2, 3, 18, 16, 19, 17, 21, 23, 20, 22},
        // Orange Face Front, Green Face Up, Yellow Face Right... 
        { 6, 4, 7, 5, 19, 18, 17, 16, 13, 15, 12, 14, 20, 21, 22, 23, 2, 0, 3, 1, 10, 8, 11, 9},
        // Orange Face Front, White Face Up, Green Face Right... 
        { 7, 6, 5, 4, 3, 2, 1, 0, 15, 14, 13, 12, 11, 10, 9, 8, 22, 20, 23, 21, 17, 19, 16, 18},
        // Orange Face Front, Blue Face Up, White Face Right... 
        { 5, 7, 4, 6, 23, 22, 21, 20, 14, 12, 15, 13, 16, 17, 18, 19, 9, 11, 8, 10, 1, 3, 0, 2},
        // BLUE FRONT
        // Blue Face Front, Yellow Face Up, Red Face Right... - defualt blue state
        { 8, 9, 10, 11, 12, 13, 14, 15, 0, 1, 2, 3, 4, 5, 6, 7, 19, 18, 17, 16, 23, 22, 21, 20},
        // Blue Face Front, Orange Face Up, Yellow Face Right... 
        { 10, 8, 11, 9, 17, 19, 16, 18, 1, 3, 0, 2, 21, 23, 20, 22, 6, 4, 7, 5, 14, 12, 15, 13},
        // Blue Face Front, White Face Up, Orange Face Right... 
        { 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 15, 14, 13, 12, 20, 21, 22, 23, 16, 17, 18, 19},
        // Blue Face Front, Red Face Up, White Face Right... 
        { 9, 11, 8, 10, 22, 20, 23, 21, 2, 0, 3, 1, 18, 16, 19, 17, 13, 15, 12, 14, 5, 7, 4, 6},
        // RED FRONT
        // Red Face Front, Yellow Face Up, Green Face Right... - defualt red state
        { 12, 13, 14, 15, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 17, 19, 16, 18, 22, 20, 23, 21},
        // Red Face Front, Blue Face Up, Yellow Face Right... 
        { 14, 12, 15, 13, 16, 17, 18, 19, 5, 7, 4, 6, 23, 22, 21, 20, 10, 8, 11, 9, 2, 0, 3, 1},
        // Red Face Front, White Face Up, Blue Face Right... 
        { 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 21, 23, 20, 22, 18, 16, 19, 17},
        // Red Face Front, Green Face Up, White Face Right... 
        { 13, 15, 12, 14, 20, 21, 22, 23, 6, 4, 7, 5, 19, 18, 17, 16, 1, 3, 0, 2, 9, 11, 8, 10},
        // YELLOW FRONT
        // Yellow Face Front, Blue Face Up, Orange Face Right... - defualt yellow state
        { 16, 17, 18, 19, 5, 7, 4, 6, 23, 22, 21, 20, 14, 12, 15, 13, 11, 10, 9, 8, 0, 1, 2, 3},
        // Yellow Face Front, Red Face Up, Blue Face Right... 
        { 18, 16, 19, 17, 9, 11, 8, 10, 22, 20, 23, 21, 2, 0, 3, 1, 15, 14, 13, 12, 4, 5, 6, 7},
        // Yellow Face Front, Green Face Up, Red Face Right... 
        { 19, 18, 17, 16, 13, 15, 12, 14, 20, 21, 22, 23, 6, 4, 7, 5, 3, 2, 1, 0, 8, 9, 10, 11},
        // Yellow Face Front, Orange Face Up, Green Face Right... 
        { 17, 19, 16, 18, 1, 3, 0, 2, 21, 23, 20, 22, 10, 8, 11, 9, 7, 6, 5, 4, 12, 13, 14, 15},
        // WHITE FRONT
        // White Face Front, Green Face Up, Orange Face Right... - defualt yellow state
        { 20, 21, 22, 23, 6, 4, 7, 5, 19, 18, 17, 16, 13, 15, 12, 14, 0, 1, 2, 3, 11, 10, 9, 8},
        // White Face Front, Red Face Up, Green Face Right... 
        { 22, 20, 23, 21, 2, 0, 3, 1, 18, 16, 19, 17, 9, 11, 8, 10, 12, 13, 14, 15, 7, 6, 5, 4},
        // White Face Front, Blue Face Up, Red Face Right... 
        { 23, 22, 21, 20, 14, 12, 15, 13, 16, 17, 18, 19, 5, 7, 4, 6, 8, 9, 10, 11, 3, 2, 1, 0},
        // White Face Front, Orange Face Up, Blue Face Right... 
        { 21, 23, 20, 22, 10, 8, 11, 9, 17, 19, 16, 18, 1, 3, 0, 2, 4, 5, 6, 7, 15, 14, 13, 12},
    };

    signed short int solved_qbs = 0; // prove this to be wrong.
    // go through each orientation state
    for (int short state = 0; state < 24; state++)
    {
        // now go through each cube to check if its solved in this orientation.
        for (short int qb = 0; qb < 24; qb++) {
            if (_cube[qb] == SolvedStates[state][qb]) {
                solved_qbs++;
            }
        }
        if (solved_qbs >=24) { // if all 24 faces have been account for, should be solved!
           /* cout << endl << "*********************************************************" << endl;
            cout << "*********************************************************" << endl;
            cout << "*********  HOLY CRAP SOMETHING HAPPENED  ************" << endl;
            cout << "*********************************************************" << endl;
            cout << "*********************************************************" << endl;*/
            return SOLVED;
        }
        solved_qbs = 0; // RESET for next potential solve state.
    }

    return UNSOLVED;
}


bool DoMove(short int* _cube, char _pi_digit) {

    switch (_pi_digit)
    {
    case '0':
        // do nothing? 
        //LeftTurn(_cube); //  testing purposes
        break;
    case '1':
        FrontTurn(_cube);
        break;
    case '2':
        RightTurn(_cube);
        break;
    case '3':
        UpTurn(_cube);
        break;
    case '4':
        FrontTurn(_cube);
        FrontTurn(_cube);
        break;
    case '5':
        RightTurn(_cube);
        RightTurn(_cube);
        break;
    case '6':
        UpTurn(_cube);
        UpTurn(_cube);
        break;
    case '7': // inverse (3 for now)
        FrontTurn(_cube);
        FrontTurn(_cube);
        FrontTurn(_cube);
        break;
    case '8': // inverse (3 for now)
        RightTurn(_cube);
        RightTurn(_cube);
        RightTurn(_cube);
        break;
    case '9': // inverse (3 for now)
        UpTurn(_cube);
        UpTurn(_cube);
        UpTurn(_cube);
        break;
    default:
        break;
    }
  

    //PrintCube(_cube);

    return IsCubeSolved(_cube); // get wether or not it is solved or not. (flip it? shit idk...)
}

//std::unordered_map<std::string, std::function<void()>> MapFunctions() {
//    return NULL;
//}

int main()
{
    auto old_locale = cout.getloc();

    // SETUP
    cout << "STARTING CUBE POSITIONS: " << endl;
    string faces[6] = { "Front", "Right", "Back", "Left", "Up", "Down" };

    short int cube[24];
    // initialzie the solved cube state
    for (short int qb = 0, face = 0; qb < 24; qb++) {
        if (qb % 4 == 0) {
            cout << endl << faces[face] << " face: ";
            face++; // go next face
        }
        cube[qb] = qb;
        cout << qb << ", ";

    }
    cout << endl;

    // MAPPING ALL MOVES - PERMUTATIONS OF ALL MOVES
    std::vector<string> possible_moves_FRU = { "0", "F", "FF", "R", "RR", "U", "UU",  "f", "r", "u" };
    std::vector<string> possible_moves_BLD = { "0", "B", "BB", "D", "DD", "L",  "LL", "b", "d",  "l" };
    //std::vector<short int> possible_digits = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 };
    std::unordered_map<string, std::function<void(short int*)>> function_mappings;
    function_mappings["R"] = RightTurn;
    function_mappings["RR"] = DoubleRightTurn;
    function_mappings["r"] = InverseRightTurn;
    function_mappings["F"] = FrontTurn;
    function_mappings["FF"] = DoubleFrontTurn;
    function_mappings["f"] = InverseFrontTurn;
    function_mappings["U"] = UpTurn;
    function_mappings["UU"] = DoubleUpTurn;
    function_mappings["u"] = InverseUpTurn;
    function_mappings["B"] = BackTurn;
    function_mappings["BB"] = DoubleBackTurn;
    function_mappings["b"] = InverseBackTurn;
    function_mappings["D"] = DownTurn;
    function_mappings["DD"] = DoubleDownTurn;
    function_mappings["d"] = InverseDownTurn;
    function_mappings["L"] = LeftTurn;
    function_mappings["LL"] = DoubleLeftTurn;
    function_mappings["l"] = InverseLeftTurn;
    function_mappings["0"] = DoNothing;


    // gotta fix as it stop at 2,490,368, and add something for when it does not solve? dont print when it doesnt solve?
    
    size_t number_of_attempts = 0;
     // do one whole solve for one of the permutations
    do {     
        
        // generate two parallel combinations
        std::unordered_map<short int, string> move_mappings_FRU;
        std::unordered_map<short int, string> move_mappings_BLD;
        for (size_t index = 0; index < 10; index++) {
            move_mappings_FRU[index] = possible_moves_FRU[index]; // for RIGHT FRONT AND UP
            move_mappings_BLD[index] = possible_moves_BLD[index]; // for BACK LEFT AND DOWN
        }

         // FILE HANDLING - setup file to start reading.
        ///* TESTING ONLY */ string filename = "mappings.txt"; // TESTING ONLY
        std::ifstream pi_file("pi.txt"); /// input file stream - named pi_file - opening file called filename - open(filename)
        if (!pi_file) {
            std::cerr << "Failed to open pi.txt";
            return 1;
        }

        const size_t chunk_size = _64KB; // 5 or 64 kb?
        std::vector<char> buffer(chunk_size);
        // read the chunk size
        pi_file.read(buffer.data(), chunk_size);
        std::streamsize bytes_read = pi_file.gcount(); // returns the count of bytes just read.
        // save postion
        std::streampos saved_pos = pi_file.tellg();
        char pi_digit = '0'; char prev_pi_digit = '0';
        bool Solved = false;
        bool end_of_file = false;
        std::streamsize index = 0;
        long int number_of_moves = 0;

        // now operate
        // With cube initialized, start doing moves and checking if it is solved or not
        while (!Solved && !end_of_file) { // NotSolved
            prev_pi_digit = pi_digit; // get previous digit, then..
            pi_digit = buffer[index]; // get the next digit

            if (pi_digit >= prev_pi_digit) {
                // need to change digit into an integer. or change the indexes from ints to chars? or just the numbers for the ascii.. couple ways.
                switch (pi_digit)
                {
                case '0': // do whatever is mapped to digit 0 at this moment.
                    function_mappings[move_mappings_FRU[0]](cube);
                    break;
                case '1': // do whatever is mapped to digit 1 at this moment.
                    function_mappings[move_mappings_FRU[1]](cube); // some syntax like this to call it for each digit, should be mapped for the different moves.. 
                    break;
                case '2':
                    function_mappings[move_mappings_FRU[2]](cube);
                    break;
                case '3':
                    function_mappings[move_mappings_FRU[3]](cube);
                    break;
                case '4':
                    function_mappings[move_mappings_FRU[4]](cube);
                    break;
                case '5':
                    function_mappings[move_mappings_FRU[5]](cube);
                    break;
                case '6':
                    function_mappings[move_mappings_FRU[6]](cube);
                    break;
                case '7':
                    function_mappings[move_mappings_FRU[7]](cube);
                    break;
                case '8':
                    function_mappings[move_mappings_FRU[8]](cube);
                    break;
                case '9':
                    function_mappings[move_mappings_FRU[9]](cube);
                    break;
                default:
                    std::cerr << "UH OH SOMETHING WENT WERY WRONG!" << endl;
                    break;
                }
            } else {
                // need to change digit into an integer. or change the indexes from ints to chars? or just the numbers for the ascii.. couple ways.
                switch (pi_digit)
                {
                case '0': // do whatever is mapped to digit 0 at this moment.
                    function_mappings[move_mappings_BLD[0]](cube);
                    break;
                case '1': // do whatever is mapped to digit 1 at this moment.
                    function_mappings[move_mappings_BLD[1]](cube); // some syntax like this to call it for each digit, should be mapped for the different moves.. 
                    break;
                case '2':
                    function_mappings[move_mappings_BLD[2]](cube);
                    break;
                case '3':
                    function_mappings[move_mappings_BLD[3]](cube);
                    break;
                case '4':
                    function_mappings[move_mappings_BLD[4]](cube);
                    break;
                case '5':
                    function_mappings[move_mappings_BLD[5]](cube);
                    break;
                case '6':
                    function_mappings[move_mappings_BLD[6]](cube);
                    break;
                case '7':
                    function_mappings[move_mappings_BLD[7]](cube);
                    break;
                case '8':
                    function_mappings[move_mappings_BLD[8]](cube);
                    break;
                case '9':
                    function_mappings[move_mappings_BLD[9]](cube);
                    break;
                default:
                    std::cerr << "UH OH SOMETHING WENT WERY WRONG!" << endl;
                    break;
                }
            }
            //PrintCube(_cube);
            Solved = IsCubeSolved(cube);
            number_of_moves++;

           /* if (number_of_moves >= 651316) {
                int test = 0;
            }*/

            if (Solved) {
                break; // if solved break?
            }

            index++;// go to next buffer index
            if (index >= bytes_read) { // after chunk of characters have been read
                pi_file.seekg(saved_pos); // go back to the saved position?
                pi_file.read(buffer.data(), chunk_size);
                bytes_read = pi_file.gcount(); // something if bytes read is less than the chunk size.. end of file.
                saved_pos = pi_file.tellg();
                //cout << "-- GONE THROUGH 64KB OF DIGITS --" << endl;
                index = 0; // reset for going through next buffer.
                if (bytes_read < chunk_size) {
                    cout << "-- nearing end of file- LAST CHUNK --" << endl;
                    end_of_file = true;
                }
            }
        }

        // solves history
        std::ofstream solve_file("solves.txt", std::ios::app);
        if (!solve_file) {
            std::cerr << "Failed to open solve.txt";
            return 1;
        }
        // SAVE STATE
        std::ofstream save_file("save.txt");
        if (!save_file) {
            std::cerr << "Failed to open save.txt";
            return 1;
        }


        number_of_attempts++;
        solve_file << "--------------------- ATTEMPT #";
        solve_file.imbue(std::locale("en_US.UTF-8")); // change formatting for writing number to 
        solve_file << number_of_attempts << " ---------------------" << endl;
        solve_file.imbue(old_locale); // change it back
        solve_file << "Mapping for 0-9 of type Front-Right-Up: ";

        cout << "--------------------- ATTEMPT #";
        cout.imbue(std::locale("en_US.UTF-8")); // change formatting for writing number to 
        cout << number_of_attempts << " ---------------------" << endl;
        cout.imbue(old_locale); // change it back
        cout << "Mapping for 0-9 of type Front-Right-Up: ";

        save_file << number_of_attempts << endl;
        for (const auto& move : possible_moves_FRU) {
            cout << move << ", ";
            solve_file << move << ", ";
            save_file << "\"" << move << "\"" << ", ";
        }
        save_file << endl;
        solve_file << endl << "Mapping for 0-9 of type Back-Left-Down: ";
        cout << endl << "Mapping for 0-9 of type Back-Left-Down: ";
        for (const auto& move : possible_moves_BLD) {
            cout << move << ", ";
            solve_file << move << ", ";
            save_file << "\"" << move << "\"" << ", ";
        }     


        if (Solved) {           
            solve_file << endl  << "Number of total moves to SOLVE: ";
            solve_file.imbue(std::locale("en_US.UTF-8")); // change formatting for writing number to 
            solve_file << number_of_moves << endl;
            solve_file.imbue(old_locale); // change it back

            cout << endl << "Number of total moves to SOLVE: ";
            cout.imbue(std::locale("en_US.UTF-8")); // change formatting for number output
            cout << number_of_moves << endl;
            cout.imbue(old_locale); // change it back
        }
        else {
            solve_file << endl << "Number of total moves made with NO solve: ";
            solve_file.imbue(std::locale("en_US.UTF-8")); // change formatting for writing number to 
            solve_file << number_of_moves << endl;
            solve_file.imbue(old_locale); // change it back

            cout << endl << "Number of total moves made with NO solve: ";
            cout.imbue(std::locale("en_US.UTF-8")); // change formatting for number output
            cout << number_of_moves << endl;
            cout.imbue(old_locale); // change it back
        }        
        //PrintCube(cube); 
        cout << "-------------------------------------------" << endl << endl;

        // RESET THE CUBE YOU DUMBASS
        for (short int qb = 0; qb < 24; qb++) {
            cube[qb] = qb;
        }
    } while (std::next_permutation(possible_moves_FRU.begin(), possible_moves_FRU.end()) 
          && std::next_permutation(possible_moves_BLD.begin(), possible_moves_BLD.end())); // go through all the permutations of the possible moves.
    // save which permutation that it is on
    // save which permutations and the number of moves etc. (maybe sort)

       
    return 0;
}


