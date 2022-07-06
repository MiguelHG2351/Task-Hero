import { configureStore } from '@reduxjs/toolkit'
// import { useDispatch } from 'react-redux'

import counterReducer from 'app/redux/counterSlice'

export function makeStore() {
    return configureStore({
        reducer: {
            team: counterReducer
        }
    })
}

const store = makeStore()

// export const useAppDispatch = useDispatch()

export default store