import Vue from 'vue'
import Router from 'vue-router'
import FrontIndex from '@/components/FrontIndex'
import FrontCheckIndex from '@/components/FrontCheckIndex'
import EndIndex from '@/components/EndIndex'
import EndHospitalDetail from '@/components/EndHospitalDetail'
import EndHospitalEdit from '@/components/EndHospitalEdit'
import Login from '@/components/Login'

Vue.use(Router)

const loginCheck = (to, from, next) => {
  const tokenDate = localStorage.getItem('tokendate');
  const token = localStorage.getItem('token');
  if (!(tokenDate && token)) return next('/Login');
  const nowDate = new Date();
  const timeDiff = Math.floor((nowDate.getTime() - new Date(tokenDate).getTime()) / (24 * 3600 * 1000));
  return timeDiff >= 30 ? next('/Login') : next();
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'FrontIndex',
      component: FrontIndex
    },
    {
      path: '/FrontIndex',
      name: 'FrontIndex',
      component: FrontIndex
    },
    {
      path: '/FrontCheckIndex',
      name: 'FrontCheckIndex',
      component: FrontCheckIndex
    },
    {
      path: '/EndIndex',
      name: 'EndIndex',
      component: EndIndex,
      beforeEnter: loginCheck
    },
    {
      path: '/EndHospitalDetail',
      name: 'EndHospitalDetail',
      component: EndHospitalDetail,
      beforeEnter: loginCheck
    },
    {
      path: '/EndHospitalEdit',
      name: 'EndHospitalEdit',
      component: EndHospitalEdit,
      beforeEnter: loginCheck
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    }
  ]
})
