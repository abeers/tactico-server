const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const mongoose = require('mongoose')
const cors = require('cors')

const auth = require('./lib/auth')
const gameRoutes = require('./routes/game_routes.js')
const userRoutes = require('./routes/user_routes')
const errorHandler = require('./lib/error_handler.js')

const serverPort = 4741
const socketPort = 4001

mongoose.connect('mongodb://127.0.0.1/tactico_api')

const app = express()
const server = http.createServer(app)
const io = socketIo(server, {
	cors: {
		origin: 'http://localhost:3000'
	},
})

app.use(express.json())
app.use(auth)
app.use(
	cors({
		origin: 'http://localhost:3000',
	})
)

app.use((req, res, next) => {
    req.io = io
    next()
})

// io.on('connection', (socket) => {
// 	console.log('New client connected')

//     socket.emit('FromAPI', 'Hello there')
//     socket.on('FromClient', (data => {
//         console.log(data)
//         socket.broadcast.emit('APIReceivedClient', 'You face Jaraxxus')
//     }))

// 	socket.on('disconnect', () => {
// 		console.log('Client disconnected')
// 	})
// })

app.use(gameRoutes)
app.use(userRoutes)

app.use(errorHandler)

app.listen(serverPort, () => {
    console.log('Server running')
})

server.listen(socketPort, () => {
    console.log('Socket.io is running')
})