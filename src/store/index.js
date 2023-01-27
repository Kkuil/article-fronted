import { configureStore } from '@reduxjs/toolkit'
import studyTimeSlice from './modules/studyTime'
import userSlice from './modules/user'
import articleSlice from './modules/article'

export const store = configureStore({
    reducer: {
        studyTime: studyTimeSlice.reducer,
        user: userSlice.reducer,
        article: articleSlice.reducer
    }
})