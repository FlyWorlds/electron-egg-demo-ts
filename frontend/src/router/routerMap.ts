/**
 * 基础路由
 * @type { *[] }
 */

const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/layouts/AppSider.vue'),
    children: [
      {
        path: '/framework',
        name: 'Framework',
        component: () => import('@/layouts/Menu.vue'),
        props: { id: 'framework' },
        //props: true,
        redirect: { name: 'FrameworkPageTestIndex' },
        children: [
          {
            path: '/framework/pageTest/index',
            name: 'FrameworkPageTestIndex',
            component: () => import('@/views/framework/pageTest/index.vue')
          },
        ]  
      },
      {
        path: '/framework/pageTest2/index',
        name: 'FrameworkPageTest2Index',
        component: () => import('@/views/framework/pageTest2/index.vue')
      },
    ]
  },
]

export default constantRouterMap