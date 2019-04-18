import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register.vue'
import MyPage from './views/MyPage.vue'
import Other from './views/Other.vue'
import Login from './views/Login.vue'
import PhotoPage from './views/PhotoPage.vue'
import Contact from './views/Contact.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: MyPage,
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/photopage',
      name: 'photopage',
      component: PhotoPage
    },
    {
      path: '/other',
      name: 'other',
      component: Other
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    }
  ]
})
