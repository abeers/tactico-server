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
            const gameSize = 9
            for (let i = 0; i < gameSize; i++) {
                game.cells.push({
                    value: '',
                    isDefended: false,
                    position: i
                })
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