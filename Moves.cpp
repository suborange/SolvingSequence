
#include <iostream>
#include "Moves.h"

using std::cout;
using std::endl;

// cube order 
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

#pragma region RightTurns
void RightTurn(short int* _cube) {
    //top face square
    short int top = _cube[1];
    _cube[1] = _cube[21];
    _cube[21] = _cube[10];
    _cube[10] = _cube[17];
    _cube[17] = top;

    // bottom face square
    short int bottom = _cube[3];
    _cube[3] = _cube[23];
    _cube[23] = _cube[8];
    _cube[8] = _cube[19];
    _cube[19] = bottom;

    // right side face
    short int right = _cube[4];
    _cube[4] = _cube[6];
    _cube[6] = _cube[7];
    _cube[7] = _cube[5];
    _cube[5] = right;
    //print("right turn")
    //cout << endl << "RIGHT TURN,";
}
void DoubleRightTurn(short int* _cube) {
    //top face square
    short int top = _cube[1];
    _cube[1] = _cube[21];
    _cube[21] = _cube[10];
    _cube[10] = _cube[17];
    _cube[17] = top;

    top = _cube[1];
    _cube[1] = _cube[21];
    _cube[21] = _cube[10];
    _cube[10] = _cube[17];
    _cube[17] = top;

    // bottom face square
    short int bottom = _cube[3];
    _cube[3] = _cube[23];
    _cube[23] = _cube[8];
    _cube[8] = _cube[19];
    _cube[19] = bottom;

    bottom = _cube[3];
    _cube[3] = _cube[23];
    _cube[23] = _cube[8];
    _cube[8] = _cube[19];
    _cube[19] = bottom;

    // right side face
    short int right = _cube[4];
    _cube[4] = _cube[6];
    _cube[6] = _cube[7];
    _cube[7] = _cube[5];
    _cube[5] = right;

    right = _cube[4];
    _cube[4] = _cube[6];
    _cube[6] = _cube[7];
    _cube[7] = _cube[5];
    _cube[5] = right;

    //print("right turn")
    //cout << endl << "DOUBLE RIGHT TURN,";
}
void InverseRightTurn(short int* _cube) {
    //top face square
    short int top = _cube[1];
    _cube[1] = _cube[17];
    _cube[17] = _cube[10];
    _cube[10] = _cube[21];
    _cube[21] = top;

    // bottom face square
    short int bottom = _cube[3];
    _cube[3] = _cube[19];
    _cube[19] = _cube[8];
    _cube[8] = _cube[23];
    _cube[23] = bottom;

    // right side face
    short int right = _cube[4];
    _cube[4] = _cube[5];
    _cube[5] = _cube[7];
    _cube[7] = _cube[6];
    _cube[6] = right;
    //print("right turn")
    //cout << endl << "INVERSE RIGHT TURN,";
}
#pragma endregion RightTurns

