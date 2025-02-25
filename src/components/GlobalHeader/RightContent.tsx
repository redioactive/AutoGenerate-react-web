import type {Settings as ProSettings} from '@ant-design/pro-layout';
import React from 'react';
import  {AvatarDropdown}  from './AvatarDropdown';
// @ts-ignore
import styles from './index.less'

type GlobalHeaderRightProps  = Partial<ProSettings>;

/**
 * 群居菜单右侧
 * @constructor
 * */
export const GlobalHeaderRight:React.FC<GlobalHeaderRightProps> = () => {
  return (
    <div className={styles.right}>
      <AvatarDropdown />
    </div>
  )
}