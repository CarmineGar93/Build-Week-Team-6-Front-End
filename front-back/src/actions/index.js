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
