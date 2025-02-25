import {BugOutlined,GithubOutlined,SketchOutlined,UserOutlined} from '@ant-design/icons';
import {DefaultFooter} from '@ant-design/pro-layout';
import React from 'react';
import "./index.less"

export const GlobalFooter:React.FC = () => {
  const currentYear = new Date().getFullYear();

  return(
    <DefaultFooter
    className="default-footer"
    copyright={`${currentYear} 程序员里予`}
    links={[
      {
        key:'master',
        title:(
          <UserOutlined>里予</UserOutlined>
        ),
        href:'https://github.com/redioactive?tab=repositories',
        blankTarget:true
      },
      {
        key:'learn',
        title:(
          <SketchOutlined>编程学习圈子</SketchOutlined>
        ),
        href:'/',
        blankTarget:true
      },
      {
        key:'github',
        title:(
          <GithubOutlined>代码已开源</GithubOutlined>
        ),
        href:'/',
        blankTarget:true
      },
      {
        key: 'feedback',
        title: (
          <>
            <BugOutlined /> 建议反馈
          </>
        ),
        href: 'https://support.qq.com/product/440825',
        blankTarget: true,
      }
    ]}>
    </DefaultFooter>
  )
}