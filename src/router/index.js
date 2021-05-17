import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
  {
    path: "/", component: () => import('../views/layout/layout'), children: [
      // 默认是home
      { path: "", component: () => import('../views/home/home') },
      { path: "qa", component: () => import('../views/qa/qa') },
      { path: "my", component: () => import('../views/my/my') },
      { path: "video", component: () => import('../views/video/videos') },
    ]
  },
  { path: "/login", component: () => import('../views/login/login') },
  { path: "/search", component: () => import('../views/search/search') },
  { path: "/article/:id", component: () => import('../views/article/articleInfo') }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
