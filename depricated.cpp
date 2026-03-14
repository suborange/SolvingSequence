
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



// FILE TESTING STUFF
// //read file, make 100 moves -> each move print out at first, after 100 moves read next chunk
//        // loop through all the bytes read, determined by gcount()
//for (std::streamsize index = 0; index < bytes_read; index++)
//{
//    pi_digit = buffer[index]; // get next digit
//    NotSolved = DoMove(cube, pi_digit);
//    if (NotSolved) {
//        break; // if solved, break out of loop at this point.
//    }
//}
//
//pi_file.seekg(saved_pos);
//pi_file.read(buffer.data(), chunk_size);
//bytes_read = pi_file.gcount();
//if (bytes_read <= 0) {
//    cout << endl << "~~~~~~~~~~~~~~~~   UNSOLVABLE   ~~~~~~~~~~~~~~~~";
//    break;
//}

//  // generate permutations
//std::vector<string> permutated_moves = possible_moves;
//std::next_permutation(permutated_moves.begin(), permutated_moves.end());
//
//for (const auto& move : permutated_moves) {
//    auto iterator = function_mappings.find(move);
//    if (iterator != function_mappings.end()) {
//        iterator->second(cube);
//    }
//    else {
//        //error?
//    }
//}