import api from './axios'

// 获取轮播
export const getPicList = params => api.post('/user/adList', params);

// 获取新闻列表
export const getNewList = params => api.post('/user/newsList', params)

// 获取新闻详情
export const getNewDetail = params => api.post('/user/newsDetail', params)

// 获取赛事通知列表
export const getNoticeList = params => api.post('/user/matchList', params)

// 获取通知详情
export const getNoticeDetail = params => api.post('/user/matchDetail', params)

// 获取活动列表
export const activeList = params => api.post('/user/photoList', params)

// 获取投票列表
export const getVoteList = params => api.post('/user/voteList', params)

// 是否关注
export const isFollow = params => api.post('/user/isFollow', params)

// 投票
export const doVotes = params => api.post('/user/doVote', params)

// 在线报名
export const applyOnline = params => api.post('/user/createOrder', params)