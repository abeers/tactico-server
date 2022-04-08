const express = require('express')
const mongoose = require('mongoose')

const gameRoutes = require('./routes/game_routes.js')
const errorHandler = require('./lib/error_handler.js')

mongoose.connect('mongodb://127.0.0.1/tactico_api', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

const app = express()

app.use(express.json())

app.use(gameRoutes)

app.use(errorHandler)

app.listen(4741, () => {
    console.log('Server running')
})