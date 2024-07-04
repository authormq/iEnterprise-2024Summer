import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import UserView from '../views/UserView.vue'
import EnterpriseAdminView from '@/views/EnterpriseAdminView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import CreateRecruitView from '@/views/CreateRecruitView.vue'
import RecruitDetailView from '@/views/RecruitmentDetailView.vue'
import MomentDetailView from '@/views/MomentDetailView.vue'
import TestView from '@/views/TestView.vue'
import CreateMomentView from '@/views/CreateMomentView.vue'
import CreateEnterprise from '@/components/createEnterprise/CreateEnterprise.vue'
import SearchResultView from '@/views/SearchResultView.vue'
import MomentView from '@/views/MomentView.vue'
import RecruitmentApplicationView from '@/views/RecruitmentApplicationView.vue'
import ModifyEnterpriseInfoView from '@/views/ModifyEnterpriseInfoView.vue'
import ModifyEmployeeInfoView from '@/views/ModifyEmployeeInfoView.vue'
import NotificationView from '@/views/NotificationView.vue'
import UnsubscribeView from '@/views/UnsubscribeView.vue'

import VueCookies from 'vue-cookies'
import ChatView from '@/views/ChatView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/main',
      component: MainView
    },
    {
      path: '/login',
      component: LoginView
    },
    {
      path: '/register',
      component: RegisterView
    },
    {
      path: '/enterprise',
      component: EnterpriseAdminView,
    },
    {
      path: '/enterprise/:id',
      component: EnterpriseAdminView,
    },
    {
      path: '/enterprise/:id/modify',
      component: ModifyEnterpriseInfoView,
    },
    {
      path: '/enterprise/:id/modify/employee',
      component: ModifyEmployeeInfoView,
    },
    {
      path: '/enterprise/:id/application',
      component: RecruitmentApplicationView
    },
    {
      path: '/enterprise/create',
      component: CreateEnterprise
    },
    {
      path: '/enterprise/recruit/detail/:id',
      component: RecruitDetailView,
    },
    {
      path: '/enterprise/:id/recruit/create',
      component: CreateRecruitView
    },
    {
      path: '/user',
      component: UserView,
    },
    {
      path: '/user/:id',
      component: UserView
    },
    {
      path: '/login',
      component: LoginView,
      hidden: true
    },
    {
      path: '/moment/:id',
      component: MomentDetailView
    },
    {
      path: '/moment',
      component: MomentView
    },
    {
      path: '/moment/create',
      component: CreateMomentView
    },
    {
      path: '/test',
      component: TestView
    },
    {
      path: '/chat/:roomId?',
      component: ChatView
    },
    {
      path: '/result/:content?',
      component: SearchResultView
    },
    {
      path: '/notification',
      component: NotificationView
    },
    {
      path: '/unsubscribe',
      component: UnsubscribeView
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (VueCookies.get('user_id')) {
    next()
  } else {
    if (to.path === '/chat' || to.path === '/user' || to.path === '/enterprise' || to.path === '/moment' || to.path === '/notification' || to.path === '/unsubscribe') {
      next('/login')
    }
  }
  next()
})

export default router
