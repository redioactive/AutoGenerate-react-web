export default [
  {
    path: '/user',
    hideInMenu: true,
    headerRender: false,
    routes: [
      {
        name: '用户登录',
        path: '/user/login',
        component: '@/pages/user/login',
      },
      {
        name: '用户注册',
        path: '/user/register',
        component: '@/pages/user/register',
      },
    ],
  },
];
