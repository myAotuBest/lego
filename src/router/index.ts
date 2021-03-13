import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Index from '../views/index.vue'
import Editor from '../views/Editor.vue'
import TemplateDetail from '../views/TemplateDetail.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: Index,
    children: [
      {
        path: '',
        name: 'home',
        component: Home
      },
      {
        path: 'template/:id',
        name: 'template',
        component: TemplateDetail
      }
    ]
  },
  {
    path: '/editor',
    name: 'editor',
    component: Editor
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
