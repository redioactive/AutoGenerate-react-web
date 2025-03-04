import {message} from 'antd';
import {Navigate,Outlet,useAccess} from '@umijs/max';

/**
 * 权限校验拦截器
 * @author
 * */
export default  () => {
  const {canUser} = useAccess();
  if(canUser) {
    return <Outlet/>;
  }else {
    message.warning('请先登录')
    return <Navigate to="/user/login" replace />;
  }
}