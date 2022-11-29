const ObjectId = require('mongoose').Types.ObjectId
class DBService {
    constructor(list) {
        this.list = list;
    }

    async createCard(card) {
        const list = await this.list.findOne({ listId: card.listId })
        const newCard = {
            title: card.title,
            description: card.description,
            cardId: card.cardId
        }
        await this.list.findOneAndUpdate({ listId: card.listId }, { cards: [...list.cards, newCard] })
    }

    async getAllLists() {
        return await this.list.find()
    }

    async createList(list) {
        const lists = await this.getAllLists()
        const listId = lists.length
        list.listId = listId
        const newList = new this.list(list)
        return await this.list.create(newList)
    }

    async moveCard(body) {
        const lists = await this.getAllLists()
        const cardToMove = lists[body.sourceList].cards.splice(body.sourcePosition, 1)[0]
        lists[body.targetList].cards.splice(body.targetPosition, 0, cardToMove)
        await this.list.findOneAndUpdate({ listId: body.sourceList }, { cards: lists[body.sourceList].cards })
        await this.list.findOneAndUpdate({ listId: body.targetList }, { cards: lists[body.targetList].cards })
    }
}

module.exports = DBService