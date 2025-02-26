// @ts-ignore
import Logo from '@/assets/logo.png';
import { userRegister } from '@/services/userService';
import { Link } from '@@/exports';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

/**
 * 用户注册页面
 */
export default () => {
  const navigate = useNavigate();

  /**
   * 用户注册
   * @param fields
   */
  const doUserRegister = async (fields: UserType.UserRegisterRequest) => {
    const hide = message.loading('注册中');
    try {
      await userRegister({ ...fields });
      hide();
      message.success('注册成功');
      navigate('/user/login', {
        replace: true,
      });
    } catch (e: any) {
      // hide();
      // message.error('注册失败，' + e.message);
      const errorMessage = e.reponse?.data?.message || e.message;
      message.error(`注册失败:${errorMessage}`);
      console.error('注册错误详情', e);
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        background:
          'url(https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png)',
        backgroundSize: '100% 100%',
        padding: '32px 0 24px',
      }}
    >
      <LoginForm<UserType.UserRegisterRequest>
        logo={Logo}
        title="SQL之父"
        subTitle="快速生成代码和数据"
        submitter={{
          searchConfig: {
            submitText: '注册',
          },
        }}
        onFinish={async (formData) => {
          await doUserRegister(formData);
        }}
      >
        <>
          <ProFormText
            name="userName"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={'prefixIcon'} />,
            }}
            placeholder={'请输入用户名'}
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />
          <ProFormText
            name="userAccount"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={'prefixIcon'} />,
            }}
            placeholder={'请输入账号（至少 4 位）'}
            rules={[
              {
                required: true,
                message: '请输入账号!',
              },
              {
                min: 4,
                message: '账号至少需要4位',
              },
            ]}
          />
          <ProFormText.Password
            name="userPassword"
            dependencies={['userPassword']}
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={'prefixIcon'} />,
            }}
            placeholder={'请输入密码（至少 8 位）'}
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
          <ProFormText.Password
            name="checkPassword"
            dependencies={['userPassword']}
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={'prefixIcon'} />,
            }}
            placeholder={'请输入确认密码'}
            rules={[
              {
                required: true,
                message: '请输入确认密码！',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('userPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致！'));
                },
              }),
            ]}
          />
        </>
        <div
          style={{
            marginBottom: 24,
          }}
        >
          <Link to="/user/login">老用户登录</Link>
        </div>
      </LoginForm>
    </div>
  );
};
