import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  // 详情页
  {
    path: '/newcontent',
    name: 'Newcontent',
    component: () => import('@/views/NewContent.vue')
  },
  // 评论页
  {
    path: '/commentview',
    name: 'Commentview',
    component: () => import('@/views/CommentView.vue')
  },
  // 个人页面
  {
    path: '/personview',
    name: 'Personview',
    component: () => import('@/views/PersonView.vue')
  },
  // 收藏页
  {
    path: '/collectionmyself',
    name: 'Collectionmyself',
    component: () => import('@/views/CollectionMyself.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
