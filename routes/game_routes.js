const express = require('express')

const router = express.Router()

router.get('/games', (req, res) => {
    res.send('No games yet')
})

module.exports = router