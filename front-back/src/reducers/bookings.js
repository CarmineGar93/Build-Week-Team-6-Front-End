import { RETRIEVE_BOOKINGS } from "../actions"

const initialState = {
    booking_list: []
}


const bookingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case RETRIEVE_BOOKINGS:
            return {
                ...state,
                booking_list: action.payload
            }
        default:
            return state
    }
}

export default bookingsReducer