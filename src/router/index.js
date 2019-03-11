import Vue from 'vue'
import Router from 'vue-router'
import HomeRouter from '@/components/Home'
import LevelUp from '@/components/LevelUp'
import MyArticles from '@/components/MyArticles'
import PersonalCenter from '@/components/PersonalCenter'
import ShowRouter from '@/components/Show'
import RegRouter from '@/components/Reg'
import LoginRouter from '@/components/Login'
import ArticleDetails from '@/components/ArticleDetails'
import PersonalCustomer from '@/components/personalcenters/PersonalCustomer'
import PersonalHelp from '@/components/personalcenters/PersonalHelp'
import PersonalMessage from '@/components/personalcenters/PersonalMessage'
import PersonalSuggests from '@/components/personalcenters/PersonalSuggests'
import PersonalZiliao from '@/components/personalcenters/PersonalZiliao'
import PersonalLookhistory from '@/components/personalcenters/PersonalLookhistory'
import PersonalDuihuan from '@/components/personalcenters/PersonalDuihuan'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'HomeRouter',
      component: HomeRouter
    },
    {
      path: '/levelup',
      name: 'LevelUp',
      component: LevelUp
    },
    {
      path: '/personalcenter',
      component: PersonalCenter,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/personalcustomer',
      component: PersonalCustomer,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/personalhelp',
      component: PersonalHelp,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/personalmessage',
      component: PersonalMessage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Personalduihuan',
      component: PersonalDuihuan,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/personalsuggests',
      component: PersonalSuggests,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/personalziliao',
      component: PersonalZiliao,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/personallookhistory',
      component: PersonalLookhistory,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/myarticles',
      name: 'MyArticles',
      component: MyArticles,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/articledetails',
      name: 'ArticleDetails',
      component: ArticleDetails,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/show',
      name: 'ShowRouter',
      component: ShowRouter
    },
    {
      path: '/reg',
      name: 'RegRouter',
      component: RegRouter
    },
    {
      path: '/login',
      name: 'LoginRouter',
      component: LoginRouter
    },
    {
      path: '/',
      redirect: '/home'
    },
      {
      path: '/?from=singlemessage',
      redirect: '/login'
    },
      {
      path: '*',
      redirect: '/home'
    }
  ]
})
