import { userLogout } from '@/services/userService';
import { Link } from '@@/exports';
import { LogoutOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Avatar, Button, Dropdown, MenuProps, message } from 'antd';
import classNames from 'classnames';
import queryString from 'query-string';
import React, { useRef } from 'react';
// @ts-ignore
import styles from './index.less';

/**
 * 头像下拉菜单
 * @constructor
 * @author https://github.com/redioactive
 * */

export const AvatarDropdown: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const loginUser = initialState?.loginUser;

  const onMenuClick = async (event: {
    key: React.Key;
    keyPath: React.Key[];
  }) => {
    const { key } = event;

    if (key === 'logout') {
      try {
        await userLogout();
        message.success('已退出登录');
      } catch (error: any) {
        message.error('操作失败');
      }
      await setInitialState({ ...initialState, loginUser: undefined });
      history.replace({
        pathname: '/user/login',
        search: queryString.stringify({
          redirect: window.location.href,
        }),
      });
      return;
    }
  };

  const avatarRef = useRef<HTMLDivElement>(null);
  /**
   * 下拉菜单
   * */
  const menuHeaderDropdown: MenuProps['items'] = loginUser
    ? [
        {
          key: 'current',
          label: loginUser.userName ?? '无名',
          disabled: true,
        },
        {
          key: 'logout',
          label: (
            <span style={{ color: 'red' }}>
              <LogoutOutlined />
              退出登录
            </span>
          ),
          onClick: onMenuClick,
        },
      ]
    : [];
  return loginUser ? (
    <Dropdown
      overlayClassName={classNames(styles.container)}
      menu={{ items: menuHeaderDropdown }}
    >
      <div className={`${styles.action} ${styles.account}`}>
        <Avatar ref={avatarRef}>{loginUser.userName?.[0] ?? '无'}</Avatar>
      </div>
    </Dropdown>
  ) : (
    <>
      <Link to="/user/login">
        <Button type="primary" ghost style={{ marginRight: 16 }}>
          登录
        </Button>
      </Link>
    </>
  );
};
