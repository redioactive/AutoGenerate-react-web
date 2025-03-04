// 运行时配置
// @ts-ignore
import Logo from '@/assets/logo.png';
import { GlobalFooter } from '@/components/GlobalFooter';
import { GlobalHeaderRight } from '@/components/GlobalHeader/RightContent';
import { getLoginUser } from '@/services/userService';
import { RequestConfig } from '@@/plugin-request/request';
import './global.less';

interface RequestConfigs extends RequestConfig {
  baseUrl: string;
  <T>(url: string, config: RequestConfig): Promise<T>;
}

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<InitialState> {
  const loginUser = localStorage.getItem('loginUser');
  const defaultState: InitialState = {
    loginUser: undefined,
  };
  //获取当前登录用户
  try {
    const res = await getLoginUser();
    defaultState.loginUser = res.data;
  } catch (error) {
    console.error('获取用户失败', error);
  }
  // return defaultState;
  return {
    loginUser: loginUser ? JSON.parse(loginUser) : undefined,
  };
}

//全局布局配置
export const layout = () => {
  return {
    title: 'it技术栈',
    logo: Logo,
    menu: {
      locale: false,
    },
    fixedHeader: false,
    layout: 'top',
    contentStyle: {
      paddingBottom: 120,
    },
    rightContentRender: () => <GlobalHeaderRight />,
    footerRender: () => <GlobalFooter />,
  };
};

const isDev = process.env.NODE_ENV === 'development';
//
// // @ts-ignore
// /**
//  * 全局请求配置
//  * */

export const request: RequestConfigs = {
  baseURL: isDev ? 'http://localhost:3000/api' : '你的线上接口地址',
  timeout: 10000,
  withCredentials: true,
  errorConfig: {
    errorHandler() {},
    errorThrower() {},
  },
  //请求拦截器
  requestInterceptors: [
    (url, options) => {
      const token = localStorage.getItem('token');
      if (token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        };
      }
      return { url, options };
    },
  ],
  responseInterceptors: [
    // @ts-ignore
    (response: { data: any; request: { responseURL: any } }) => {
      //不再需要异步处理读取返回体内容，可直接在 data 中读出，部分字段可在 config 中找到
      const data: any = response.data;
      const path = response.request.responseURL;
      if (!data) {
        throw new Error('服务异常');
      }
      //下载接口没有 code
      if (path.includes('download/data/excel')) {
        return response;
      }
      const code = data.code ?? 50000;
      //未登录，且不为获取用户登录信息接口
      if (
        code === 40100 &&
        !path.includes('user/get/login') &&
        !location.pathname.includes('/user/login')
      ) {
        //跳转到登录页
        throw new Error('请先登录');
      }
      if (code !== 0) {
        console.error(`request error, path=${path}`, data);
        throw new Error(data.message ?? '服务器错误');
      }
      return response;
    },
  ],
};
