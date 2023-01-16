import { createSlice } from "@reduxjs/toolkit"

const user = createSlice({
    name: 'user',
    initialState: {
        user: {
            id: 'xxx',
            username: 'Kkuil'
        }
    },
    reducers: {
        modify(state, actions) {
            state.user = {
                id: actions.payload.id,
                username: actions.payload.username
            }
        }
    }
})

export default user
export const { modify } = user.actions