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
    return `<div class='tile' style='background-color: hsl(${color}, 50%, 50%)' id='${color}'></div>`
}

// clears the previous row so the new row of color tiles can append
// *childe is not a typo, it's just an inside joke. sorry.
const deleteChilde = (gameRow) => {
    while(gameRow.firstChild) {
        gameRow.removeChild(gameRow.lastChild);
    }
}

// INCOMPLETE: meant to sort colors
const sortColors = colors => {
    return colors.sort((a, b) => a - b);
}

// initializes the row of colors to sort
const makeBoard = () => {
    const rowSize = 10;     // how many tiles will render
    const randomColors = generateColors(rowSize);           // the array of random hues
    const firstColor = Math.min.apply(null, randomColors);  // the lowest hue value: first child
    const lastColor = Math.max.apply(null, randomColors);   // the highest hue value: last child

    // grabbing the div where the tiles will render
    const gameRow = document.getElementById('game-zone');
    // clears any previous color tiles
    deleteChilde(gameRow);

    // appends the lowest hue first
    const firstTile = document.createElement('div');
    firstTile.innerHTML = generateTile(firstColor);
    gameRow.appendChild(firstTile);

    // creates and appends a color tile to the game-zone div
    randomColors.forEach(color => {
        // absolutely do NOT create and append and element if it is equal to the first or last colors
        if (color !== firstColor && color !== lastColor) {
            const colorTile = document.createElement('div');
            colorTile.innerHTML = generateTile(color)
            gameRow.appendChild(colorTile);
        }
    });

    // finally, append the last color to the end
    const lastTile = document.createElement('div');
    lastTile.innerHTML = generateTile(lastColor);
    gameRow.appendChild(lastTile);

    return randomColors;
}

// starts the game!
const gameColors = makeBoard();

// fetches the current game state every time it is called
const getCurrentGame = () => {
    const tiles = document.getElementsByClassName('tile');
    return [...tiles].map(tileNode => tileNode.id);
}

console.dir(getCurrentGame());

// INCOMPLETE: meant to check whether or not the current state of the game is the correct array
const checkSolution = gameColors => {
    const solution = sortColors(gameColors);
    
}


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