#pragma region LeftTurns
void LeftTurn(short int* _cube) {
    //top face square
    short int top = _cube[0];
    _cube[0] = _cube[16];
    _cube[16] = _cube[11];
    _cube[11] = _cube[20];
    _cube[20] = top;

    //bottom face square
    short int bottom = _cube[2];
    _cube[2] = _cube[18];
    _cube[18] = _cube[9];
    _cube[9] = _cube[22];
    _cube[22] = bottom;

    //left side face 
    short int left = _cube[12];
    _cube[12] = _cube[14];
    _cube[14] = _cube[15];
    _cube[15] = _cube[13];
    _cube[13] = left;
    //print("left turn")
    //cout << endl << "LEFT TURN,";
}
void DoubleLeftTurn(short int* _cube) {
    //top face square
    short int top = _cube[0];
    _cube[0] = _cube[16];
    _cube[16] = _cube[11];
    _cube[11] = _cube[20];
    _cube[20] = top;

    top = _cube[0];
    _cube[0] = _cube[16];
    _cube[16] = _cube[11];
    _cube[11] = _cube[20];
    _cube[20] = top;

    //bottom face square
    short int bottom = _cube[2];
    _cube[2] = _cube[18];
    _cube[18] = _cube[9];
    _cube[9] = _cube[22];
    _cube[22] = bottom;

    bottom = _cube[2];
    _cube[2] = _cube[18];
    _cube[18] = _cube[9];
    _cube[9] = _cube[22];
    _cube[22] = bottom;

    //left side face 
    short int left = _cube[12];
    _cube[12] = _cube[14];
    _cube[14] = _cube[15];
    _cube[15] = _cube[13];
    _cube[13] = left;

    left = _cube[12];
    _cube[12] = _cube[14];
    _cube[14] = _cube[15];
    _cube[15] = _cube[13];
    _cube[13] = left;

    //print("left turn")
    //cout << endl << "DOUBLE LEFT TURN,";
}
void InverseLeftTurn(short int* _cube) {
    //top face square
    short int top = _cube[0];
    _cube[0] = _cube[20];
    _cube[20] = _cube[11];
    _cube[11] = _cube[16];
    _cube[16] = top;

    //bottom face square
    short int bottom = _cube[2];
    _cube[2] = _cube[22];
    _cube[22] = _cube[9];
    _cube[9] = _cube[18];
    _cube[18] = bottom;

    //left side face 
    short int left = _cube[12];
    _cube[12] = _cube[13];
    _cube[13] = _cube[15];
    _cube[15] = _cube[14];
    _cube[14] = left;

    //print("left turn")
    //cout << endl << "INVERSE LEFT TURN,";
}
#pragma endregion LeftTurns

#pragma region UpTurns
void UpTurn(short int* _cube) {
    // left face square
    short int left = _cube[0];
    _cube[0] = _cube[4];
    _cube[4] = _cube[8];
    _cube[8] = _cube[12];
    _cube[12] = left;

    //right face square
    short int right = _cube[1];
    _cube[1] = _cube[5];
    _cube[5] = _cube[9];
    _cube[9] = _cube[13];
    _cube[13] = right;

    // up side face
    short int up = _cube[16];
    _cube[16] = _cube[18];
    _cube[18] = _cube[19];
    _cube[19] = _cube[17];
    _cube[17] = up;
    //print("up turn")
    //cout << endl << "UP TURN,";
}
void DoubleUpTurn(short int* _cube) {
    // left face square
    short int left = _cube[0];
    _cube[0] = _cube[4];
    _cube[4] = _cube[8];
    _cube[8] = _cube[12];
    _cube[12] = left;

    left = _cube[0];
    _cube[0] = _cube[4];
    _cube[4] = _cube[8];
    _cube[8] = _cube[12];
    _cube[12] = left;

    //right face square
    short int right = _cube[1];
    _cube[1] = _cube[5];
    _cube[5] = _cube[9];
    _cube[9] = _cube[13];
    _cube[13] = right;

    right = _cube[1];
    _cube[1] = _cube[5];
    _cube[5] = _cube[9];
    _cube[9] = _cube[13];
    _cube[13] = right;

    // up side face
    short int up = _cube[16];
    _cube[16] = _cube[18];
    _cube[18] = _cube[19];
    _cube[19] = _cube[17];
    _cube[17] = up;

    up = _cube[16];
    _cube[16] = _cube[18];
    _cube[18] = _cube[19];
    _cube[19] = _cube[17];
    _cube[17] = up;

    //print("up turn")
    //cout << endl << "DOUBLE UP TURN,";
}
void InverseUpTurn(short int* _cube) {
    // left face square
    short int left = _cube[0];
    _cube[0] = _cube[12];
    _cube[12] = _cube[8];
    _cube[8] = _cube[4];
    _cube[4] = left;

    //right face square
    short int right = _cube[1];
    _cube[1] = _cube[13];
    _cube[13] = _cube[9];
    _cube[9] = _cube[5];
    _cube[5] = right;

    // up side face
    short int up = _cube[16];
    _cube[16] = _cube[17];
    _cube[17] = _cube[19];
    _cube[19] = _cube[18];
    _cube[18] = up;

    //print("up turn")
    // 
    //cout << endl << "INVERSE UP TURN,";
}
#pragma endregion UpTurns

