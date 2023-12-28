# Init
+ wireframe the website for 4 quadrants, for each canvas
+ make a quadrant for all the notation correctly aligned and designed to show each digit clearly. 
- need to redesign to show current scramble, and then show all concurrent digits and moves ( which will be the same, against different scrambles)
    - need to add another box below to show the current digits and moves

# HTML
- i think it us just one home page, maybe a page on how it works and was built?


# CSS
- find good color pallete and design in relation to rubiks cube. 


# JavaScript
- read the pi files in chunks. maybe just through streaming, can find the current starting chunk? (nah this is not efficient) 
    - maybe use await function? grab 10 numbers, complete the function awaiting for end, then grabs next ten numbers?
    - scrape data of web, to have newlines for each number? ( no thats like twice as big of a file)
- make a canvas and redesign the cube for clarity, with animations
- need a wya to check if solved, or parts of it being solved? 
( the matrix has another value corresponding to its correct order, then check if it is that order after every move)
- need a way to save all states of the rubiks cube incase it resets or fucks up, can restore the cube values, and continue on with the same pi digit. 