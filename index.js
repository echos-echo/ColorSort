// returns a single random hex color, in string format
const randomHexColor = () => {
    return '#' + Math.floor(Math.random() * 2 ** 24).toString(16).padStart(6, '0');
}

// generates an array of colors
// the array has the number of tileNumbers, provided when invoked
const generateColors = tileNumbers => {
    const colorArray = [];
    while (tileNumbers > 0) {
        colorArray.push(randomHexColor());
        tileNumbers--;
    }
    return colorArray;
}

// generates a single tile element of the color argument provided
const generateTile = color => {
    return `<div class='tile' style='background-color: ${color}'></div>`
}

// clears the previous row so the new row of color tiles can append
// *childe is not a typo, it's just an inside joke. sorry.
const deleteChilde = (gameRow) => {
    while(gameRow.firstChild) {
        gameRow.removeChild(gameRow.lastChild);
    }
}

// INCOMPLETE: meant to sort colors
const compareVal = (a, b) => {
    return a-b;
}

// initializes the row of colors to sort
const makeBoard = () => {
    console.log('making board...')
    // colors is an array of hex colors
    const colors = generateColors(10);
    // INCOMPLETE: testing out different color sorting algorithms to find
    // the solution array for our randomized colors.
    // **NO SUCCESS SO FAR**
    // colors.map(color => parseInt(color.slice(1), 16)).sort();
    // colors.map(color => parseInt(color.slice(1), 16)).sort(compareVal)
    const gameRow = document.getElementById('game-zone');
    // clears any previous color tiles
    deleteChilde(gameRow);
    // creates and appends a color tile to the game-zone div
    colors.forEach(color => {
        const colorTile = document.createElement('div');
        colorTile.innerHTML = generateTile(color)
        gameRow.appendChild(colorTile);
    })
}

// INCOMPLETE: meant to get the current game state, the order of the color tiles
const getCurrentGame = () => {
    const tiles = document.getElementsByClassName('tile');
}

// INCOMPLETE: meant to check whether or not the current state of the game is the correct array
const checkSolution = gameColors => {
    const correctColorOrder = gameColors.sort();
}

// starts the game!
makeBoard();

// a button below the game area that refreshes the colors to the next 'game'
const toNextGame = document.getElementById('next-round');
toNextGame.addEventListener('click', makeBoard);

// TO DO:
// - color sorting algorithm
// - compare sorted color array to current game state array
// - click and drag implementation:
//     - mouseDown initiates dragging
//     - mouseOver (?) or some similar event, for the tile to follow the cursor
//     - mouseUp, completes the move
//     - extra: tile element should snap into place, and insert between other tiles, not swap