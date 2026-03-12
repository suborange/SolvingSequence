// PiCube 2.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <iostream>
#include<string>

using std::cout;
using std::endl;


struct MasterCube {
    char red;
    char white;
    char blue;
    char yellow;
    char green;
    char orange;

};


/*
GREEN 0-3
ORANGE 4-7
BLUE 8-11
RED 12-15
YELLOW 16-19
WHITE 20-23
*/

void RightTurn(int* _cube) {
    //top face square
    int top = _cube[1];
    _cube[1] = _cube[21];
    _cube[21] = _cube[10];
    _cube[10] = _cube[17];
    _cube[17] = top;

    // bottom face square
    int bottom = _cube[3];
    _cube[3] = _cube[23];
    _cube[23] = _cube[8];
    _cube[8] = _cube[19];
    _cube[19] = bottom;    

    // right side face
    int right = _cube[4];
    _cube[4] = _cube[6];
    _cube[6] = _cube[7];
    _cube[7] = _cube[5];
    _cube[5] = right;
    //print("right turn")
    cout << endl << "RIGHT TURN,";
}

void LeftTurn(int* _cube) {
    //top face square
    int top = _cube[0];
    _cube[0] = _cube[16];
    _cube[16] = _cube[11];
    _cube[11] = _cube[20];
    _cube[20] = top;

    //bottom face square
    int bottom = _cube[2];
    _cube[2] = _cube[18];
    _cube[18] = _cube[9];
    _cube[9] = _cube[22];
    _cube[22] = bottom;    

    //left side face 
    int left = _cube[12];
    _cube[12] = _cube[14];
    _cube[14] = _cube[15];
    _cube[15] = _cube[13];
    _cube[13] = left;
    //print("left turn")
    cout << endl << "LEFT TURN,";
}

void UpTurn(int* _cube) {
    // left face square
    int left = _cube[0];
    _cube[0] = _cube[4];
    _cube[4] = _cube[8];
    _cube[8] = _cube[12];
    _cube[12] = left;

    //right face square
    int right = _cube[1];
    _cube[1] = _cube[5];
    _cube[5] = _cube[9];
    _cube[9] = _cube[13];
    _cube[13] = right;

    // up side face
    int up = _cube[16];
    _cube[16] = _cube[18];
    _cube[18] = _cube[19];
    _cube[19] = _cube[17];
    _cube[17] = up;
    //print("up turn")
    cout << endl << "UPTURN,";
}

void DownTurn(int* _cube) {
    // left face square
    int left = _cube[2];
    _cube[2] = _cube[14];
    _cube[14] = _cube[10];
    _cube[10] = _cube[6];
    _cube[6] = left;

    //right face square
    int right = _cube[3];
    _cube[3] = _cube[15];
    _cube[15] = _cube[11];
    _cube[11] = _cube[7];
    _cube[7] = right;

    // down side face
    int down = _cube[20];
    _cube[20] = _cube[22];
    _cube[22] = _cube[23];
    _cube[23] = _cube[21];
    _cube[21] = down;
    //print("down turn")
    cout << endl << "DOWN TURN,";
}

void FrontTurn(int* _cube) {
    // left face square
    int left = _cube[18];
    _cube[18] = _cube[15];
    _cube[15] = _cube[21];
    _cube[21] = _cube[4];
    _cube[4] = left;

    //right face square
    int right = _cube[19];
    _cube[19] = _cube[13];
    _cube[13] = _cube[20];
    _cube[20] = _cube[6];
    _cube[6] = right;

    // front side face
    int front = _cube[0];
    _cube[0] = _cube[2];
    _cube[2] = _cube[3];
    _cube[3] = _cube[1];
    _cube[1] = front;
    //print("front turn")
    cout << endl << "FRONT TURN,";
}

