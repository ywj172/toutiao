import Nextwork from './network'
import { instance } from './network'

// 用户模块
//登录
export const login = (params) => {
    return Nextwork.post('/v1_0/authorizations', params)
}
//短信验证码
export const getMessage = (moble) => {
    return Nextwork.get(`/v1_0/sms/codes/${moble}`)
}
//获取登录状态下的用户信息
export const getCurrentUser = () => {
    return Nextwork.get(`/v1_0/user`)
}
//获取当前用户的频道列表
export const getUserChannels = () => {
    return Nextwork.get(`/v1_0/user/channels`)
}
// 获取文章列表
export const getArticles = (params) => {
    return instance({
        method: 'GET',
        url: `/v1_1/articles`,
        params
    })
}
//获取全部频道列表
export const getAllChannels = () => {
    return Nextwork.get(`/v1_0/channels`)
}
//添加当前用户的频道列表
export const addUserChannel = (data) => {
    return Nextwork.PATCH(`/v1_0/user/channels`, data)
}
//更新当前用户的频道列表
export const removeUserChannel = (id) => {
    return Nextwork.delete(`/v1_0/user/channels/${id}`)
}
//获取搜索结果列表
export const getSearchList = (params) => {
    return Nextwork.get(`/v1_0/search`, params)
}
//获取搜索结果的详情
export const getSerarchInfo = (params) => {
    return Nextwork.get(`/v1_0/search`, params)
}
//获取搜索历史
export const getSerarchHistory = () => {
    return Nextwork.get(`/v1_0/search/histories`)
}
//获取文章详情
export const getArticleInfo = (id) => {
    return instance({
        method: 'GET',
        url: `/v1_0/articles/${id}`,
    })
}
//关注用户
export const addAttention = (params) => {
    return Nextwork.post(`/v1_0/user/followings`, params)
}
//取消关注
export const cancelAttention = (params) => {
    return Nextwork.delete(`/v1_0/user/followings`, params)
}
//收藏文章
export const favoriteArticle = (params) => {
    return Nextwork.post(`/v1_0/article/collections`, params)
}
//取消收藏文章
export const cancelFavoriteArticle = (id) => {
    return Nextwork.delete(`/v1_0/article/collections/${id}`)
}
//点赞文章
export const giveLike = (params) => {
    return Nextwork.post(`/v1_0/article/likings`, params)
}
//取消点赞文章
export const cancelGiveLike = (id) => {
    return Nextwork.delete(`/v1_0/article/likings/${id}`)
}
//获取文章评论
export const getArticleComment = (params) => {
    return instance({
        method: 'get',
        url: `/v1_0/comments`,
        params
    })
}
//点赞文章
export const likeArticle = (params) => {
    return Nextwork.post(`/v1_0/article/likings`, params)
}
//取消文章点赞
export const cancellikeArticle = (id) => {
    return Nextwork.DELETE(`/v1_0/article/likings/${id}`)
}
//发送评论
export const sendPostComment = (params) => {
    return Nextwork.post(`/v1_0/comments`, params)
}
