import request from "@/utils/request"

// 查看文章是否已喜欢
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

// 获取喜欢文章
export const findLikeArticles = async (id) => {
    const { data } = await request({
        url: "/user_article/find_like_articles",
        method: "GET",
        params: {
            id
        }
    })
    return data
}
