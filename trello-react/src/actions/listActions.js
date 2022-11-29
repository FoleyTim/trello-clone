import { CONSTANTS } from '../actions'

export const addList = (list) => {
    return {
        type: CONSTANTS.ADD_LIST,
        payload: list
    }
}

export const reloadLists = (lists) => {
    return {
        type: CONSTANTS.RELOAD_LISTS,
        payload: lists
    }
}
