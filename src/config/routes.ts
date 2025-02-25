/**
 * 路由
 * 配置参考：https://umijs.org/docs/max/layout-menu#%E6%89%A9%E5%B1%95%E7%9A%84%E8%B7%AF%E7%94%B1%E9%85%8D%E7%BD%AE
 */
export default [
  {
    name: '代码生成',
    path: '/',
    component: '@/pages/index/index', // 确保该路径正确
  },
  {
    name: '词库大全',
    path: '/dict/all',
    component: '@/pages/dict/index', // 确保该路径正确
  },
  {
    name: '表大全',
    path: '/table/all',
    component: '@/pages/tableInfo', // 确保该路径正确
  },
  {
    name: '字段大全',
    path: '/field/all',
    component: '@/pages/fieldInfo', // 确保该路径正确
  },
  {
    name: '创建词库',
    path: '/dict/add',
    component: '@/pages/dict/add', // 确保该路径正确
    wrappers: [
      '@/wrappers/auth', // 确保这个 wrapper 存在且路径正确
    ],
  },
  {
    name: '创建词库成功',
    path: '/dict/add_result',
    component: '@/pages/dict/add_result', // 确保该路径正确
    hideInMenu: true,
    wrappers: [
      '@/wrappers/auth', // 确保这个 wrapper 存在且路径正确
    ],
  },
  {
    path: '/user',
    hideInMenu: true,
    headerRender: false,
    routes: [
      {
        name: '用户登录',
        path: '/user/login',
        component: '@/pages/users/login', // 确保该路径正确
      },
      {
        name: '用户注册',
        path: '/user/register',
        component: '@/pages/users/register', // 确保该路径正确
      },
    ],
  },
  {
    path: '/admin',
    access: 'canAdmin',
    name: '管理',
    routes: [
      {
        name: '用户管理',
        path: '/admin/User',
        component: '@/pages/admin/User', // 确保该路径正确
      },
      {
        name: '词库管理',
        path: '/admin/dict',
        component: '@/pages/admin/dict', // 确保该路径正确
      },
      {
        name: '表管理',
        path: '/admin/table',
        component: '@/pages/admin/tableInfo', // 确保该路径正确
      },
      {
        name: '字段管理',
        path: '/admin/field',
        component: '@/pages/admin/fieldInfo', // 确保该路径正确
      },
      {
        name: '举报管理',
        path: '/admin/report',
        component: '@/pages/admin/report', // 确保该路径正确
      },
    ],
  },
];