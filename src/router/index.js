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
    name: 'AdminT',
    component: () => import('../views/Admin/AdminT.vue'),
  },
  {
    path: '/adminC',
    name: 'AdminC',
    component: () => import('../views/Admin/AdminC.vue'),
  },
  {
    path: '/adminP',
    name: 'AdminP',
    component: () => import('../views/Admin/AdminProfession.vue'),
  },
  {
    path: '/student',
    name: 'Student',
    component: () => import('../views/Student/StudentInfo.vue'),
  },
  {
    path: '/studentP',
    name: 'StudentP',
    component: () => import('../views/Student/StuProfession.vue'),
  },
  {
    path: '/studentP1',
    name: 'StudentP1',
    component: () => import('../views/Student/StuProfession1.vue'),
  },
  {
    path: '/studentP2',
    name: 'StudentP2',
    component: () => import('../views/Student/StuProfession2.vue'),
  },
  {
    path: '/studentE',
    name: 'StudentE',
    component: () => import('../views/Student/StuEvaluate.vue'),
  },
  {
    path: '/studentR1',
    name: 'StudentR1',
    component: () => import('../views/Student/StuR1.vue'),
  },
  {
    path: '/studentR2',
    name: 'StudentR2',
    component: () => import('../views/Student/StuR2.vue'),
  },
  {
    path: '/studentR3',
    name: 'StudentR3',
    component: () => import('../views/Student/StuR3.vue'),
  },
  {
    path: '/studentR4',
    name: 'StudentR4',
    component: () => import('../views/Student/StuR4.vue'),
  },
  {
    path: '/company',
    name: 'Company',
    component: () => import('../views/Company/CompanyInfo.vue'),
  },
  {
    path: '/companyP',
    name: 'CompanyP',
    component: () => import('../views/Company/ComProfession.vue'),
  },
  {
    path: '/companyS',
    name: 'CompanyS',
    component: () => import('../views/Company/ComStu.vue'),
  },
  {
    path: '/teacher',
    name: 'Teacher',
    component: () => import('../views/Teacher/TeacherInfo.vue'),
  },
  {
    path: '/teacherA1',
    name: 'TeacherA1',
    component: () => import('../views/Teacher/TeacherA1.vue'),
  },
  {
    path: '/teacherA2',
    name: 'TeacherA2',
    component: () => import('../views/Teacher/TeacherA2.vue'),
  },
  {
    path: '/teacherSD',
    name: 'TeacherSD',
    component: () => import('../views/Teacher/TeacherSD.vue'),
  },
  {
    path: '/teacherSM',
    name: 'TeacherSM',
    component: () => import('../views/Teacher/TeacherSM.vue'),
  },
  {
    path: '/teacherSA',
    name: 'TeacherSA',
    component: () => import('../views/Teacher/TeacherSA.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
