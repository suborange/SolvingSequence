# Init

# dev
- check how the cube_indexes line up with the cube cubes whats the order going for the 27 cubes, opposed to the faces (13 is nothingness)

# HTML
- maybe a page on how it works and was built?
- link to how it was built?
- static current displays. so they dont move around so often.


# CSS


# JavaScript
- add all the face normal constants
- read the pi files in chunks. maybe just through streaming, can find the current starting chunk? (nah this is not efficient) 
    - maybe use await function? grab 10 numbers, complete the function awaiting for end, then grabs next ten numbers?
    - scrape data of web, to have newlines for each number? ( no thats like twice as big of a file)
- make a canvas and redesign the cube for clarity, with animations
- need a way to check if solved, or parts of it being solved? 
( the matrix has another value corresponding to its correct order, then check if it is that order after every move)
- need a way to save all states of the rubiks cube incase it resets or fucks up, can restore the cube values, and continue on with the same pi digit. 
( add a starting position, and can compare? maybe starting distances from one another. )

- displaying number values needs to account for commas ( it might)

- write the moves to a file, every 100 moves or something new line.

+ swap images every so often
- smooth transition between images?

# P5 

## not sure if posssible
- when something is finished, snap to a camera that is fixed






# depricated
- scramble the cube first, then have all canvases start solving 

- can i use the mouse move thing, find the values of the mouse movement, and copy his camera swivel?

- maybe just make a file for each different canvas if nothing else works?
- need to redesign to show current scramble, 