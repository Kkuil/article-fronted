import request from "@/utils/request"
import moment from "moment"

// 上传文章
export const upload = async ({ username, title, content }) => {
    const { data } = await request({
        url: '/check_article/upload',
        method: 'POST',
        data: {
            username,
            title,
            content,
            upload_time: moment().format("YYYY年MM月DD日 HH:mm:ss")
        }
    })
    return data
}

// 获取未审核文章
export const GetCheckingArticles = async ({ username }) => {
    const { data } = await request({
        url: "/check_article/getCheckingArticles",
        method: "GET",
        params: {
            username
        }
    })
    return data
}

// 获取已审核文章
export const GetCheckedArticles = async ({ username }) => {
    const { data } = await request({
        url: "/check_article/getCheckedArticles",
        method: "GET",
        params: {
            username
        }
    })
    return data
}