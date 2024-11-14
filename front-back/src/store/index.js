import { configureStore, combineReducers } from '@reduxjs/toolkit'
import tokenReducer from '../reducers/token'


const mainReducer = combineReducers({
    token: tokenReducer,
})

const store = configureStore({
    reducer: mainReducer
})

export default store