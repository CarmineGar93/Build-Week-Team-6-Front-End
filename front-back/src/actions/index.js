export const SET_TOKEN = 'SET_TOKEN'
export const ADD_RUOLO = 'ADD_RUOLO'

export const SetTokenAction = (token) => {
    return {
        type: SET_TOKEN,
        payload: token
    }
}

export const AddRuoloAction = (ruolo) => {
    return {
        type: ADD_RUOLO,
        payload: ruolo
    }
}

/* export const RetrieveBookingsAction = (token) => {
    return async (dispatch) => {
        try {
            const response = await fetch('http://localhost:3001/bookings/mybookings', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                dispatch({
                    type: RETRIEVE_BOOKINGS,
                    payload: data.content
                })
            } else {
                throw new Error('Errore')
            }
        } catch (err) {
            console.log(err)
        }
    }
} */