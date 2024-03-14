# Init

# dev
- add confetti when its solved. occurs every so often.
- also maybe highlight the pi number it is at.

# HTML
- maybe a page on how it works and was built?
- link to how it was built?


# CSS
- static current displays. so they dont move around so often.

# JavaScript
- read the pi files in chunks. maybe just through streaming, can find the current starting chunk? (nah this is not efficient) 
    - maybe use await function? grab 10 numbers, complete the function awaiting for end, then grabs next ten numbers?
    - scrape data of web, to have newlines for each number? ( no thats like twice as big of a file)
- solving algorithm is one off. (if solved go back the one mover? fuck idk)

- need a way to save all states of the rubiks cube incase it resets or fucks up, can restore the cube values, and continue on with the same pi digit. 
( add a starting position, and can compare? maybe starting distances from one another. )

- displaying number values needs to account for commas ( it might)



# P5 


# streamerbot
- setup to detect when stream is offline, add text file feature to pause everything ( is_solving=fasle). 
    - then start again when stream is detected to be up again? ( maybe update n read text file?every 2 seconds? is_solving = true) 

## not sure if posssible
- when something is finished, snap to a camera that is fixed






# depricated
- scramble the cube first, then have all canvases start solving 

- can i use the mouse move thing, find the values of the mouse movement, and copy his camera swivel?

- maybe just make a file for each different canvas if nothing else works?
- need to redesign to show current scramble, 

- make a canvas and redesign the cube for clarity, with animations
- write the moves to a file, every 100 moves or something new line.