// 运行时配置
import Logo from '@/assets/logo.png'
import { GlobalFooter } from '@/components/GlobalFooter';
import './global.less';
import {GlobalHeaderRight} from '@/components/GlobalHeader/RightContent'
import { getLoginUser } from '@/api/user';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<InitialState> {
  const defaultState:InitialState = {
    loginUser:undefined,
  }
  //获取当前登录用户
  try {
    const res = await getLoginUser()
    defaultState.loginUser =res.data;
  }catch(error) {}
  return defaultState;

}

//全局布局配置
export const layout = () => {
  return {
    title:'it技术栈',
    logo: Logo,
    menu: {
      locale: false,
    },
    fixedHeader:false,
    layout:'top',
    contentStyle:{
      paddingBottom:120,
    },
    rightContentRender:() => <GlobalHeaderRight/>,
    footerRender:() => <GlobalFooter/>,
  };
};
