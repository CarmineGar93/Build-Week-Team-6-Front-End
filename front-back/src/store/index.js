import { configureStore, combineReducers } from '@reduxjs/toolkit'
import tokenReducer from '../reducers/token'
import ruoliReducer from '../reducers/ruoli'


const mainReducer = combineReducers({
    token: tokenReducer,
    ruoli: ruoliReducer
})

const store = configureStore({
    reducer: mainReducer
})

export default store