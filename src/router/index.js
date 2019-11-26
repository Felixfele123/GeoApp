import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import Help from '@/components/help/Help'
import GMap from '@/components/home/GMap'
import Login from '@/components/auth/Login'
import Signup from '@/components/auth/Signup'
import ViewProfile from '@/components/profile/ViewProfile'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'GMap',
      component: GMap,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
    path: '/login',
    name: 'Login',
    component: Login
    },
    {
    path: '/help',
    name: 'Help',
    component: Help
    },
    {
      path: '/profile/:id',
      name: 'ViewProfile',
      component: ViewProfile,
      meta: {
        requiresAuth: true

      }
    }
  ]
})


router.beforeEach((to, from, next) => {
  if(to.matched.some(rec => rec.meta.requireAuth)){
    let user = firebase.auth().currentUser
    if(user){
      next()
    }else {

      next({ name: 'Login' })
    }
  }else{
    next()
  }
})

export default router