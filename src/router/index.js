import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/ingress',
    component: Layout,
    redirect: '/ingress/index',
    name: 'ingress',
    meta: { title: 'ingress', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        name: 'ingress列表',
        component: () => import('@/views/ingress/index'),
        meta: { title: 'Ingress列表', icon: 'table' }
      },
      {
        path: 'create',
        name: 'ingress创建',
        component: () => import('@/views/ingress/create'),
        meta: { title: 'Ingress创建', icon: 'table' }
      }
    ]
  },
  {
    path: '/workloads',
    component: Layout,
    redirect: '/workloads/deployments',
    name: 'workloads',
    meta: { title: '工作负载', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'deployments/index',
        name: 'deployments-index',
        component: () => import('@/views/workloads/deployment/index'),
        meta: { title: 'Deployment列表', icon: 'table' }
      },
      {
        path: 'deployments/show',
        name: 'deployments-show',
        hidden: true,
        component: () => import('@/views/workloads/deployment/show'),
        meta: { title: 'Deployment详情', icon: 'table' }
      },
      {
        path: 'pods/index',
        name: 'pods-index',
        component: () => import('@/views/workloads/pods/index'),
        meta: { title: 'Pods列表', icon: 'tree' }
      },
      {
        path: 'pods/info',
        name: 'pods-info',
        hidden: true,
        component: () => import('@/views/workloads/pods/info'),
        meta: { title: 'Pods详情', icon: 'tree' }
      },
      {
        path: 'podshell',
        name: 'Podshell',
        component: () => import('@/views/workloads/pods/podshell'),
        meta: { title: 'podshell(临时)', icon: 'tree' }
      },
      {
        path: 'pods/container-logs',
        name: 'pods-container-logs',
        hidden: true,
        component: () => import('@/views/workloads/pods/container-logs'),
        meta: { title: '容器日志', icon: 'tree' }
      },
      {
        path: 'services',
        name: 'Services',
        component: () => import('@/views/workloads/service/index'),
        meta: { title: 'Service列表', icon: 'tree' }
      }
    ]
  },
  {
    path: '/resource',
    component: Layout,
    redirect: '/resource/secrets',
    name: 'Resource',
    meta: { title: '资源管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'secret/index',
        name: 'Secret-Index',
        component: () => import('@/views/resource/secrets/index'),
        meta: { title: '密文列表', icon: 'table' }
      },
      {
        path: 'secret/create',
        name: 'Secret-Create',
        hidden: true,
        component: () => import('@/views/resource/secrets/create'),
        meta: { title: '新增密文', icon: 'table' }
      },
      {
        path: 'secret/info',
        name: 'Secret-Info',
        hidden: true,
        component: () => import('@/views/resource/secrets/info'),
        meta: { title: '查看密文', icon: 'table' }
      },
      {
        path: 'configmap/index',
        name: 'ConfigMap-Index',
        component: () => import('@/views/resource/configmap/index'),
        meta: { title: '配置', icon: 'tree' }
      },
      {
        path: 'configmap/create',
        name: 'ConfigMap-Create',
        hidden: true,
        component: () => import('@/views/resource/configmap/create'),
        meta: { title: '新增配置', icon: 'tree' }
      },
      {
        path: 'configmap/info',
        name: 'ConfigMap-Info',
        hidden: true,
        component: () => import('@/views/resource/configmap/info'),
        meta: { title: '查看配置', icon: 'tree' }
      }
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
