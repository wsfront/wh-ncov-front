import Vue from 'vue'
import Router from 'vue-router'
import FrontIndex from '@/components/FrontIndex'
import EndIndex from '@/components/EndIndex'
import EndHospitalDetail from '@/components/EndHospitalDetail'
import EndHospitalEdit from '@/components/EndHospitalEdit'
import Login from '@/components/Login'

Vue.use(Router)

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
      path: '/EndIndex',
      name: 'EndIndex',
      component: EndIndex
    },
    {
      path: '/EndHospitalDetail',
      name: 'EndHospitalDetail',
      component: EndHospitalDetail
    },
    {
      path: '/EndHospitalEdit',
      name: 'EndHospitalEdit',
      component: EndHospitalEdit
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    }
  ]
})
