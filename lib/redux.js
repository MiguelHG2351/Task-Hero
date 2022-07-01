import { configureStore } from '@reduxjs/toolkit'

import counterReducer from '../app/redux/counterSlice'

export function makeStore() {
    return configureStore({
        reducer: {
            project: counterReducer
        }
    })
}

const store = makeStore()

export default store