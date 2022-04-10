const mongoose = require('mongoose')

const cellSchema = new mongoose.Schema({
    value: {
        type: String,
        default: ''
    },
    row: Number,
    column: Number,
    isDefended: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const gameSchema = new mongoose.Schema(
	{
		cells: [[cellSchema]],
		isOver: {
			type: Boolean,
			default: false,
		},
		winner: {
			type: String,
			default: '',
		}
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Game', gameSchema)
