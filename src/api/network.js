import axios from 'axios'
import jsonBig from 'json-bigint'

// 配置请求的基准URL地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/app/'
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const AUTH_TOKEN = JSON.parse(window.localStorage.getItem('user'))
  if (AUTH_TOKEN !== null && AUTH_TOKEN !== undefined) {
    config.headers.Authorization = `Bearer ${AUTH_TOKEN.token}`;
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

export default {
  get: function (path, parmas = {}) {
    return new Promise((resolve, reject) => {
      axios.get(path, {
        params: parmas
      })
        .then(function (response) {
          resolve(response)
        })
        .catch(function (error) {
          reject(error)
        });
    })
  },
  post: function (path, params) {
    return new Promise((resolve, reject) => {
      axios.post(path, params)
        .then(function (res) {
          resolve(res)
        })
        .catch(function (error) {
          reject(error)
        });
    })
  },
  PATCH: function (path, params) {
    return new Promise((resolve, reject) => {
      axios.patch(path, params)
        .then(function (res) {
          resolve(res)
        })
        .catch(function (error) {
          reject(error)
        });
    })
  },
  delete: function (path, params) {
    return new Promise((resolve, reject) => {
      axios.delete(path, params)
        .then(function (res) {
          resolve(res)
        })
        .catch(function (error) {
          reject(error)
        });
    })
  },
}
export const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/',
  transformResponse: [function (data) {
    try {
      // 如果转换成功则返回转换的数据结果
      return jsonBig.parse(data)
    } catch (err) {
      // 如果转换失败，则包装为统一数据格式并返回
      return {
        data
      }
    }
  }]
});