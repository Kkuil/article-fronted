import { createSlice } from "@reduxjs/toolkit"

const Article = createSlice({
    name: "Article",
    initialState: {
        article: {
            comments: "[]",
            content: "",
            publish_time: "",
            title: "",
            uname: "",
            views: ""
        }
    },
    reducers: {
        modify(state, actions) {
            state.article = {
                ...state.article,
                ...actions.payload
            }
        }
    }
})

export default Article
export const { modify } = Article.actions
