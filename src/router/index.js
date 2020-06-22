import Vue from 'vue'
import Router from 'vue-router'
import FrontIndex from '@/components/FrontIndex'
import FrontCheckIndex from '@/components/FrontCheckIndex'
import EaseHandbook from '@/components/EaseHandbook'
import EndIndex from '@/components/EndIndex'
import EndHospitalDetail from '@/components/EndHospitalDetail'
import EndHospitalEdit from '@/components/EndHospitalEdit'
import Login from '@/components/Login'
import WaitManual from '@/components/WaitManual'
import EpidemicManual from '@/components/EpidemicManual'
import SumPrev from '@/components/SumPrev'

Vue.use(Router)

const loginCheck = (to, from, next) => {
  document.title = to.meta.title
  const tokenDate = localStorage.getItem('tokendate');
  const token = localStorage.getItem('token');
  const isLogin = to.path === '/Login';
  if (!(tokenDate && token)) return isLogin ? next() : next('/Login');
  const nowDate = new Date();
  const timeDiff = Math.floor((nowDate.getTime() - new Date(tokenDate).getTime()) / (24 * 3600 * 1000));
  return timeDiff >= 30
    ? isLogin
      ? next() : next('/Login')
    : isLogin
      ? next('/EndIndex') : next();
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'FrontIndex',
      component: FrontIndex,
      meta: {
        title: 'NCP生命支援 - 武汉孕妇就诊指南'
      },
      beforeEnter: (to, from, next) => {
        document.title = to.meta.title
        next();
      }
    },
    {
      path: '/FrontIndex',
      name: 'FrontIndex',
      component: FrontIndex,
      meta: {
        title: 'NCP生命支援 - 武汉孕妇就诊指南'
      },
      beforeEnter: (to, from, next) => {
        document.title = to.meta.title
        next();
      }
    },
    {
      path: '/FrontCheckIndex',
      name: 'FrontCheckIndex',
      component: FrontCheckIndex,
      meta: {
        title: 'NCP生命支援 - 孕产妇夏季防疫指南'
      },
      beforeEnter: (to, from, next) => {
        document.title = to.meta.title
        next();
      }
    },
    {
      path: '/EpidemicManual',
      name: 'EpidemicManual',
      component: EpidemicManual,
      meta: {
        title: 'NCP生命支援 - 孕妇防疫手册',
        keepAlive: true
      },
      beforeEnter: (to, from, next) => {
        document.title = to.meta.title
        next();
      }
    },
    {
      path: '/SumPrev',
      name: 'sumprev',
      component: SumPrev,
      meta: {
        title: 'NCP生命支援 - 孕产妇夏季防疫指南',
        keepAlive: true
      },
      beforeEnter: (to, from, next) => {
        document.title = to.meta.title
        next();
      }
    },
    {
      path: '/EaseHandbook',
      name: 'EaseHandbook',
      component: EaseHandbook,
      meta: {
        title: 'NCP生命支援 - 安心待产手册',
        keepAlive: true
      },
      beforeEnter: (to, from, next) => {
        document.title = to.meta.title
        next();
      }
    },
    {
      path: '/WaitManual',
      name: 'WaitManual',
      component: WaitManual,
      meta: {
        title: 'NCP生命支援 - 安心待产手册',
        keepAlive: true
      },
      beforeEnter: (to, from, next) => {
        document.title = to.meta.title
        next();
      }
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
      component: Login,
      meta: {
        title: 'NCP生命支援 - 武汉孕妇就诊指南'
      },
      beforeEnter: (to, from, next) => {
        document.title = to.meta.title
        next();
      }
    }
  ]
});
