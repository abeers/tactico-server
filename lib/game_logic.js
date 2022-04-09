const Game = require('../models/game')

// May change these later for other game modes
const gameRows = 3
const gameColumns = 3

const resetDefenses = (cells) => {
    cells.forEach(row => {
        row.forEach(cell => {
            cell.isDefended = false
        })
    })
}

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

const checkWinMajority = (cells, cell) => {
    // In this game, the board will never be full and players can end up with a majority of the squares. Using Math.ceil to account for even numbers (8 squares is enough to win for a 4x4) or odd (5 is enough to win for a 3x3)
    return countCells(cells, cell.value) >= Math.ceil(gameRows * gameColumns / 2)
}

const checkTie = (cells) => {
    return countCells(cells, '') === 1
}

const countCells = (cells, value) => {
    let totalCells = 0

    cells.forEach(row => {
        row.forEach(cell => {
            if (cell.value === value) {
                totalCells++
            }
        })
    })

    return totalCells
}

// Check all win conditions and assign a game winner. Ties omitted for now.
const checkForWin = (game, cell) => {
	const { cells } = game

	if (
		checkHorizontalWin(cells, cell) ||
		checkVerticalWin(cells, cell) ||
		checkDiagonalWin(cells, cell) || checkWinMajority(cells, cell)
	) {
		game.isOver = true
		game.winner = cell.value
	} else if (checkTie(cells, cell)) {
        game.isOver = true
        game.winner = 'tie'
    }
}

module.exports = {
	checkForWin,
    resetDefenses,
    gameRows,
    gameColumns
}