#pragma region DownTurns
void DownTurn(short int* _cube) {
    // left face square
    short int left = _cube[2];
    _cube[2] = _cube[14];
    _cube[14] = _cube[10];
    _cube[10] = _cube[6];
    _cube[6] = left;

    //right face square
    short int right = _cube[3];
    _cube[3] = _cube[15];
    _cube[15] = _cube[11];
    _cube[11] = _cube[7];
    _cube[7] = right;

    // down side face
    short int down = _cube[20];
    _cube[20] = _cube[22];
    _cube[22] = _cube[23];
    _cube[23] = _cube[21];
    _cube[21] = down;
    //print("down turn")
    //cout << endl << "DOWN TURN,";
}
void DoubleDownTurn(short int* _cube) {
    // left face square
    short int left = _cube[2];
    _cube[2] = _cube[14];
    _cube[14] = _cube[10];
    _cube[10] = _cube[6];
    _cube[6] = left;

    left = _cube[2];
    _cube[2] = _cube[14];
    _cube[14] = _cube[10];
    _cube[10] = _cube[6];
    _cube[6] = left;

    //right face square
    short int right = _cube[3];
    _cube[3] = _cube[15];
    _cube[15] = _cube[11];
    _cube[11] = _cube[7];
    _cube[7] = right;

    right = _cube[3];
    _cube[3] = _cube[15];
    _cube[15] = _cube[11];
    _cube[11] = _cube[7];
    _cube[7] = right;

    // down side face
    short int down = _cube[20];
    _cube[20] = _cube[22];
    _cube[22] = _cube[23];
    _cube[23] = _cube[21];
    _cube[21] = down;

    down = _cube[20];
    _cube[20] = _cube[22];
    _cube[22] = _cube[23];
    _cube[23] = _cube[21];
    _cube[21] = down;

    //print("down turn")
    //cout << endl << "DOUBLE DOWN TURN,";
}
void InverseDownTurn(short int* _cube) {
    // left face square
    short int left = _cube[2];
    _cube[2] = _cube[6];
    _cube[6] = _cube[10];
    _cube[10] = _cube[14];
    _cube[14] = left;

    //right face square
    short int right = _cube[3];
    _cube[3] = _cube[7];
    _cube[7] = _cube[11];
    _cube[11] = _cube[15];
    _cube[15] = right;

    // down side face
    short int down = _cube[20];
    _cube[20] = _cube[21];
    _cube[21] = _cube[23];
    _cube[23] = _cube[22];
    _cube[22] = down;
    //print("down turn")
    //cout << endl << "INVERSE DOWN TURN,";
}
#pragma endregion DownTurns

