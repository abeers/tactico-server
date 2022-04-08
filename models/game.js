const mongoose = require('mongoose')

const cellSchema = new mongoose.Schema({
    value: String,
    row: Number,
    column: Number,
    isDefended: Boolean
}, {
    timestamps: true
})

const gameSchema = new mongoose.Schema({
    cells: [[cellSchema]]
}, {
    timestamps: true
})

module.exports = mongoose.model('Game', gameSchema)
