import { ADD_RUOLO } from "../actions"

const initialState = {
    ruoli: []
}


const ruoliReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_RUOLO:
            return {
                ...state,
                ruoli: state.ruoli.concat(action.payload)
            }
        default:
            return state
    }
}

export default ruoliReducer