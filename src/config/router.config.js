// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: () => import(/* webpackChunkName: "user" */ '@/views/knowledge/clientknowledge'),
    hidden: true,
    children: [
      {
        path: 'privateKnowledge',
        name: 'privateKnowledge',
        component: () => import('@/views/knowledge/privateKnowledge')
      },
      {
        path: 'knowledgeCore',
        name: 'knowledgeCore',
        component: () => import('@/views/knowledge/knowledgeCore')
      },
      {
        path: 'recentlyView',
        name: 'recentlyView',
        component: () => import('@/views/knowledge/recentlyView')
      },
      {
        path: 'upload',
        name: 'upload',
        component: () => import('@/views/knowledge/upload')
      }
    ]
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
