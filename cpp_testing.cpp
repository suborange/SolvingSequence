// PiCube 2.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include "Moves.h"

using std::cout;
using std::endl;


const bool UNSOVLED = false;
const bool SOLVED = true;

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
    short int pi_digit;


    return pi_digit;
}
void PrintCube(short int* _cube) {
    std::string faces[6] = { "Front", "Right", "Back", "Left", "Up", "Down" };

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

    bool never_unsolved = true; // prove this to be wrong.
    // go through each face state
    for (int short state = 0; state < 24; state++)
    {
        // now go through each cube to check if its solved in this face state
        for (short int qb = 0; qb < 24; qb++)
            if (!(_cube[qb] == SolvedStates[state][qb])) {
                never_unsolved = false;
                return UNSOVLED;
            }
        if (never_unsolved) {
            break;
        }
    }

   // must be solved then, if no check failed.
    cout << endl << endl << "*********HOLY CRAP SOMETHING HAPPENED************" << endl;
    return SOLVED;
}


bool DoMove(short int* _cube, short int _pi_digit) {

    switch (_pi_digit)
    {
    case 0:
        // do nothing? 
        break;
    case 1:
        FrontTurn(_cube);
        break;
    case 2:
        RightTurn(_cube);
        break;
    case 3:
        UpTurn(_cube);
        break;
    case 4:
        FrontTurn(_cube);
        FrontTurn(_cube);
        break;
    case 5:
        RightTurn(_cube);
        RightTurn(_cube);
        break;
    case 6:
        UpTurn(_cube);
        UpTurn(_cube);
        break;
    case 7: // inverse (3 for now)
        FrontTurn(_cube);
        FrontTurn(_cube);
        FrontTurn(_cube);
        break;
    case 8: // inverse (3 for now)
        RightTurn(_cube);
        RightTurn(_cube);
        RightTurn(_cube);
        break;
    case 9: // inverse (3 for now)
        UpTurn(_cube);
        UpTurn(_cube);
        UpTurn(_cube);
        break;
    }

    PrintCube(_cube);

    return !IsCubeSolved(_cube); // get wether or not it is solved or not. (flip it? shit idk...)
}



int main()
{
    cout << "STARTING CUBE POSITIONS: " << endl;
    std::string faces[6] = { "Front", "Right", "Back", "Left", "Up", "Down" };
    bool NotSolved = true;

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

    // setup file to start reading.

    const size_t chunk_size = 100;
    std::string filename = "pi_short.txt";
    std::ifstream pi_file(filename);

    if (!pi_file) {
        std::cerr << "Failed to open " << filename;
        return 1;
    }

    std::vector<char> buffer(chunk_size);

    // read the chunk size
    pi_file.read(buffer.data(), chunk_size);
    std::streamsize bytes_read = pi_file.gcount();
    // save postion
    std::streampos saved_pos = pi_file.tellg(); 
    short int pi_digit = 3;

    // now operate
    // With cube initialized, start doing moves and checking if it is solved or not
    while (NotSolved) { 

        //read file, make 100 moves -> each move print out at first, after 100 moves read next chunk
       
        for (std::streamsize index = 0; index < bytes_read; index++)
        {
            pi_digit = buffer[index]; // get next digit
            NotSolved = DoMove(cube, pi_digit);
            if (NotSolved) {
                break; // if solved, break out of loop at this point.
            }
        }
         
        pi_file.seekg(saved_pos);
        pi_file.read(buffer.data(), chunk_size);
        bytes_read = pi_file.gcount();    
        if (bytes_read <= 0) {
            cout << endl << "~~~~~~~~~~~~~~~~   UNSOLVABLE   ~~~~~~~~~~~~~~~~";
            break;
        }
    }
       

    

  
    cout << endl << "------------Final State-------------------- ";
    PrintCube(cube);





    return 0;
    //SolveCube(cube);
}



// TESTING STUFF BELOW

// for getting all 24 solving states:
////1
//RightTurn(cube);
//LeftTurn(cube);
//LeftTurn(cube);
//LeftTurn(cube);
//
//// white front
////2
////FrontTurn(cube);
////BackTurn(cube);
////BackTurn(cube);
////BackTurn(cube);
//
////////3
////FrontTurn(cube);
////FrontTurn(cube);
////BackTurn(cube);
////BackTurn(cube);
//
//////4
//FrontTurn(cube);
//FrontTurn(cube);
//FrontTurn(cube);
//BackTurn(cube);


// GODS MOVES w/ SETUP
    //setup with green front and white on top (nice green front :p)
