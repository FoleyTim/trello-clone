import { CONSTANTS } from '../actions/index'

const initialState = [

]

const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.RELOAD_LISTS:
            return [...action.payload]
        case CONSTANTS.ADD_LIST:
            const newList = {
                ...action.payload,
                cards: action.payload.cards ?? [],
            }
            console.log([...state, newList])
            return [...state, newList]
        case CONSTANTS.ADD_CARD: {
            const newCard = {
                ...action.payload
            }
            const newState = state.map(list => {
                if (list.listId === action.payload.listId) {
                    return {
                        ...list,
                        cards: [...list.cards, newCard]
                    }
                } else {
                    return list
                }
            })
            return newState
        }
        default:
            return state
    }

}

export default listReducer;