import { createSlice } from '@reduxjs/toolkit'

const countSlice = createSlice({
    name: 'Count',
    initialState: {
        count: 0
    },
    reducers: {
        increment(state, actions) {
            console.log(state.count, actions)
        },
        decrement(state, actions) {
            console.log(state, actions)
        }
    }
})
export default countSlice
export const { increment, decrement } = countSlice.actions