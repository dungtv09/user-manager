import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import User from '@/components/User';
import SignIn from '@/components/SignIn';
import SignUp from '@/components/SignUp';

Vue.use(Router);

export default new Router({
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
      component: User
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
