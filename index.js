// generates an array of random colors, by hue value
// the array has the number of tileNumbers, provided when invoked
const generateColors = tileNumbers => {
    const colorArray = [];
    while (tileNumbers > 0) {
        // colorArray.push(randomHexColor());
        colorArray.push(Math.round(Math.random() * 255));
        tileNumbers--;
    }
    return colorArray;
}

// generates a single tile element of the color argument provided
const generateTile = color => {
    // tile color is determined in HSV color, with a set saturation and value of 50%
    return `<div class='tile' style='background-color: hsl(${color}, 50%, 50%)'></div>`
}

// clears the previous row so the new row of color tiles can append
// *childe is not a typo, it's just an inside joke. sorry.
const deleteChilde = (gameRow) => {
    while(gameRow.firstChild) {
        gameRow.removeChild(gameRow.lastChild);
    }
}

// initializes the row of colors to sort
const makeBoard = () => {
    console.log('making board...')
    // colors is an array of hex colors
    const colors = generateColors(10);
    console.dir(colors);
    console.dir(Math.max.apply(null, colors));
    console.dir(Math.min.apply(null, colors));
    // sortColors(colors);

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

// INCOMPLETE: meant to sort colors
const sortColors = colors => {
    return colors.sort((a, b) => a - b);
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