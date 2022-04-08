const Game = require('../models/game')

// May change these later for other game modes
const gameRows = 3
const gameColumns = 3

// Only check the relevant column
const checkVerticalWin = (cells, cell) => {
    const { column, value } = cell
    for (let i = 0; i < gameRows; i++) {
        if (cells[i][column].value !== value) {
            return false
        }
    }

    return true
}

// Only check the relevant row
const checkHorizontalWin = (cells, cell) => {
	const { row, value } = cell
	for (let i = 0; i < gameColumns; i++) {
		if (cells[row][i].value !== value) {
			return false
		}
	}

	return true
}

// TODO: Revisit this logic
const checkDiagonalWin = (cells, cell) => {
    const { row, column, value } = cell

    if (row === column) {
        for (let i = 0; i < gameRows; i++) {
            if (cells[i][i].value !== value) {
                return false
            }
        }

        return true
    } else {
        // Check along the anti-diagonal by incrementing the rows and decrementing the columns
        for (let i = 0; i < gameRows; i++) {
            if (cells[i][(gameColumns - 1) - i].value !== value) {
                return false
            }
        }
        
        return true
    }

    
}

// Check all win conditions and assign a game winner. Ties omitted for now.
const checkForWin = (game, cell) => {
	const { cells } = game

	if (
		checkHorizontalWin(cells, cell) ||
		checkVerticalWin(cells, cell) ||
		checkDiagonalWin(cells, cell)
	) {
		game.isOver = true
		game.winner = cell.value
	}
}

module.exports = {
	checkForWin,
    gameRows,
    gameColumns
}
