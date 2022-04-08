const mongoose = require('mongoose')

const cellSchema = new mongoose.Schema({
    value: String,
    position: Number,
    isDefended: Boolean
}, {})

const gameSchema = new mongoose.Schema({
    cells: [cellSchema]
}, {
    timestamps: true
})

module.exports = mongoose.model('Game', gameSchema)
