import * as ActionType from './ActionTypes';

export const Favorites = (state = [], action) => {
    switch (action.type) {
        case ActionType.ADD_FAVORITE:
            if (state.some(el => el === action.payload))
                return state;
            else
                return state.concat(action.payload)
        case ActionType.DELETE_FAVORITE :
            return state.filter(dishId => dishId !== action.payload)
        default:
            return state
    }
}

