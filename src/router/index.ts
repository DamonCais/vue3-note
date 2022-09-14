
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import AppLayout from '@/components/layout/index.vue';

export const routes: RouteRecordRaw[] = [
  {
    path: '/admin',
    component: AppLayout,
    meta: {
      requiresAuth: true,
      title: '主路由'
    },
    children: [
      {
        path: 'home', // 默认子路由
        name: 'home',
        component: () => import('@/pages/home/index.vue'),
        meta: { title: '首页' }
      },
      {
        path: 'test1', // 默认子路由
        name: 'test1',
        component: () => import('@/pages/test/test1.vue'),
        meta: { title: '测试1' }
      },
      {
        path: 'test2', // 默认子路由
        name: 'test2',
        component: () => import('@/pages/test/test2.vue'),
        meta: { title: '测试2' }
      },
      {
        path: 'test3', // 默认子路由
        name: 'test3',
        component: () => import('@/pages/test/test3.vue'),
        meta: { title: '测试3' }
      },
      {
        path: 'test4', // 默认子路由
        name: 'test4',
        component: () => import('@/pages/test/test4.vue'),
        meta: { title: '测试4' }
      },
      {
        path: 'test5', // 默认子路由
        name: 'test5',
        component: () => import('@/pages/test/test5.vue'),
        meta: { title: '测试5' }
      }
    ]
  }
  // {
  //   path: '/page',
  //   component: AppLayout,
  //   meta: {
  //     requiresAuth: true,
  //     title: 'page'
  //   },
  //   children: [
  //     {
  //       path: 'page', // 默认子路由
  //       name: 'page',
  //       component: () => import('@/pages/home/index.vue'),
  //       meta: { title: 'page' }
  //     },
  //     {
  //       path: 'page1', // 默认子路由
  //       name: 'page1',
  //       component: () => import('@/pages/test/test1.vue'),
  //       meta: { title: 'page1' }
  //     },
  //     {
  //       path: 'page2', // 默认子路由
  //       name: 'page2',
  //       component: () => import('@/pages/test/test2.vue'),
  //       meta: { title: 'page2' }
  //     }
  //   ]
  // }
];
const router = createRouter({
  history: createWebHashHistory(), // 路由模式
  routes: [
    {
      path: '/',
      redirect: '/admin/home'
    },
    ...routes
  ] // 路由规则
});

router.beforeEach((to, from) => {
//   nprogress.start(); // 开始加载进度条
//   if (to.meta.requiresAuth && !store.state.user) {
//     // 此路由需要授权，请检查是否已登录
//     // 如果没有，则重定向到登录页面
//     return {
//       path: '/admin/login',
//       // 保存我们所在的位置，以便以后再来
//       query: { redirect: to.fullPath }
//     };
//   }
});

router.afterEach(() => {
//   nprogress.done(); // 加载进度条
});

export default router;
