import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import User from '@/components/User';
import EditUser from '@/components/EditUser';
import SignIn from '@/components/SignIn';
import SignUp from '@/components/SignUp';
import store from '@/store/store';

Vue.use(Router);

export const router = new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      beforeEnter: (to, from, next) => {
        if (store.state.isSignIn === 'true') {
          next();
        } else {
          alert('Please sign in');
          next('/signin');
        }
      }
    },
    {
      path: '/user/:id',
      name: 'editUser',
      component: EditUser
    },
    {
      path: '/signin',
      name: 'signIn',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'signUp',
      component: SignUp
    }
  ]
});

router.beforeEach((to, from, next) => {
  store.commit('checkIsSignIn');
  next();
});

router.afterEach((to, from, next) => {
  store.commit('checkIsSignIn');
});