void BackTurn(int* _cube) {
    // left face square
    int left = _cube[16];
    _cube[16] = _cube[5];
    _cube[5] = _cube[23];
    _cube[23] = _cube[14];
    _cube[14] = left;

    //right face square
    int right = _cube[17];
    _cube[17] = _cube[7];
    _cube[7] = _cube[22];
    _cube[22] = _cube[12];
    _cube[12] = right;

    // back side face
    int back = _cube[8];
    _cube[8] = _cube[10];
    _cube[10] = _cube[11];
    _cube[11] = _cube[9];
    _cube[9] = back;
    //print("back turn")
    cout << endl << "BACK TURN,";
}
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

int SolveCube(int* _cube) {
    std::string cube_state;

    for (int index = 0; index < 24; index++) {
/*
        GREEN 0-3
        ORANGE 4-7
        BLUE 8-11
        RED 12-15
        YELLOW 16-19
        WHITE 20-23
*/
        cube_state += _cube[index];
        cube_state += ", ";
    }
    
    return 0; // success
}

int SetupCube() {
    int cube[24];

    return 0;
}

void PrintCube(int* _cube) {
    std::string faces[6] = { "Front", "Right", "Back", "Left", "Up", "Down" };

    cout << endl << endl << "PRINTING CUBES STATE: ";

    for (int index = 0, face = 0; index < 24; index++) {
        if (index % 4 == 0) {
            cout << endl << faces[face] << " face: ";
            face++; // go next face
        }
        cout << _cube[index] << ", ";
    }
    cout << endl;
}

int main()
{
    cout << "STARTING CUBE POSITIONS: " << endl;
    std::string faces[6] = { "Front", "Right", "Back", "Left", "Up", "Down" };

    int cube[24];
    // initialzie the solved cube state
    for (int qb = 0, face = 0; qb < 24; qb++) {
        if (qb % 4 == 0) {
            cout <<endl << faces[face] << " face: " ;
            face++; // go next face
        }
        cube[qb] = qb;
        cout << qb << ", ";
        
    }
    cout << endl;

    // GODS MOVES w/ SETUP
    //setup with green front and white on top (nice green front :p)
    FrontTurn(cube);
    FrontTurn(cube);
    BackTurn(cube);
    BackTurn(cube);
    // Should be green in front, white on top
    PrintCube(cube);


    cout <<endl << "----GODS SCRAMBLE----" << endl;
    LeftTurn(cube);
    UpTurn(cube);
    UpTurn(cube);
    UpTurn(cube);
    BackTurn(cube);
    BackTurn(cube);
    RightTurn(cube);
    LeftTurn(cube);
    LeftTurn(cube);
    LeftTurn(cube);
    DownTurn(cube);
    DownTurn(cube);
    FrontTurn(cube);
    UpTurn(cube);
    UpTurn(cube);
    UpTurn(cube);
    LeftTurn(cube);
    FrontTurn(cube);
    FrontTurn(cube);
    BackTurn(cube);
    RightTurn(cube);
    RightTurn(cube);
    RightTurn(cube);
    UpTurn(cube);
    LeftTurn(cube);
    LeftTurn(cube);
    LeftTurn(cube);

    PrintCube(cube);

    cout <<endl << "----GODS SOLUTION----" << endl;
    LeftTurn(cube);
    UpTurn(cube);
    UpTurn(cube);
    UpTurn(cube);
    RightTurn(cube);
    BackTurn(cube);
    BackTurn(cube);
    BackTurn(cube);
    FrontTurn(cube);
    FrontTurn(cube);
    LeftTurn(cube);
    LeftTurn(cube);
    LeftTurn(cube);
    UpTurn(cube);
    FrontTurn(cube);
    FrontTurn(cube);
    FrontTurn(cube);
    DownTurn(cube);
    DownTurn(cube);
    LeftTurn(cube);
    RightTurn(cube);
    RightTurn(cube);
    RightTurn(cube);
    BackTurn(cube);
    BackTurn(cube);
    UpTurn(cube);
    LeftTurn(cube);
    LeftTurn(cube);
    LeftTurn(cube);

    PrintCube(cube);

    //read file, make 100 moves -> each move print out at first, after 100 moves read next chunk

  
    cout << endl << "------------Final State-------------------- ";
    PrintCube(cube);





    return 0;
    //SolveCube(cube);
}



// TESTING STUFF BELOW


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