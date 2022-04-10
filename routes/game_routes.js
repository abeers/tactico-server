const express = require('express')
const Game = require('../models/game')
const { gameRows, gameColumns, checkForWin, resetDefenses } = require('../lib/game_logic')

const router = express.Router()

router.get('/games', (req, res, next) => {
    Game.find({})
        .then(games => {
            res.status(200).json({ games })
        })
        .catch(next)
})

router.get('/games/:id', (req, res, next) => {
	Game.findById(req.params.id)
		.then((game) => {
			res.status(200).json({ game })
		})
		.catch(next)
})

router.post('/games', (req, res, next) => {
    Game.create({})
        .then(game => {
            // Construct multidimensional cells array
            for (let i = 0; i < gameRows; i++) {
                game.cells.push([])
                for (let j = 0; j < gameColumns; j++) {
                    game.cells[i].push({
                        row: i,
                        column: j
                    })
                }
            }

            return game.save()
        })
        .then(game => {
            req.io.emit('CreatedGame', { game })
            res.status(201).json({ game })
        })
        .catch(next)
})

router.patch('/games/:id', (req, res, next) => {
	const {id, row, value, isAttacking} = req.body
    
    Game.findById(req.params.id)
		.then((game) => {
			const cellToUpdate = game.cells[row].id(id)

			// If the game is not over and the cell is empty...
			if (!game.isOver && cellToUpdate.value === '') {
                // And the player is defending...
                if (!isAttacking) {
                    // Defend the cell
                    cellToUpdate.isDefended = true
                } else {
                    // If the player is attacking and the cell has not been defended...
                    if (!cellToUpdate.isDefended) {
                        // update the value and check for wins
                        cellToUpdate.value = value
					    checkForWin(game, cellToUpdate)
                    } 
                    // Reset the defenses after every attack
                    resetDefenses(game.cells)
                }

				return game.save()
			}
		})
		.then((game) => {
            req.io.emit('UpdatedGame', { game })
			res.status(200).json({ game })
		})
		.catch(next)
})

module.exports = router