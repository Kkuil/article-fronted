import { configureStore } from '@reduxjs/toolkit'
import countSlice from './modules/count'

export const store = configureStore({
    reducer: {
        count: countSlice.reducer
    }
})