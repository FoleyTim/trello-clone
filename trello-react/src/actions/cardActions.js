import { CONSTANTS } from '../actions'

export const addCard = (listId, title, description, cardId) => {
    return {
        type: CONSTANTS.ADD_CARD,
        payload: { title, listId, description, cardId }
    }
}