import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin/AdminStu.vue'),
  },
  {
    path: '/adminT',
    name: 'Admin',
    component: () => import('../views/Admin/AdminT.vue'),
  },
  {
    path: '/adminC',
    name: 'Admin',
    component: () => import('../views/Admin/AdminC.vue'),
  },
  {
    path: '/student',
    name: 'Student',
    component: () => import('../views/Student/StudentInfo.vue'),
  },
  {
    path: '/company',
    name: 'Company',
    component: () => import('../views/Company/CompanyInfo.vue'),
  },
  {
    path: '/companyP',
    name: 'Company',
    component: () => import('../views/Company/Profession.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
