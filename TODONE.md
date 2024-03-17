## REMEMBER TO INTERACT WITH DOM ON START SO PLAY SOUND WORKS!
# Init
+ wireframe the website for 4 quadrants, for each canvas
+ make a quadrant for all the notation correctly aligned and designed to show each digit clearly. 

+ and then show all concurrent digits and moves ( which will be the same, against different scrambles)
d+ need to add another box below to show the current digits and moves

# dev
+ check how the cube_indexes line up with the cube cubes whats the order going for the 27 cubes, opposed to the faces (13 is nothingness)
+ add confetti when its solved. occurs every so often.
+ also maybe highlight the pi number it is at.
+ fix the graphics for 0==repeat
+ add couple more solved audio files.

# HTML
+ i think it is just one home page, 
+ add notations + templates


# CSS
+ find good color pallete, design, font, borders, etc. in relation to rubiks cube. 
+ static current displays. so they dont move around so often.

# JavaScript
+ maybe line up the move, camera reset, on move ending, so it looks less choppy?
+ add sound effect for each turn, make it?
+ add sound effects for solved, going with confetti

+ mess with confetti numbers, make random? 
+ add all the face normal constants
+ swap images every so often
+ smooth transition between images?
+ change title to pi SOLVED a rubiks cube!!
+ need a way to check if solved, or parts of it being solved? 
    (the matrix has another value corresponding to its correct order, then check if it is that order after every move)
+ solving algorithm is one off. (if solved go back the one mover? fuck idk)
+ displaying number values needs to account for commas ( it might)
+ read the pi files in chunks. maybe just through streaming, can find the current starting chunk? (nah this is not efficient) 
+ refix all the data using the new pi string
+ add a small notice at where a side was solved or not. what digit?
- fixed up the last of the bugs?

# P5 
+ make new camera, to point at cube from an angle, and rotate around the cube showing 3 sides at all times, and thus all 6 around

# streamerbot
+ setup to detect when stream is offline, add text file feature to pause everything - OFF ( is_solving=fasle). 
    + then start again when stream is detected to be up again? -ON (maybe update n read text file? every 2 seconds? is_solving = true)