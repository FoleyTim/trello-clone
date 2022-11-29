const mongoose = require('mongoose')

const listSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        cards: [ //TODO: extract to new schema
            {
                title: String,
                description: String,
                cardId: String
            }
        ],
        listId: {
            type: Number,
            required: true
        }
    }
)

module.exports = mongoose.model('List', listSchema)
