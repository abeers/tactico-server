const express = require('express')

const gameRoutes = require('./routes/game_routes.js')

const app = express()

app.get('/', (req, res) => {
    res.send('Tactico')
})

app.use(gameRoutes)

app.listen(3000, () => {
    console.log('Server running')
})