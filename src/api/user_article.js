import request from "@/utils/request"

export const findIsLike = async ({ id, article_id }) => {
    console.log(article_id)
    const { data } = await request({
        url: "/user_article/find_is_like",
        method: "GET",
        params: {
            id,
            article_id,
        }
    })
    return data
}

// 点赞文章
export const likeArticle = async ({ id, article_id, article_type, isLike }) => {
    const { data } = await request({
        url: "/user_article/like_article",
        method: "PUT",
        data: {
            id,
            article_id,
            article_type,
            isLike
        }
    })
    return data
}