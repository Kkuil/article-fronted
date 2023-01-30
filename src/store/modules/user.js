import { createSlice } from "@reduxjs/toolkit"

const user = createSlice({
    name: 'user',
    initialState: {
        user: {
            id: '',
            username: '未登录',
            phone_number: "123456789",
            avatar: ""
        }
    },
    reducers: {
        modify(state, actions) {
            state.user = actions.payload
        }
    }
})

export default user
export const { modify } = user.actions