//FrontTurn(cube);
//FrontTurn(cube);
//BackTurn(cube);
//BackTurn(cube);
//// Should be green in front, white on top
//PrintCube(cube);
//
//
//cout << endl << "----GODS SCRAMBLE----" << endl;
//LeftTurn(cube);
//UpTurn(cube);
//UpTurn(cube);
//UpTurn(cube);
//BackTurn(cube);
//BackTurn(cube);
//RightTurn(cube);
//LeftTurn(cube);
//LeftTurn(cube);
//LeftTurn(cube);
//DownTurn(cube);
//DownTurn(cube);
//FrontTurn(cube);
//UpTurn(cube);
//UpTurn(cube);
//UpTurn(cube);
//LeftTurn(cube);
//FrontTurn(cube);
//FrontTurn(cube);
//BackTurn(cube);
//RightTurn(cube);
//RightTurn(cube);
//RightTurn(cube);
//UpTurn(cube);
//LeftTurn(cube);
//LeftTurn(cube);
//LeftTurn(cube);
//
//PrintCube(cube);
//
//cout << endl << "----GODS SOLUTION----" << endl;
//LeftTurn(cube);
//UpTurn(cube);
//UpTurn(cube);
//UpTurn(cube);
//RightTurn(cube);
//BackTurn(cube);
//BackTurn(cube);
//BackTurn(cube);
//FrontTurn(cube);
//FrontTurn(cube);
//LeftTurn(cube);
//LeftTurn(cube);
//LeftTurn(cube);
//UpTurn(cube);
//FrontTurn(cube);
//FrontTurn(cube);
//FrontTurn(cube);
//DownTurn(cube);
//DownTurn(cube);
//LeftTurn(cube);
//RightTurn(cube);
//RightTurn(cube);
//RightTurn(cube);
//BackTurn(cube);
//BackTurn(cube);
//UpTurn(cube);
//LeftTurn(cube);
//LeftTurn(cube);
//LeftTurn(cube);
//
//PrintCube(cube);


// some other random moves that should solve itself
//RightTurn(cube);
//UpTurn(cube);
//UpTurn(cube);
//UpTurn(cube);
//LeftTurn(cube);
//FrontTurn(cube);
//FrontTurn(cube);
//DownTurn(cube);
//BackTurn(cube);
//BackTurn(cube);
//BackTurn(cube);
//RightTurn(cube);
//RightTurn(cube);
//LeftTurn(cube);
//UpTurn(cube);
//FrontTurn(cube);
//FrontTurn(cube);
//FrontTurn(cube);
//RightTurn(cube);
//RightTurn(cube);
//RightTurn(cube);
//for (int index = 0; index < 24; index++) {
//    cout << cube[index] << ", ";
//}
//cout << endl;
//RightTurn(cube);
//FrontTurn(cube);
//UpTurn(cube);
//UpTurn(cube);
//UpTurn(cube);
//LeftTurn(cube);
//LeftTurn(cube);
//LeftTurn(cube);
//RightTurn(cube);
//RightTurn(cube);
//BackTurn(cube);
//DownTurn(cube);
//DownTurn(cube);
//DownTurn(cube);
//FrontTurn(cube);
//FrontTurn(cube);
//LeftTurn(cube);
//LeftTurn(cube);
//LeftTurn(cube);
//UpTurn(cube);
//RightTurn(cube);
//RightTurn(cube);
//RightTurn(cube);

// SEXY MOVE TEST (using 3 turns instead of inverted)
//for (int times = 0; times < 6; times++) {
//    RightTurn(cube);
//    RightTurn(cube);
//    RightTurn(cube);
//    for (int index = 0; index < 24; index++) {
//        cout << cube[index] << ", ";
//    }
//    cout << endl;
//    // 3 for inverted for now
//    DownTurn(cube);
//    DownTurn(cube);
//    DownTurn(cube);
//    for (int index = 0; index < 24; index++) {
//        cout << cube[index] << ", ";
//    }
//    cout << endl;
//    // 3 for inverted fornow 
//    RightTurn(cube);
//    for (int index = 0; index < 24; index++) {
//        cout << cube[index] << ", ";
//    }
//    cout << endl;
//    DownTurn(cube);
//    for (int index = 0; index < 24; index++) {
//        cout << cube[index] << ", ";
//    }
//    cout << endl;

//}


// other crap
//cout << endl << endl << "PRINTING CUBES STATE: ";
//
//for (short int index = 0, face = 0; index < 24; index++) {
//    cout << cube[index] << ", ";
//}
//cout << endl;

//
//int SolveCube(short int* _cube) {
//    std::string cube_state;
//
//    for (short int index = 0; index < 24; index++) {
//        /*
//                GREEN 0-3
//                ORANGE 4-7
//                BLUE 8-11
//                RED 12-15
//                YELLOW 16-19
//                WHITE 20-23
//        */
//        cube_state += _cube[index];
//        cube_state += ", ";
//    }
//
//    return 0; // success
//}
//
//struct MasterCube {
//    char red;
//    char white;
//    char blue;
//    char yellow;
//    char green;
//    char orange;
//
//};