import request from "@/utils/request"
import moment from "moment"

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