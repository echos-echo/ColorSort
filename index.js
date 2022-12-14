// *** FUNCTIONS TO INITIALIZE GAME BEGINS HERE ***

// generates an array of random colors, by hue value
// the array has the number of tileNumbers, provided when invoked
const generateColors = tileNumbers => {
    const colorArray = [];
    // runs if there are still tiles left to generate a color for
    while (tileNumbers > 0) {
        // initializing a random hue...
        let randomHue = Math.round(Math.random() * 255);
        // if the random hue already exists in our array, keep randomizing until the value does not already exist
        while (colorArray.includes(randomHue)) {
            randomHue = Math.round(Math.random() * 255);
        }
        // add the new, random hue to our array of colors
        colorArray.push(randomHue);
        tileNumbers--;
    }
    return colorArray;
}

// generates a single tile element of the color argument provided
const generateTile = color => {
    // tile color is determined in HSV color, with a set saturation and value of 50%
    // the id is important; will refer to it later when fetching the game state
    return `<div class='tile' style='background-color: hsl(${color}, 50%, 50%)' id='${color}'></div>`
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
            colorTile.innerHTML = generateTile(color);
            // adding an additional class ONLY to the tiles that are not start or end
            // start/end tiles will stay in place, moveable-tiles in between can be dragged/moved
            colorTile.firstChild.classList.add('moveable-tile');
            colorTile.firstChild.draggable = true;
            gameRow.appendChild(colorTile);
        }
    });
    
    // finally, append the last color to the end
    const lastTile = document.createElement('div');
    lastTile.innerHTML = generateTile(lastColor);
    gameRow.appendChild(lastTile);
    
    // we want to access the colors outside of the board, but AFTER it is made
    // because the colors are randomized on every re-render of the game
    return randomColors;
}

// ***FUNCTIONS TO INITIALIZE GAME ENDS HERE***

// starts the game!
const gameColors = makeBoard();

// ***FUNCTIONS TO LISTEN TO GAME STATE AND INTERACT WITH THE GAME, BEGIN HERE***

// sorts the colors (an array) by hue amount
const sortColors = colors => {
    return colors.sort((a, b) => a - b);
}

// fetches the current game state every time it is called
const getCurrentGame = () => {
    const tiles = document.getElementsByClassName('tile');
    return [...tiles].map(tileNode => tileNode.id);
}

// checks the current game state against the solution array
const checkSolution = gameColors => {
    // array that represents the order of tiles in the game 
    const tilesNow = getCurrentGame();
    // array that represents the correct tile order; important to only run this AFTER makeBoard();
    const solution = sortColors(gameColors);
    // checks and returns true if every game tile is in the same place as the solution array
    // must be double equals (==). tilesNow contains strings (of integers) and solution contains pure integers
    // types do not match, even if the values do
    return solution.every((tile, ind) => tile == tilesNow[ind]);
}



// a button below the game area that refreshes the colors to the next 'game'
const toNextGame = document.getElementById('next-round');
toNextGame.addEventListener('click', makeBoard);

document.addEventListener('DOMContentLoaded', (event) => {
    var sourceTile;
    
    function handleDragStart(e) {
        console.dir(`dragging color ${this.id}`);
        this.style.opacity = '1';
        sourceTile = this;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.outerHTML);

    }
  
    function handleDragOver(e) {
      if (e.preventDefault) {
        e.preventDefault();
      }
  
      e.dataTransfer.dropEffect = 'move';
      
      return false;
    }
  
    function handleDragEnter(e) {
      this.classList.add('over');
    }
  
    function handleDragLeave(e) {
      this.classList.remove('over');
    }
  
    function handleDrop(e) {
        if (e.stopPropagation) {
            e.stopPropagation(); // stops the browser from redirecting.
        }

        if (sourceTile != this) {
            sourceTile.outerHTML = this.outerHTML;
            this.outerHTML = e.dataTransfer.getData('text/html');
            console.dir('swapping success!');
            console.log(`old tile is ${this.outerHTML}, \nnew tile is ${sourceTile.outerHTML}`);
        }
        return false;
    }
  
    function handleDragEnd(e) {
        console.dir('dropping complete');
        [...document.getElementsByClassName('over')].forEach(element => element.classList.remove('over'));
    }
    
    
    let items = [...document.getElementsByClassName('moveable-tile')];
    items.forEach(function(item) {
      item.addEventListener('dragstart', handleDragStart, false);
      item.addEventListener('dragenter', handleDragEnter, false);
      item.addEventListener('dragover', handleDragOver, false);
      item.addEventListener('dragleave', handleDragLeave, false);
      item.addEventListener('drop', handleDrop, false);
      item.addEventListener('dragend', handleDragEnd, false);
    });
  });


// TO DO:
// - click and drag implementation:
//     - mouseDown initiates dragging
//     - mouseOver (?) or some similar event, for the tile to follow the cursor
//     - mouseUp, completes the move
//     - extra: tile element should snap into place, and insert between other tiles, not swap