#pragma region FrontTurns
void FrontTurn(short int* _cube) {
    // left face square
    short int left = _cube[18];
    _cube[18] = _cube[15];
    _cube[15] = _cube[21];
    _cube[21] = _cube[4];
    _cube[4] = left;

    //right face square
    short int right = _cube[19];
    _cube[19] = _cube[13];
    _cube[13] = _cube[20];
    _cube[20] = _cube[6];
    _cube[6] = right;

    // front side face
    short int front = _cube[0];
    _cube[0] = _cube[2];
    _cube[2] = _cube[3];
    _cube[3] = _cube[1];
    _cube[1] = front;
    //print("front turn")
    //cout << endl << "FRONT TURN,";
}
void DoubleFrontTurn(short int* _cube) {
    // left face square
    short int left = _cube[18];
    _cube[18] = _cube[15];
    _cube[15] = _cube[21];
    _cube[21] = _cube[4];
    _cube[4] = left;

    left = _cube[18];
    _cube[18] = _cube[15];
    _cube[15] = _cube[21];
    _cube[21] = _cube[4];
    _cube[4] = left;

    //right face square
    short int right = _cube[19];
    _cube[19] = _cube[13];
    _cube[13] = _cube[20];
    _cube[20] = _cube[6];
    _cube[6] = right;

    right = _cube[19];
    _cube[19] = _cube[13];
    _cube[13] = _cube[20];
    _cube[20] = _cube[6];
    _cube[6] = right;

    // front side face
    short int front = _cube[0];
    _cube[0] = _cube[2];
    _cube[2] = _cube[3];
    _cube[3] = _cube[1];
    _cube[1] = front;

    front = _cube[0];
    _cube[0] = _cube[2];
    _cube[2] = _cube[3];
    _cube[3] = _cube[1];
    _cube[1] = front;

    //print("front turn")
    //cout << endl << "DOUBLE FRONT TURN,";
}
void InverseFrontTurn(short int* _cube) {
    // left face square
    short int left = _cube[18];
    _cube[18] = _cube[4];
    _cube[4] = _cube[21];
    _cube[21] = _cube[15];
    _cube[15] = left;

    //right face square
    short int right = _cube[19];
    _cube[19] = _cube[6];
    _cube[6] = _cube[20];
    _cube[20] = _cube[13];
    _cube[13] = right;

    // front side face
    short int front = _cube[0];
    _cube[0] = _cube[1];
    _cube[1] = _cube[3];
    _cube[3] = _cube[2];
    _cube[2] = front;
    //print("front turn")
    //cout << endl << "INVERSE FRONT TURN,";
}
#pragma endregion FrontTurns

#pragma region BackTurns
void BackTurn(short int* _cube) {
    // left face square
    short int left = _cube[16];
    _cube[16] = _cube[5];
    _cube[5] = _cube[23];
    _cube[23] = _cube[14];
    _cube[14] = left;

    //right face square
    short int right = _cube[17];
    _cube[17] = _cube[7];
    _cube[7] = _cube[22];
    _cube[22] = _cube[12];
    _cube[12] = right;

    // back side face
    short int back = _cube[8];
    _cube[8] = _cube[10];
    _cube[10] = _cube[11];
    _cube[11] = _cube[9];
    _cube[9] = back;
    //print("back turn")
    //cout << endl << "BACK TURN,";
}
void DoubleBackTurn(short int* _cube) {
    // left face square
    short int left = _cube[16];
    _cube[16] = _cube[5];
    _cube[5] = _cube[23];
    _cube[23] = _cube[14];
    _cube[14] = left;

    left = _cube[16];
    _cube[16] = _cube[5];
    _cube[5] = _cube[23];
    _cube[23] = _cube[14];
    _cube[14] = left;

    //right face square
    short int right = _cube[17];
    _cube[17] = _cube[7];
    _cube[7] = _cube[22];
    _cube[22] = _cube[12];
    _cube[12] = right;

    right = _cube[17];
    _cube[17] = _cube[7];
    _cube[7] = _cube[22];
    _cube[22] = _cube[12];
    _cube[12] = right;

    // back side face
    short int back = _cube[8];
    _cube[8] = _cube[10];
    _cube[10] = _cube[11];
    _cube[11] = _cube[9];
    _cube[9] = back;

    back = _cube[8];
    _cube[8] = _cube[10];
    _cube[10] = _cube[11];
    _cube[11] = _cube[9];
    _cube[9] = back;

    //print("back turn")
    //cout << endl << "DOUBLE BACK TURN,";
}
void InverseBackTurn(short int* _cube) {
    // left face square
    short int left = _cube[16];
    _cube[16] = _cube[14];
    _cube[14] = _cube[23];
    _cube[23] = _cube[5];
    _cube[5] = left;

    //right face square
    short int right = _cube[17];
    _cube[17] = _cube[12];
    _cube[12] = _cube[22];
    _cube[22] = _cube[7];
    _cube[7] = right;

    // back side face
    short int back = _cube[8];
    _cube[8] = _cube[9];
    _cube[9] = _cube[11];
    _cube[11] = _cube[10];
    _cube[10] = back;
    //print("back turn")
    //cout << endl << "INVERSE BACK TURN,";
}
#pragma endregion BackTurns

void DoNothing(short int* _cube) {
    //empty function
}