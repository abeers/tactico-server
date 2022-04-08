const express = require('express')
const Game = require('../models/game')

const router = express.Router()

router.get('/games', (req, res, next) => {
    Game.find({})
        .then(games => {
            res.status(200).json({ games })
        })
        .catch(next)
})

router.post('/games', (req, res, next) => {
    Game.create({})
        .then(game => {
            const gameRows = 3
            const gameColumns = 3
            for (let i = 0; i < gameRows; i++) {
                game.cells.push([])
                for (let j = 0; j < gameColumns; j++) {
                    game.cells[i].push({
                        value: '',
                        isDefended: false,
                        position: gameRows * i + j
                    })
                }
            }

            return game.save()
        })
        .then(game => {
            console.log(game)
            res.status(201).json({ game })
        })
        .catch(next)
})

module.exports = router